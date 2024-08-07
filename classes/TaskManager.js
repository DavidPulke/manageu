import Task from "./Task.js";

class TaskManager {
    constructor() {
        this.tasks = []
    }

    set(prop, value) {
        this[prop] = value
    }

    get(prop) {
        return this[prop]
    }

    addTask(desc) {
        this.tasks.push(new Task(desc))
    }

    deleteTask(id) {
        this.tasks = this.tasks.filter((task) => {
            return task.id != id
        })
    }

    updateTaskDescription(id, newDesc) {
        let indexToUpdate = this.tasks.findIndex((task) => {
            return task.id == id
        })
        this.tasks[indexToUpdate].description = newDesc;
    }

    completeTask(id) {
        let indexToUpdate = this.tasks.findIndex((task) => {
            return task.id == id
        })
        this.tasks[indexToUpdate].completed = true;
    }
}

export default TaskManager;