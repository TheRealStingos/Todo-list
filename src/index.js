import { todo } from "./todo.js"
import { projArray, project } from "./project.js"
import "./display.js"
import "./styles.css"


document.getElementById("new-form").addEventListener("click", function() {
    document.getElementById("new-form").classList.add("invisible");

    document.getElementById("new-todo").classList.replace("invisible", "visible")
    document.getElementById("new-project").classList.replace("invisible", "visible")

    document.getElementById("new-todo").addEventListener("click", function() {
        document.getElementById("new-project").classList.replace("visible", "invisible");
        document.getElementById("new-todo").classList.replace("visible", "invisible");
        document.getElementById("new-task-form").classList.replace("invisible", "visible")
    });

    document.getElementById("new-project").addEventListener("click", function() {
        document.getElementById("new-todo").classList.replace("visible", "invisible");
        document.getElementById("new-project").classList.replace("visible", "invisible");
        document.getElementById("new-proj-form").classList.replace("invisible", "visible");
    })
});