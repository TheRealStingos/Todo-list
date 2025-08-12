import { todo } from "./todo.js"
import { project } from "./project.js"
import "./styles.css"

document.getElementById("new-form").addEventListener("click", function() {
    document.getElementById("new-form").style.display="none";


    document.getElementById("new-todo").style.display="block";
    document.getElementById("new-project").style.display="block";

    document.getElementById("new-todo").addEventListener("click", function() {
        document.getElementById("new-project").style.display="none";
        document.getElementById("new-todo").style.display="none";
        document.getElementById("new-task-form").style.display="block";
    });

    document.getElementById("new-project").addEventListener("click", function() {
        document.getElementById("new-todo").style.display="none";
        document.getElementById("new-project").style.display="none";
        document.getElementById("new-proj-form").style.display="block";
    })
});

const defaultProj = new project("default");

document.getElementById("new-task-form").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const todoName = document.getElementById("todo-title").value;
    const todoDesc = document.getElementById("todo-desc").value;
    const dueDate = document.getElementById("due-date").value;
    const prio = document.querySelector('input[name="priority"]:checked')?.value || null;
    
    defaultProj.todos.push(new todo(todoName, todoDesc, prio, dueDate));
    console.log(defaultProj);
});

document.getElementById("new-proj-form").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const todoName = document.getElementById("proj-title").value;
    
    const proj = new project(todoName);

    console.log(proj);
});

const test1 = new todo("test1", "testing");
const test2 = new todo("test2", "testing again");
const test3 = new project("test proj");

console.log(test1);
console.log(test2);
console.log(test3);

test3.todos.push(test1);

console.log(test3);
