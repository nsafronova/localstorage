const todoControl = document.querySelector('.todo-control');
const headerInput = document.querySelector('.header-input');
const todoList = document.querySelector('.todo-list');
const todoComplited = document.querySelector('.todo-completed');

let toDoData = [];


const render = function () {
    todoList.innerHTML = '';
    todoComplited.innerHTML = '';

    toDoData = JSON.parse(localStorage.getItem('deal'));
    if (toDoData == null) {
        toDoData = [];
    }

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
            localStorage.setItem('deal', JSON.stringify(toDoData));
            render();
        });

        li.querySelector('.todo-remove').addEventListener('click', function () {
            toDoData.splice(toDoData.indexOf(item), 1);
            localStorage.setItem('deal', JSON.stringify(toDoData));
            render();
        });

    });
};

todoControl.addEventListener('submit', function (event) {

    event.preventDefault();
    if (headerInput.value === '') {
        todoControl.disabled = true;
    } else {

        const newToDo = {
            text: headerInput.value,
            completed: false
        };

        toDoData.push(newToDo);
        headerInput.value = '';

        localStorage.setItem('deal', JSON.stringify(toDoData));

        render();
    }
});
render();