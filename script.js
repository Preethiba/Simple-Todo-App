
//Add todo from local storage
window.onload = appstart;
function appstart(){
    if(localStorage.getItem('tasks') !== null){
        document.getElementById("myTodoList").style.visibility = "visible";
        let list = document.getElementById("ulist");
        let TodoList = document.getElementById("myTodoList");
        let task = JSON.parse(localStorage.getItem('tasks'));

        task.forEach(function(item){
        let listItem = document.createElement('li');
        listItem.setAttribute('class','tasklist')
        listItem.appendChild(document.createTextNode(item));

        let deleteItem = document.createElement('i');
        deleteItem.setAttribute('class','fa fa-trash');

        listItem.appendChild(deleteItem);
        list.appendChild(listItem);
        TodoList.appendChild(list);
        });
    }
}

//Add new todo
document.getElementById("btn1").addEventListener("click",() => 
	{
	document.querySelector("#warnTodo").style.visibility = "hidden";
	let myTodo = document.getElementById("input").value;
	let TodoList = document.getElementById("myTodoList");
    let list = document.getElementById("ulist");
    if(myTodo.length > 0){
        document.getElementById("myTodoList").style.visibility = "visible";
    	let listItem = document.createElement('li');
        listItem.setAttribute('class','tasklist')
    	listItem.appendChild(document.createTextNode(myTodo));

        let deleteItem = document.createElement('i');
        deleteItem.setAttribute('class','fa fa-trash');

        listItem.appendChild(deleteItem);
    	list.appendChild(listItem);
        TodoList.appendChild(list);

        //add to localstorage
        let tasks = [];
        if(localStorage.getItem('tasks') === null){
            tasks = [];
        }else{
            tasks = JSON.parse(localStorage.getItem('tasks'));
            console.log(tasks);
        }
        tasks.push(myTodo)
        localStorage.setItem('tasks',JSON.stringify(tasks));
    }
	else{
		document.querySelector("#warnTodo").style.visibility = "visible";
	}

});


//clear all todo
document.getElementById("btn2").addEventListener("click", () => {
    var totalElements = document.querySelectorAll('li');
    totalElements.forEach(function(element){
        element.remove();
    });
    localStorage.clear();
    document.getElementById("myTodoList").style.visibility = "hidden";
});


//delete particular todo
document.querySelector('ul').addEventListener("click",(e) => {
    if(e.target.parentElement.className === "tasklist"){
        e.target.parentElement.remove();

    //Remove from LS

    removefromLS(e.target.parentElement);
    }
});

function removefromLS(item){
    let tasks;
        if(localStorage.getItem('tasks') === null){
            tasks = [];
        }else{
            tasks = JSON.parse(localStorage.getItem('tasks'));
            console.log(tasks);
        }
    tasks.forEach((task,index) => {
        if(item.textContent === task){
            tasks.splice(index,1)
        }
    });
    localStorage.setItem('tasks',JSON.stringify(tasks));
}

//filter todo
document.getElementById('filter').addEventListener("keyup",(e) => {
    const item = e.target.value.toLowerCase();
    document.querySelectorAll('li').forEach((task) => {
        let todo = task.firstChild.textContent;
        if(todo.toLowerCase().indexOf(item) != -1){
            task.style.display = "block";
        }else{
            task.style.display = "none";
        }
    });
});



