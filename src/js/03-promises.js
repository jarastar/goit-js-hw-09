import Notiflix from 'notiflix';


const form = document.querySelector('.form');
form.addEventListener('submit', handleFormSubmit);

function handleFormSubmit(event) {
  event.preventDefault();

  const delay = Number(event.target.elements.delay.value);
  const step = Number(event.target.elements.step.value);
  const amount = Number(event.target.elements.amount.value);

  for (let i = 1; i <= amount; i++) {
    const position = i;
    const delayTime = delay + step * (i - 1);
    createPromise(position, delayTime)
      .then(({ position, delayTime }) => {
        Notiflix.Notify.Success(`✅ Fulfilled promise ${position} in ${delayTime}ms`);
      })
      .catch(({ position, delayTime }) => {
        Notiflix.Notify.Failure(`❌ Rejected promise ${position} in ${delayTime}ms`);
      });
  }
}

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
