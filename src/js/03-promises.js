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
        showNotification(`✅ Fulfilled promise ${position} in ${delayTime}ms`, 'success');
      })
      .catch(({ position, delayTime }) => {
        showNotification(`❌ Rejected promise ${position} in ${delayTime}ms`, 'failure');
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

function showNotification(message, type) {
  const notification = document.createElement('div');
  notification.classList.add('notification', type);
  notification.textContent = message;
  document.body.append(notification);

  setTimeout(() => {
    notification.remove();
  }, 3000);
}
