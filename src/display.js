import { projArray } from "./project.js";

const sidebar = document.getElementById("side-bar");
const projectsContainer = document.getElementById("projects");
const contentContainer = document.getElementById("content");

function displayProjects() {
    // Clear existing projects
    projectsContainer.innerHTML = '';
    
    // Display each project
    projArray.forEach(proj => {
        const projDiv = document.createElement("div");
        projDiv.classList.add("projects");
        projDiv.dataset.projectId = proj.id; // Store project ID for later use
        
        // Create project content structure
        const projectContent = document.createElement("div");
        projectContent.classList.add("project-content");
        
        const projectName = document.createElement("span");
        projectName.classList.add("project-name");
        projectName.textContent = proj.name;
        
        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete-project");
        deleteBtn.innerHTML = "×";
        deleteBtn.title = "Delete project";
        
        // Prevent delete button click from triggering project selection
        deleteBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            deleteProject(proj);
        });
        
        // Add click event to select project (only on the project name area)
        projectContent.addEventListener('click', function() {
            // Remove active class from all projects
            document.querySelectorAll('.projects').forEach(p => p.classList.remove('active'));
            // Add active class to clicked project
            projDiv.classList.add('active');
            
            // Display todos for selected project
            displayTodos(proj);
        });
        
        projectContent.appendChild(projectName);
        
        // Don't show delete button for default project
        if (proj.name !== "default") {
            projectContent.appendChild(deleteBtn);
        }
        
        projDiv.appendChild(projectContent);
        projectsContainer.appendChild(projDiv);
    });
}

function deleteProject(projectToDelete) {
    // Don't allow deleting the default project
    if (projectToDelete.name === "default") {
        alert("Cannot delete the default project!");
        return;
    }
    
    const confirmMessage = projectToDelete.todos && projectToDelete.todos.length > 0 
        ? `Are you sure you want to delete "${projectToDelete.name}"? This will also delete ${projectToDelete.todos.length} task(s).`
        : `Are you sure you want to delete "${projectToDelete.name}"?`;
    
    if (confirm(confirmMessage)) {
        // Find the index of the project to delete
        const projectIndex = projArray.findIndex(proj => proj.id === projectToDelete.id);
        
        if (projectIndex !== -1) {
            // Remove project from array
            projArray.splice(projectIndex, 1);
            
            // Save changes to localStorage
            import('./project.js').then(module => {
                module.saveProjects();
            });
            
            // Clear content area if deleted project was selected
            const activeProject = document.querySelector('.projects.active');
            if (activeProject && activeProject.dataset.projectId == projectToDelete.id) {
                contentContainer.innerHTML = '<p style="color: #666;">Select a project to view its tasks.</p>';
            }
            
            // Refresh the projects display
            displayProjects();
            
            // Update project dropdown in task form
            import('./todo.js').then(module => {
                module.populateProjectDropdown();
            });
        }
    }
}

function displayTodos(project) {
    // Clear existing content
    contentContainer.innerHTML = '';
    
    // Create header for the project
    const projectHeader = document.createElement("h2");
    projectHeader.textContent = `${project.name} Tasks`;
    projectHeader.style.marginBottom = "20px";
    contentContainer.appendChild(projectHeader);
    
    // Check if project has todos
    if (!project.todos || project.todos.length === 0) {
        const noTodos = document.createElement("p");
        noTodos.textContent = "No tasks in this project yet.";
        noTodos.style.color = "#666";
        contentContainer.appendChild(noTodos);
        return;
    }
    
    // Create todos container
    const todosContainer = document.createElement("div");
    todosContainer.classList.add("todos-container");
    
    // Display each todo
    project.todos.forEach(todo => {
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo-item");
        todoDiv.dataset.todoId = todo.id;
        
        // Add completed class if todo is completed
        if (todo.completed) {
            todoDiv.classList.add("completed");
        }
        
        // Add priority class
        if (todo.priority) {
            todoDiv.classList.add(`priority-${todo.priority}`);
        }
        
        // Create todo content
        todoDiv.innerHTML = `
            <div class="todo-header">
                <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''}>
                <h3 class="todo-title">${todo.title}</h3>
                <span class="todo-priority ${todo.priority}">${todo.priority || 'none'}</span>
            </div>
            <p class="todo-description">${todo.description || 'No description'}</p>
            <div class="todo-details">
                <span class="todo-due-date">Due: ${todo.dueDate || 'No due date'}</span>
                <button class="delete-todo">Delete</button>
            </div>
        `;
        
        // Add checkbox toggle functionality
        const checkbox = todoDiv.querySelector('.todo-checkbox');
        checkbox.addEventListener('change', function() {
            todo.completed = checkbox.checked;
            todoDiv.classList.toggle('completed', todo.completed);
            
            // Save changes to localStorage
            import('./project.js').then(module => {
                module.saveProjects();
            });
        });
        
        // Add delete functionality
        const deleteBtn = todoDiv.querySelector('.delete-todo');
        deleteBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to delete this task?')) {
                project.removeTodo(todo.id);
                displayTodos(project); // Refresh the display
                
                // Save changes to localStorage
                import('./project.js').then(module => {
                    module.saveProjects();
                });
            }
        });
        
        todosContainer.appendChild(todoDiv);
    });
    
    contentContainer.appendChild(todosContainer);
}

// Initial display
displayProjects();

// Export the functions so they can be called when new projects/todos are added
export { displayProjects, displayTodos, deleteProject };