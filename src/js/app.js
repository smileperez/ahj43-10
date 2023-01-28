import validate from './validate';

const text = document.querySelector('.text');
const trello = document.querySelector('.trello');
const modal = document.querySelector('.modal');
const ok = document.getElementById('ok');
const cancel = document.getElementById('cancel');
const input = document.querySelector('.popup-text');
let coordinates;

function getDate() {
  const date = new Date();
  let hour = date.getHours();
  let min = date.getMinutes();
  if (hour < 10) hour = `0${hour}`;
  if (min < 10) min = `0${min}`;
  return `${date.getFullYear()} ${date.getDate().toLocaleString()}/${date.getMonth() + 1} ${hour}:${min}`;
}

function addMessage() {
  const date = document.createElement('p');
  date.classList.add('coord');
  date.innerText = getDate();
  coordinates = document.createElement('p');
  const textElement = document.createElement('p');
  textElement.innerText = `${text.value}`;
  textElement.classList.add('message');
  const div = document.createElement('div');
  div.classList.add('message-all');
  div.prepend(coordinates);
  div.prepend(textElement);
  div.prepend(date);
  trello.prepend(div);
  coordinates.classList.add('coord');
  text.value = '';
}

text.addEventListener('keydown', (event) => {
  if (text.value === '') return;
  if (event.altKey && event.code === 'Enter') {
    coordinates = null;
    text.setAttribute('readonly', 'true');
    const successCallback = (position) => {
      const { latitude } = position.coords;
      const { longitude } = position.coords;
      addMessage();
      coordinates.innerText = `[${latitude}, ${longitude}] 👁`;
      text.removeAttribute('readonly');
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
  text.removeAttribute('readonly');
  input.value = '';
});

ok.addEventListener('click', (e) => {
  e.preventDefault();
  const coord = validate(input.value);
  if (coord) {
    addMessage();
    coordinates.innerText = `[${coord.latitude}, ${coord.longitude}] 👁`;
    input.value = '';
    input.classList.remove('not-valid');
    modal.classList.add('hidden');
    text.removeAttribute('readonly');
  } else {
    text.removeAttribute('readonly');
    input.classList.add('not-valid');
    input.value = '';
  }
});
