const form = document.querySelector('.js-form');
const input = form.querySelector('input');
const display = document.querySelector('.js-greetings');

const USER_LS = 'currentUser';
const SHOWING_CN = 'showing';

function saveName(text) {
  localStorage.setItem(USER_LS, text);
}

function handleSubmit(event) {
  event.preventDefault();
  console.log(input.value);
  const currnetValue = input.value;
  addName(currnetValue);
  saveName(currnetValue);
}
function askForName() {
  form.classList.add(SHOWING_CN);
  form.addEventListener('submit', handleSubmit);
}

function addName(text) {
  form.classList.remove(SHOWING_CN);
  display.classList.add(SHOWING_CN);
  const date = new Date();
  const hours = date.getHours();

  // 시간별로 인사 다르게 표시
  if (hours < 12 && hours > 6) {
    display.innerText = `좋은아침입니다, ${text}님.`;
  } else if (hours > 12 && hours < 18) {
    display.innerText = `좋은오후입니다, ${text}님.`;
  } else if (hours > 18 && hours < 0) {
    display.innerText = `좋은밤되세요, ${text}님.`;
  } else {
    display.innerText = `새벽입니다, ${text}님.`;
  }
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    askForName();
  } else {
    addName(currentUser);
  }
}

function init() {
  loadName();
}

init();
