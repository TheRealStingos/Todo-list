// storage.js - Shared storage utilities to avoid circular imports

// Function to save projects to localStorage
export function saveProjects(projArray) {
    localStorage.setItem("projArray", JSON.stringify(projArray));
}

// Function to load projects from localStorage (returns plain objects)
export function loadProjectsData() {
    const stored = localStorage.getItem("projArray");
    if (stored) {
        try {
            return JSON.parse(stored);
        } catch (error) {
            console.warn("Failed to load projects from localStorage, clearing corrupted data:", error);
            localStorage.removeItem("projArray");
            return null;
        }
    }
    return null;
}