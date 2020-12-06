const todoForm = document.querySelector('.js-todo');
const inputForm = todoForm.querySelector('input');
const todoList = document.querySelector('.js-todoList');

const TODO_LS = 'todos';
let toDos = [];

function deleteToDo(event) {
  console.log(event.target);
  const btn = event.target;
  const li = btn.parentNode;

  console.log(li);
  todoList.removeChild(li);
  const cleanToDo = toDos.filter(function (todo) {
    return todo.id !== parseInt(li.id);
  });
  toDos = cleanToDo;
  saveToDo();
}
function saveToDo() {
  localStorage.setItem(TODO_LS, JSON.stringify(toDos));
}

function addTodo(text) {
  const li = document.createElement('li');
  const span = document.createElement('span');
  const delbtn = document.createElement('button');
  const newId = Date.now();
  span.innerText = text;
  delbtn.innerHTML = '❌';
  delbtn.addEventListener('click', deleteToDo);
  li.appendChild(span);
  li.appendChild(delbtn);
  li.id = newId;
  console.log(newId);
  todoList.appendChild(li);
  const toDoObj = {
    id: newId,
    text: text,
  };
  toDos.push(toDoObj);
  saveToDo();
}

function loadTodo() {
  const todos = localStorage.getItem(TODO_LS);
  if (todos !== null) {
    const pasredeToDos = JSON.parse(todos);
    pasredeToDos.forEach((todo) => {
      addTodo(todo.text);
    });
  }
}

function handleSubmit(event) {
  event.preventDefault();
  console.log(inputForm.value);
  const inputValue = inputForm.value;
  addTodo(inputValue);
  inputForm.value = '';
}

function init() {
  loadTodo();
  todoForm.addEventListener('submit', handleSubmit);
}

init();
