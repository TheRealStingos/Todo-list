class project {
    constructor (name) {
        this.name = name;
        this.id = Date.now() + Math.random();
        this.todos = [];
        this.createdAt = new Date();
    }
}

export { project }