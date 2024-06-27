class TaskApi {
  async getTasksByTitle(title) {
    const response = await fetch(`http://localhost:3000/tasks?title=${title}`);
    return await response.json();
  }

  async getAllTasks() {
    const response = await fetch(
      "http://localhost:3000/tasks?_sort=title&_order=asc"
    );
    return await response.json();
  }

  async addTask(task) {
    const response = await fetch("http://localhost:3000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });
    return await response.json();
  }

  async updateTask(task) {
    const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });
    return await response.json();
  }

  async onTaskDeleted(id) {
    const response = await fetch(`http://localhost:3000/tasks/${id}`, {
      method: "DELETE",
    });
    return await response.json();
  }

  async getTaskById(id) {
    const response = await fetch(`http://localhost:3000/tasks/${id}`);
    return await response.json();
  }
}

export default TaskApi;
