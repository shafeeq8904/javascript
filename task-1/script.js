document.addEventListener("DOMContentLoaded", loadTasks);

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

addTaskBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function(event){
    if(event.key === "Enter"){
        addTask();
    }
})

function addTask(){
    const taskText = taskInput.value.trim();
    if(taskText === ""){
        alert("Task cannot be empty");
        return;
    }

    const li = document.createElement("li");
    li.innerHTML = `
            <span>${taskText}</span>
            <div>
                    <button onclick="toggleComplete(this)" class="tick">✔</button>
                    <button onclick="removeTask(this)"
                    class="cross">✖</button>
            </div>`

    taskList.appendChild(li);
    taskInput.value = "";
    saveTasks();
}

function toggleComplete(button) {
    button.parentElement.parentElement.classList.toggle("completed");
    saveTasks();
}

function removeTask(button) {
    button.parentElement.parentElement.remove();
    saveTasks();
}

function saveTasks(){
    const tasks = [];
    document.querySelectorAll("#taskList li").forEach(li =>{
        tasks.push({
            text: li.querySelector("span").innerText,
            complete: li.classList.contains("completed")
        })
    })

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.forEach(task => {
        const li = document.createElement("li");
        if (task.complete) { 
            li.classList.add("completed");
        }
        li.innerHTML = `
            <span>${task.text}</span>
            <div>
                <button onclick="toggleComplete(this)">✔</button>
                <button onclick="removeTask(this)">✖</button>
            </div>
        `;
        taskList.appendChild(li);
    });
}