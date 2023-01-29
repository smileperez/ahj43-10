import getDate from './gateDate';

export default function addMessage(coordinates, textarea, messages) {
  const div = document.createElement('div');
  const date = document.createElement('p');
  const text = document.createElement('p');

  div.classList.add('message');

  date.classList.add('date');
  date.innerText = getDate();

  text.classList.add('text');
  text.innerText = `${textarea.value}`;

  coordinates.classList.add('coordinates');

  div.appendChild(date);
  div.appendChild(text);
  div.appendChild(coordinates);
  messages.prepend(div);
}
