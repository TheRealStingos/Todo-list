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

const test1 = new todo("test1", "testing");
const test2 = new todo("test2", "testing again");
const test3 = new project("test proj");

console.log(test1);
console.log(test2);
console.log(test3);

test3.todos.push(test1);

console.log(test3);