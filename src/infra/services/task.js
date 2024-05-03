import TaskEntity from "../../domain/entities/task"

export class TaskService {
  constructor(httpClient) {
    this.httpClient = httpClient
  }

  async getTasks({ title = null } = {}) {
    const queryParams = title ? new URLSearchParams({ title }) : ''
    const paramString = queryParams ? `?${queryParams.toString()}` : ''
    const data = await this.httpClient.get(`http://localhost:4000/tasks${paramString}`)

    const taskList = Array(...data).map(task => {
      return new TaskEntity({
        id: task.id,
        title: task.title,
        description: task.description,
        status: task.status,
        lastStatusUpdateDate: task.last_status_update_date,
        createdDate: task.created_date,
        deadlineDate: task.deadline_date,
      })
    })

    return taskList
  }

  async createTask(task) {
    const data = await this.httpClient.post('http://localhost:4000/tasks', task)
    return new TaskEntity(data)
  }

  async updateTask(task, id) {
    const data = await this.httpClient.put(`http://localhost:4000/tasks/${id}`, task)
    return new TaskEntity(data)
  }

  async deleteTask(taskId) {
    await this.httpClient.delete(`http://localhost:4000/tasks/${taskId}`)
  }
}
