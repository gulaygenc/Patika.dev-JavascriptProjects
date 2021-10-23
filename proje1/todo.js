const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");

eventListeners();

function eventListeners(){
    form.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded",laodAllTodosToUI);
    secondCardBody.addEventListener("click",deleteTodo);
    filter.addEventListener("keydown",filterTodos);
    clearButton.addEventListener("click",clearAllTodos);
}

function addTodo(e){
    const newTodo = todoInput.value.trim();
    
    if(newTodo === ""){
        showAlert("danger","Lütfen bir todo girin");
    }
    else{
        addTodoToUI(newTodo);
        addTodoToStorage(newTodo);
        showAlert("success","Todo başarılı bir şekilde eklendi");
    }   
    e.preventDefault();    
}

function clearAllTodos(e){
    if(confirm("Tümünü silmek istediğinize emin misiniz?")){
        while(todoList.firstElementChild != null){
            todoList.removeChild(todoList.firstElementChild);
        }
        localStorage.removeItem("todos");
    }

}

function filterTodos(e){
    const filterValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");

    listItems.forEach(function(listItem){
        const text = listItem.textContent.toLowerCase();
        if(text.indexOf(filterValue) === -1){
            listItem.setAttribute("style","display : none !important");
        }
        else{
            listItem.setAttribute("style","display : block");
        }
    });

}

function deleteTodo(e){
    if(e.target.className === "fa fa-remove"){
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
        showAlert("success","Todo başarılı bir şekilde silindi");
    }
}

function deleteTodoFromStorage(deletetodo){
    let todos = getTodosFromStorage();

    todos.forEach(function(todo,index){
        if ( todo === deletetodo){
            todos.splice(index,1);
        }
    });

    localStorage.setItem("todos",JSON.stringify(todos));
}

function laodAllTodosToUI(){
    let todos = getTodosFromStorage();

    todos.forEach(function(todo){
        addTodoToUI(todo);
    })

}

//Storagedan bütün todoarı alacak
function getTodosFromStorage(){
    let todos;

    if(localStorage.getItem("todos") === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}

function addTodoToStorage(newTodo){
    let todos = getTodosFromStorage();

    todos.push(newTodo);

    localStorage.setItem("todos",JSON.stringify(todos));
}

function showAlert(type,message){
    const alert = document.createElement("div");
    alert.className = `alert alert-${type}`;
    alert.textContent = message;

    firstCardBody.appendChild(alert);

    //SetTimeOut
    setTimeout(function(){
        alert.remove();
    },1000);
}

//String değerini list item olarak ekler
function addTodoToUI(newTodo){
    const listItem = document.createElement("li");
    const link = document.createElement("a");
    
    link.href = "#";
    link.className = "delete-item";
    link.innerHTML = "<i class = 'fa fa-remove'></i>"
    listItem.className = "list-group-item d-flex justify-content-between";
    
    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);
    
    todoList.appendChild(listItem);
    todoInput.value = "";
}

