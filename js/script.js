const todoControl = document.querySelector('.todo-control');
const headerInput = document.querySelector('.header-input');
const todoList = document.querySelector('.todo-list');
const todoComplited = document.querySelector('.todo-completed');

let json;
let toDoData = [];
toDoData = JSON.parse(localStorage.getItem('deal'));

const render = function () {
    todoList.innerHTML = '';
    todoComplited.innerHTML = '';

    toDoData.forEach(function (item) {

        const li = document.createElement('li');
        li.classList.add('todo-item');

        li.innerHTML = '<span class="text-todo">' + item.text + '</span>' +
            '<div class="todo-buttons">' +
            '<button class="todo-remove"></button>' +
            '<button class="todo-complete"></button>' +
            '</div>';

        if (item.completed) {
            todoComplited.append(li);
        } else {
            todoList.append(li);
        }

        li.querySelector('.todo-complete').addEventListener('click', function () {
            item.completed = !item.completed;
            render();
        });

        li.querySelector('.todo-remove').addEventListener('click', function () {
            li.remove();

        });
    });
};

todoControl.addEventListener('submit', function (event) {

    event.preventDefault();
    if (headerInput.value == '') {
        todoControl.disabled = true;
    } else {

        const newToDo = {
            text: headerInput.value,
            completed: false
        };

        toDoData.push(newToDo);
        headerInput.value = '';

        json = JSON.stringify(toDoData);
        localStorage.setItem('deal', json);

        render();
    }
});