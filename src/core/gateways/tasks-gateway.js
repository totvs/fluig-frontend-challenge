export default class TasksGateway {
  getTasksByTitle(title) {
    throw new Error("Method 'getTasksByTitle' must be implemented.");
  }

  getAllTasks() {
    throw new Error("Method 'getAllTasks' must be implemented.");
  }

  addTask(task) {
    throw new Error("Method 'addTask' must be implemented.");
  }

  updateTask(task) {
    throw new Error("Method 'updateTask' must be implemented.");
  }

  onTaskDeleted(id) {
    throw new Error("Method 'onTaskDeleted' must be implemented.");
  }

  getTaskById(id) {
    throw new Error("Method 'getTaskById' must be implemented.");
  }
}
