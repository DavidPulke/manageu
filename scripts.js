import TaskManager from "./classes/TaskManager.js";
import Task from "./classes/Task.js";


let manager = new TaskManager();
console.log(manager);






window.addNewTask = function addNewTask() {
  let description = document.getElementById("description").value;

  if (description) {
    manager.addTask(description);
    showTasks()
  } else {
    alert('INVALID INPUT: please enter a new Task Description')
  }
};

function showTasks() {
  document.getElementById("activeTasks").innerHTML = "";
  document.getElementById("completedTasks").innerHTML = "";

  for (let task of manager.tasks) {
    if (task.completed) {
      document.getElementById(
        "completedTasks"
      ).innerHTML += `<div><li  class='text-bg-dark completed-li list-group-item d-inline-block w-50 font-monospace'> ${task.description}</li> <button class='btn btn-success me-1' disabled> <i class="fa-solid fa-check"></i> </button><button class='btn btn-primary me-1' disabled> <i class="text-light fa-sharp fa-solid fa-pencil"></i> </button><button class='btn btn-danger me-1' onclick="deleteTask(${task.id})"> <i class="fa-solid fa-trash"></i> </button </div>
    `;
    } else {
      document.getElementById(
        "activeTasks"
      ).innerHTML += `<div><li class='list-group-item  d-inline-block w-50 font-monospace'> ${task.description}</li> <button class='btn btn-success me-1' onclick='completeTask(${task.id})'> <i class="fa-solid fa-check"></i> </button><button class='btn btn-primary me-1' onclick='updateTaskDescription(${task.id},"${task.description}")'> <i class="text-light fa-sharp fa-solid fa-pencil"></i> </button><button class='btn btn-danger me-1' onclick="deleteTask(${task.id})"> <i class="fa-solid fa-trash"></i> </button </div>
    `;
    }
  }
  localStorage.setItem("Tasks", JSON.stringify(manager.tasks))
}

let storageData = JSON.parse(localStorage.getItem("Tasks"));
for (let task of storageData) {
  let { id, description, completed } = task;
  let newTask = new Task(description);
  newTask.id = id
  newTask.completed = completed;
  manager.tasks.push(newTask)
}


showTasks();

window.completeTask = function completeTask(id) {
  manager.completeTask(id);
  showTasks();
};




window.updateTaskDescription = function updateTaskDescription(id, oldDesc) {

  let newDesc = prompt("Edit Your Task Description", oldDesc);

  if (newDesc && newDesc != null && newDesc.length < 20) {
    manager.updateTaskDescription(id, newDesc);
    showTasks(); // כדי לעדכן את התצוגה לאחר עריכת המשימה
  } else if (newDesc.length > 20) {
    alert('Invalid input: the input must contain less then 20 letters');
  }
  else {
    alert('INVALID INPUT: you need to write atleast 1 letter')
  }
}

window.deleteTask = function deleteTask(id) {
  if (confirm("Are You Sure")) {
    manager.deleteTask(id)
    showTasks()
  }
}