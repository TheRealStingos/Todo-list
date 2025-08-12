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

export { todo }