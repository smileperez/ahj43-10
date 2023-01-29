import validateInput from './validateInput';
import addMessage from './addMessage';

const textarea = document.querySelector('.textarea');
const messages = document.querySelector('.messages');
const modal = document.querySelector('.modal');
const ok = document.querySelector('.ok');
const cancel = document.querySelector('.cancel');
const input = document.querySelector('.popup-text');
let coordinates;

textarea.addEventListener('keydown', (event) => {
  if (textarea.value === '') return;
  if (event.code === 'Enter') {
    coordinates = null;
    textarea.setAttribute('readonly', 'true');
    const successCallback = (position) => {
      const { latitude } = position.coords;
      const { longitude } = position.coords;
      coordinates = document.createElement('p');
      coordinates.innerText = `[${latitude}, ${longitude}] 👀`;
      addMessage(coordinates, textarea, messages);
      textarea.removeAttribute('readonly');
    };
    const errorCallback = (error) => {
      console.error(error);
      modal.classList.remove('hidden');
    };
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  }
});

cancel.addEventListener('click', (e) => {
  e.preventDefault();
  modal.classList.add('hidden');
  input.classList.toggle('not-valid');
  textarea.removeAttribute('readonly');
  input.value = '';
});

ok.addEventListener('click', (e) => {
  e.preventDefault();
  const coord = validateInput(input.value);
  if (coord) {
    coordinates = document.createElement('p');
    coordinates.innerText = `[${coord.latitude}, ${coord.longitude}] 👀`;
    addMessage(coordinates, textarea, messages);
    input.value = '';
    input.classList.remove('not-valid');
    modal.classList.add('hidden');
    textarea.removeAttribute('readonly');
  } else {
    textarea.removeAttribute('readonly');
    input.classList.add('not-valid');
    input.value = '';
  }
});
