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

export { project }