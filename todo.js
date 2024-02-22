let mytaskssection = document.getElementById("mytasks");
let addTodoButton = document.getElementById("poorna");
let saveButton = document.getElementById("save");

let todoList = getTodoListLocalStorage();
let todosCount = todoList.length;

saveButton.onclick = function() {
    localStorage.setItem("todoList", JSON.stringify(todoList));
};

function getTodoListLocalStorage() {
    let stringifiedTodoList = localStorage.getItem("todoList");
    let parsedTodoList = JSON.parse(stringifiedTodoList);
    if (parsedTodoList === null) {
        return [];
    } else {
        return parsedTodoList;
    }
}

function onTodoStatusChange(checkboxId, labelId) {
    let checkboxElement = document.getElementById(checkboxId);
    let labelElement = document.getElementById(labelId);
    labelElement.classList.toggle("checked");
}

function onDeleteTodo(todoId) {
    let listElement = document.getElementById(todoId);
    mytaskssection.removeChild(listElement);
    // Remove the todo from the todoList array
    todoList = todoList.filter(todo => todo.id !== todoId);
    saveToLocalStorage();
}

function createAndAppendTodo(todo) {
    let todoId = "todo" + todo.uniqueNo;
    let checkboxId = "checkbox" + todo.uniqueNo;
    let labelId = "label" + todo.uniqueNo;

    let listElement = document.createElement("li");
    listElement.classList.add("list-style");
    listElement.id = todoId;
    mytaskssection.appendChild(listElement);

    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = checkboxId;
    inputElement.onclick = function() {
        onTodoStatusChange(checkboxId, labelId);
    };
    inputElement.classList.add("input2");
    listElement.appendChild(inputElement);

    let divElement = document.createElement("div");
    divElement.classList.add("label-container");
    listElement.appendChild(divElement);

    let labelElement = document.createElement("label");
    labelElement.setAttribute("for", checkboxId);
    labelElement.id = labelId;
    labelElement.textContent = todo.text;
    divElement.appendChild(labelElement);

    let deleteContainer = document.createElement("div");
    deleteContainer.classList.add("deleteicon");
    divElement.appendChild(deleteContainer);

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fas", "fa-trash", "delete-icon");
    deleteIcon.onclick = function() {
        onDeleteTodo(todoId);
    };
    deleteContainer.appendChild(deleteIcon);
}

function saveToLocalStorage() {
    localStorage.setItem("todoList", JSON.stringify(todoList));
}

for (let todo of todoList) {
    createAndAppendTodo(todo);
}

function onAddTodo() {
    let userInput = document.getElementById("todouserInput");
    let userInputValue = userInput.value.trim();

    if (userInputValue === "") {
        alert("Enter valid text");
        return;
    }

    todosCount++;
    let newTodo = {
        text: userInputValue,
        uniqueNo: todosCount
    };
    todoList.push(newTodo);
    createAndAppendTodo(newTodo);
    userInput.value = "";
    saveToLocalStorage();
}

addTodoButton.onclick = function() {
    onAddTodo();
};
