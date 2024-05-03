import { Modal } from "bootstrap";
import { TaskService } from "../infra/services/task";
import { HttpClient } from "../infra/http/http-client";

const httpClient = new HttpClient()
const taskService = new TaskService(httpClient)

class TaskModalForm extends HTMLElement {
  constructor() {
    super();

    this.render()

    const modal = document.getElementById('task-modal-form');
    this.modal = new Modal(modal);
    this.deleteButton = document.getElementById('delete-button');
    this.form = document.getElementById('form');
    this.statusSelect = document.querySelector('[name="status"]');
    this.titleInput = document.querySelector('[name="title"]');
    this.deadlineCheckbox = document.querySelector('[name="deadline-checkbox"]');
    this.deadlineInput = document.querySelector('[name="deadline"]');
    this.descriptionTextArea = document.querySelector('[name="description"]');

    this.deadlineInput.disabled = true;
  }

  connectedCallback() {
    this.form.addEventListener('submit', this.handleSubmit.bind(this));
    this.form.addEventListener('input', this.handleInput.bind(this));

    const modal = document.getElementById('task-modal-form');
    modal.addEventListener('hidden.bs.modal', () =>{
      this.form.reset()
      this.deleteButton.style.display = 'none'
    })

    this.deadlineCheckbox.addEventListener('change', (event) => {
      if (event.target.checked)
        this.deadlineInput.disabled = false;
      else
        this.deadlineInput.disabled = true;
    })

    document.addEventListener('openModalWithTaskData', (event) => {
      const taskData = event.detail;

      this.taskId = taskData.id;
      this.titleInput.classList.remove('is-invalid');
      this.titleInput.value = taskData.title || '';
      this.descriptionTextArea.value = taskData.description || '';
      this.statusSelect.value = taskData.status || '0';
      this.oldStatus = taskData.status || '0';
      this.lastStatusUpdateDate = taskData.lastStatusUpdateDate || null;

      if (this.taskId) {
        this.deleteButton.style.display = 'block';
      }

      if (taskData.deadline) {
        this.deadlineCheckbox.checked = true;
        this.deadlineInput.disabled = false;
      } else {
        this.deadlineCheckbox.checked = false;
        this.deadlineInput.disabled = true;
      }
      this.deadlineInput.value = taskData.deadline ? `${new Date(taskData.deadline).toISOString().slice(0, 10)}` : '';

      this.modal.show()
    });

    this.deleteButton.addEventListener('click', async () => {
      await taskService.deleteTask(this.taskId)
      document.dispatchEvent(new CustomEvent('fetchTasks'));
      this.modal.hide();
    })
  }

  async handleSubmit(event) {
    event.preventDefault();

    if (this.form.checkValidity()) {
      const formData = new FormData(this.form);

      const task = {
        title: formData.get('title'),
        description: formData.get('description'),
        status: Number(formData.get('status')),
        deadline_date: formData.get('deadline') ? new Date(formData.get('deadline')) : null,
      };

      if (this.taskId) {
        task.created_date = new Date();
        task.last_status_update_date = Number(this.oldStatus) !== task.status ? new Date() : this.lastStatusUpdateDate;

        await taskService.updateTask(task, this.taskId)
      } else {
        task.last_status_update_date = new Date();
        await taskService.createTask(task)
      }

      document.dispatchEvent(new CustomEvent('fetchTasks'));

      this.modal.hide();
    } else {
      event.stopPropagation();
      this.handleInvalid();
    }
  }

  handleInvalid() {
    const invalidFields = this.form.querySelectorAll(':invalid');
    for (var item of invalidFields) {
      item.classList.add('is-invalid');
    }
  }

  handleInput(event) {
    event.target.classList.remove('is-invalid');
  }

  render() {
    const template = document.createElement('template');
    template.innerHTML = `
      <div class="modal fade" id="task-modal-form" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5">Nova tarefa</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form id="form" novalidate>
              <div class="modal-body">
                <div class="d-flex flex-column gap-3 ">
                  <select name="status" class="form-select w-50" aria-label="Selecionar status">
                    <option value="0">A fazer</option>
                    <option value="1">Fazendo</option>
                    <option value="2">Concluído</option>
                  </select>

                  <div class="input-group has-validation">
                    <input name="title" type="text" class="form-control" placeholder="Insira o nome da tarefa" required>
                    <div class="invalid-feedback">
                      Campo obrigatório
                    </div>
                  </div>

                  <div class="form-check form-switch user-select-none">
                    <input name="deadline-checkbox" class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault">
                    <label class="form-check-label" for="flexSwitchCheckDefault">Habilitar prazo</label>
                  </div>

                  <div class="w-50">
                    <input type="date" name="deadline" class="form-control" placeholder="dd/mm/aaaa">
                  </div>

                  <textarea class="form-control" name="description" placeholder="Insira uma descrição" rows="5"></textarea>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" id="delete-button">Excluir</button>
                <button type="submit" class="btn btn-primary">Salvar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    `;

    this.appendChild(template.content);
  }
}

customElements.define('task-modal-form', TaskModalForm);
