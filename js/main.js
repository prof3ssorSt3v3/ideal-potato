(() => {
  document.querySelector('form').addEventListener('submit', addItem);
})();

function addItem(ev) {
  ev.preventDefault();
  let item = ev.target['item'].value;
  if (!item) return;
  ev.target['item'].value = '';
  createTodo(item);
}

function createTodo(item) {
  let todo = document.createElement('todo-item');
  todo.setAttribute('text', item);
  todo.setAttribute('complete', false);
  document.querySelector('.todos').append(todo);

  //optional event listener
  todo.addEventListener('removedtodo', (ev) => {
    let textOfRemoved = ev.detail.text;
    console.log(textOfRemoved, 'was removed from the page');
    //do whatever you want with the value that was removed
  });
}
