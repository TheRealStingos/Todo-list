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

//Create array to store projects
const projArray = [];
const defaultProj = new project("default");
projArray.push(defaultProj);


//Get params for project creation
document.getElementById("new-proj-form").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const projName = document.getElementById("proj-title").value;

    //Push project to default array
    projArray.push(new project(projName));

    //Reset new task/project forms
    document.getElementById("new-proj-form").style.display="none";
    document.getElementById("new-form").style.display="block";
});


export { project, defaultProj, projArray }
