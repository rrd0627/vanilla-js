const todoForm = document.querySelector(".js-todoForm"),
    todoInput = todoForm.querySelector("input"),
    todoList = document.querySelector(".js-todoList");


const TODOS_LS = "toDosList";

let toDos = [];

function paintToDos(text) {
    const li = document.createElement("li");
    const deleteBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length +1;
    deleteBtn.innerText = 'X';
    deleteBtn.addEventListener("click",deleteToDos);
    span.innerText = text;
    li.appendChild(span);
    li.appendChild(deleteBtn);
    li.id = newId;
    todoList.appendChild(li);
    const toDoObj = {
        text:text,
        id : newId
    };
    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(event) {
    event.preventDefault();
    const curValue = todoInput.value;
    paintToDos(curValue);
    todoInput.value = "";
}

function loadToDos() {
    const loadToDos = localStorage.getItem(TODOS_LS); 
    if (loadToDos !== null) {
        const parsedToDos = JSON.parse(loadToDos);
        parsedToDos.forEach(function(toDo) {
            paintToDos(toDo.text);           
        });
    }
}

function deleteToDos(event){
    const btn = event.target;
    const li = btn.parentNode;
    todoList.removeChild(li);
    const cleanToDos = toDos.filter(function FilterFunc(toDo){
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    saveToDos();
}

function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}


function init() {
    loadToDos();
    todoForm.addEventListener("submit", handleSubmit);
}

init();