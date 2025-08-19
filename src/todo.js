import { defaultProj, projArray, saveProjects, project } from "./project.js";

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

// Function to populate project dropdown
function populateProjectDropdown() {
    const projectSelect = document.getElementById("project-select");
    
    // Clear existing options
    projectSelect.innerHTML = '';
    
    // Add existing projects
    projArray.forEach(proj => {
        const option = document.createElement("option");
        option.value = proj.id;
        option.textContent = proj.name;
        projectSelect.appendChild(option);
    });
    
    // Add "Create new project" option
    const newProjectOption = document.createElement("option");
    newProjectOption.value = "new";
    newProjectOption.textContent = "Create new project...";
    projectSelect.appendChild(newProjectOption);
}

// Handle project selection change
document.getElementById("project-select").addEventListener("change", function() {
    const newProjectField = document.getElementById("new-project-name");
    const newProjectLabel = document.getElementById("new-project-label");
    
    if (this.value === "new") {
        newProjectField.style.display = "block";
        newProjectLabel.style.display = "block";
        newProjectField.required = true;
    } else {
        newProjectField.style.display = "none";
        newProjectLabel.style.display = "none";
        newProjectField.required = false;
        newProjectField.value = "";
    }
});

//Get params for task creation
document.getElementById("new-task-form").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const todoName = document.getElementById("todo-title").value;
    const todoDesc = document.getElementById("todo-desc").value;
    const dueDate = document.getElementById("due-date").value;
    const prio = document.querySelector('input[name="priority"]:checked')?.value || null;
    const selectedProjectId = document.getElementById("project-select").value;
    const newProjectName = document.getElementById("new-project-name").value;
    
    let targetProject;
    
    // Determine which project to add the task to
    if (selectedProjectId === "new" && newProjectName.trim()) {
        // Create new project
        const newProj = new project(newProjectName.trim());
        projArray.push(newProj);
        targetProject = newProj;
        
        // Update project dropdown and display
        populateProjectDropdown();
        import('./display.js').then(module => {
            module.displayProjects();
        });
    } else if (selectedProjectId !== "new") {
        // Find existing project
        targetProject = projArray.find(proj => proj.id == selectedProjectId);
    }
    
    // Default to default project if something goes wrong
    if (!targetProject) {
        targetProject = defaultProj;
    }
    
    // Create and add the todo
    const newTodo = new todo(todoName, todoDesc, prio, dueDate, targetProject.name);
    targetProject.addtodo(newTodo);

    //Reset new task/proj forms
    document.getElementById("new-task-form").classList.replace("visible", "invisible");
    document.getElementById("new-form").classList.replace("invisible", "visible");
    
    // Clear form fields
    document.getElementById("todo-title").value = '';
    document.getElementById("todo-desc").value = '';
    document.getElementById("due-date").value = '';
    document.getElementById("new-project-name").value = '';
    document.getElementById("new-project-name").style.display = 'none';
    document.getElementById("new-project-label").style.display = 'none';
    document.querySelectorAll('input[name="priority"]').forEach(radio => radio.checked = false);
    
    // Reset project selection to default
    document.getElementById("project-select").value = defaultProj.id;
    
    // Save changes to localStorage
    saveProjects();
    
    // Update display if the target project is currently selected
    const activeProject = document.querySelector('.projects.active');
    if (activeProject && activeProject.textContent.trim() === targetProject.name) {
        import('./display.js').then(module => {
            module.displayTodos(targetProject);
        });
    }
});

// Initialize project dropdown when the module loads
document.addEventListener('DOMContentLoaded', function() {
    populateProjectDropdown();
});

// Also populate when the form becomes visible
document.getElementById("new-todo").addEventListener("click", function() {
    setTimeout(populateProjectDropdown, 0); // Use timeout to ensure form is visible
});

export { todo, populateProjectDropdown };