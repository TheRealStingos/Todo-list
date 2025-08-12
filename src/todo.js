import { defaultProj, projArray } from "./project";

class todo {
    constructor (title, description, priority, dueDate, project = null) {
        this.id = Date.now() + Math.random();
        this.title = title;
        this.description = description;
        this.priority = priority
        this.dueDate = dueDate;
        this.completed = false;
        this.createdAt = new Date();
        this.project = project;
    }

    toggleComplete() {
        this.completed = !this.completed;
    }
}


//Get params for task creation
document.getElementById("new-task-form").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const todoName = document.getElementById("todo-title").value;
    const todoDesc = document.getElementById("todo-desc").value;
    const dueDate = document.getElementById("due-date").value;
    const prio = document.querySelector('input[name="priority"]:checked')?.value || null;
    
    //Push task to default project
    defaultProj.todos.push(new todo(todoName, todoDesc, prio, dueDate));

    //Reset new task/proj forms
    document.getElementById("new-task-form").classList.replace("visible", "invisible");
    document.getElementById("new-form").classList.replace("invisible", "visible");
});

export { todo }