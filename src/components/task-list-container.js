import { HttpClient } from "../infra/http/http-client";
import { TaskService } from "../infra/services/task";
import './task-list'

const httpClient = new HttpClient();
const taskService = new TaskService(httpClient)
export class TaskListContainer extends HTMLElement {
  constructor() {
    super()
    this.taskList = []
  }
  async connectedCallback() {
    document.addEventListener('fetchTasks', (event) => {
      const titleSearch = event.detail;
      this.fetchTasks(titleSearch, this.render.bind(this))
    })

    await this.fetchTasks(null, this.render.bind(this))
  }

  async fetchTasks(titleSearch, cb) {
    const params = titleSearch ? {
      title: titleSearch
    } : undefined;
    const taskList = await taskService.getTasks(params)

    this.taskList = taskList

    if (cb) cb()
  }

  render() {
    const columns = [
      'A fazer',
      'Fazendo',
      'Concluído'
    ]
    this.innerHTML = ''
    const taskListEl = document.createElement('task-list');
    taskListEl.setAttribute('columns', JSON.stringify(columns));
    this.appendChild(taskListEl);

    columns.forEach((column, index) => {
      const columnEl = taskListEl.querySelector('ul[data-name="' + column + '"]')
      const countEl = taskListEl.querySelector('span[data-name="' + column + '-count"]')
      let countTasks = 0;

      this.taskList.forEach(task => {
        if (task.status === index) {
          countTasks++;

          const taskItem = `
            <task-element
              task_id="${task.id}"
              title="${task.title}"
              description="${task.description}"
              last_status_update_date="${task.lastStatusUpdateDate}"
              deadline_date="${task.deadlineDate}"
              status="${task.status}"
            >
            </task-element>
          `
          const taskItemEl = document.createElement('span');
          taskItemEl.innerHTML = taskItem;
          columnEl.appendChild(taskItemEl);
        }
      });

      countEl.innerHTML = `(${countTasks})`;
    });
  }
}

customElements.define('task-list-container', TaskListContainer);
