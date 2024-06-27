import TasksGateway from "./tasks-gateway.js";

export default class TasksHttpGateway extends TasksGateway {
  constructor(httpClient) {
    super();
    this.httpClient = httpClient;
    this.baseUrl = "http://localhost:3000";
  }

  async getTasksByTitle(title) {
    const todosData = await this.httpClient.get(
      `${this.baseUrl}/tasks?title=${title}`
    );
    return todosData;
  }

  async getAllTasks() {
    const todosData = await this.httpClient.get(
      `${this.baseUrl}/tasks?_sort=title&_order=asc`
    );
    return todosData;
  }

  async addTask(task) {
    const todoData = await this.httpClient.post(`${this.baseUrl}/tasks`, task);
    return todoData;
  }

  async updateTask(task) {
    const todoData = await this.httpClient.put(
      `${this.baseUrl}/tasks/${task.id}`,
      task
    );
    return todoData;
  }

  async onTaskDeleted(id) {
    await this.httpClient.delete(`${this.baseUrl}/tasks/${id}`);
  }

  async getTaskById(id) {
    const todoData = await this.httpClient.get(`${this.baseUrl}/tasks/${id}`);
    return todoData;
  }
}
