import { saveProjects as saveProjectsToStorage, loadProjectsData } from "./storage.js";

class project {
    constructor (name) {
        this.name = name;
        this.id = Date.now() + Math.random();
        this.todos = [];
        this.createdAt = new Date();
    }

    addtodo(todo){
        this.todos.push(todo);
        return this;
    }

    removeTodo(todoId){
        this.todos = this.todos.filter(todo => todo.id !== todoId)
        return this;
    }
}

// Function to save projects to localStorage
function saveProjects() {
    saveProjectsToStorage(projArray);
}

// Function to load projects from localStorage
function loadProjects() {
    const projectsData = loadProjectsData();
    if (projectsData) {
        // Recreate project instances from the stored data
        return projectsData.map(projData => {
            const proj = new project(projData.name);
            proj.id = projData.id;
            proj.createdAt = new Date(projData.createdAt);
            // Store todos as plain objects for now
            proj.todos = projData.todos || [];
            return proj;
        });
    }
    return null;
}

//Create array to store projects
let projArray = loadProjects();

// If no stored projects, create default
if (!projArray) {
    projArray = [];
    const defaultProj = new project("default");
    projArray.push(defaultProj);
    saveProjects(); // Save the initial state
}

const defaultProj = projArray.find(proj => proj.name === "default") || projArray[0];

//Get params for project creation
document.getElementById("new-proj-form").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const projName = document.getElementById("proj-title").value;

    //Push project to project array
    projArray.push(new project(projName));

    //Reset new task/project forms
    document.getElementById("new-proj-form").classList.replace("visible", "invisible");
    document.getElementById("new-form").classList.replace("invisible", "visible");
    
    // Save to localStorage properly
    saveProjects();
    console.log(projArray);
});

export { project, defaultProj, projArray, saveProjects };