export default function getDate() {
  const date = new Date();
  const year = date.getFullYear().toString().slice(2, 4);

  let month = date.getMonth() + 1;
  if (month < 10) month = `0${month}`;

  let day = date.getDate();
  if (day < 10) day = `0${day}`;

  let hour = date.getHours();
  if (hour < 10) hour = `0${hour}`;

  let min = date.getMinutes();
  if (min < 10) min = `0${min}`;

  return `${day}.${month}.${year} ${hour}:${min}`;
}
