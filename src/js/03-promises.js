import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';


const form = document.querySelector('.form');
form.addEventListener('submit', handleFormSubmit);

function handleFormSubmit(event) {
  event.preventDefault();

  const delayInput = document.querySelector('input[name="delay"]');
  const stepInput = document.querySelector('input[name="step"]');
  const amountInput = document.querySelector('input[name="amount"]');

  const delay = parseInt(delayInput.value);
  const step = parseInt(stepInput.value);
  const amount = parseInt(amountInput.value);

  createPromises(amount, delay, step);
}

function createPromises(amount, delay, step) {
  for (let i = 0; i < amount; i++) {
    const position = i + 1;
    const delayTime = delay + i * step;
    const promise = createPromise(position, delayTime);

    promise
      .then(({ position, delayTime }) => {
        Notiflix.Notify.Success(`✅ Fulfilled promise ${position} in ${delayTime}ms`);
      })
      .catch(({ position, delayTime }) => {
        Notiflix.Notify.Failure(`❌ Rejected promise ${position} in ${delayTime}ms`);
      });
  }
}

// function createPromise(position, delay) {
//   const shouldResolve = Math.random() > 0.3;
//   if (shouldResolve) {
//     // Fulfill
//   } else {
//     // Reject
//   }
// }

function createPromise(position, delayTime) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delayTime });
      } else {
        reject({ position, delayTime });
      }
    }, delayTime);
  });
}
