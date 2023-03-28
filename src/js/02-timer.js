import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const input = document.querySelector('#datetime-picker');
const start = document.querySelector('[data-start]');
let countDownDate;
let interval;
const timersElements = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose: (selectedDates) => {
    if (selectedDates[0] < new Date()) {
      alert('Please choose a date in the future');
    } else {
      start.disabled = false;
      countDownDate = selectedDates[0];
    }
  },
};
start.disabled = true;
flatpickr(input, options);

start.addEventListener('click', () => {
  start.disabled = true;
  interval = setInterval(() => {
    const now = new Date();
    const distance = countDownDate - now;
    const time = convertMs(distance);
    timersElements.days.innerHTML = `${time.days.toString().padStart(2, 0)}`;
    timersElements.hours.innerHTML = `${time.hours.toString().padStart(2, 0)}`;
    timersElements.minutes.innerHTML = `${time.minutes.toString().padStart(2, 0)}`;
    timersElements.seconds.innerHTML = `${time.seconds.toString().padStart(2, 0)}`;
    if (distance < 0) {
      clearInterval(interval);
      timersElements.days.innerHTML = `00`;
      timersElements.hours.innerHTML = `00`;
      timersElements.minutes.innerHTML = `00`;
      timersElements.seconds.innerHTML = `00`;
    }
  });
});

const convertMs = (ms) => {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};
