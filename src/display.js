import { projArray } from "./project.js";

const projectsContainer = document.getElementById("projects");

function displayProjects() {
    // Clear existing projects
    projectsContainer.innerHTML = '';
    
    // Display each project
    projArray.forEach(proj => {
        const projDiv = document.createElement("div");
        projDiv.classList.add("projects");
        projDiv.innerText = proj.name;
        projDiv.dataset.projectId = proj.id; // Store project ID for later use
        
        // Add click event to select project (optional)
        projDiv.addEventListener('click', function() {
            // Remove active class from all projects
            document.querySelectorAll('.projects').forEach(p => p.classList.remove('active'));
            // Add active class to clicked project
            projDiv.classList.add('active');
        });
        
        projectsContainer.appendChild(projDiv);
    });
}

// Initial display
displayProjects();

// Export the function so it can be called when new projects are added
export { displayProjects };