const initialData = [
  { id: crypto.randomUUID(), text: 'Eat' },
  { id: crypto.randomUUID(), text: 'Sleep' },
  { id: crypto.randomUUID(), text: 'Code' },
  { id: crypto.randomUUID(), text: 'Repeat' },
];

(() => {
  document.querySelector('form').addEventListener('submit', addItem);
  buildInitialList(initialData);
})();

function addItem(ev) {
  ev.preventDefault();
  let item = ev.target['item'].value;
  if (!item) return;
  ev.target['item'].value = '';
  createTodo(item);
}

function createTodo(item, id = null) {
  let todo = document.createElement('todo-item');
  let complete = id === null ? false : Boolean(Math.round(Math.random()));
  id = id ?? crypto.randomUUID(); //if id is null build one
  todo.setAttribute('data-ref', id);
  todo.setAttribute('text', item);
  //set a random true or false for completed
  todo.setAttribute('complete', complete);
  document.querySelector('.todos').append(todo);

  //optional event listener
  todo.addEventListener('removedtodo', (ev) => {
    let textOfRemoved = ev.detail.text;
    console.log(textOfRemoved, 'was removed from the page');
    //do whatever you want with the value that was removed
  });
}

function buildInitialList(data) {
  data.forEach((entry) => {
    createTodo(entry.text, entry.id);
  });
}
