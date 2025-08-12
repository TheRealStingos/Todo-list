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
