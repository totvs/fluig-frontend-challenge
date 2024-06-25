import * as bootstrap from "bootstrap";
import "./DateInput.js";

class Modal extends HTMLElement {
  constructor() {
    super();

    this.disabledTaskDueDate = true;
    this._taskName = "";
    this._taskDescription = "";
    this._taskDueDate = "";

    const titleProperty = this.getAttribute("title");

    const template = `
      <div class="modal fade text-start" id="addTask" tabindex="-1" aria-labelledby="add task" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5">${titleProperty}</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form class="add-task">
                <div class="mb-3">
                  <select name="task-status" class="form-select" aria-label="Select status">
                    <option value="0">A fazer</option>
                    <option value="1">Fazendo</option>
                    <option value="2">Concluído</option>
                  </select>
                </div>
                <div class="mb-3">
                  <div class="form-check form-switch form-switch-lg">
                    <input name="enable-due-date" class="form-check-input" type="checkbox" role="switch">
                    <label class="form-check-label" for="enableDueDate">Habilitar prazo</label>
                  </div>
                  <div class="mb-3 w-75">
                    <label for="taskDueDate" class="col-form-label">Prazo:</label>
                    <date-input name="task-due-date" placeholder="dd/mm/aaaa" disabled></date-input>
                    <div class="invalid-feedback">
                      Preencha o prazo da tarefa.
                    </div>
                  </div>
                </div>
                <div class="mb-3">
                  <label for="task-name" class="col-form-label">Task name:</label>
                  <input name="task-name" type="text" class="form-control">
                  <div class="invalid-feedback">
                    Preencha o nome da tarefa.
                  </div>
                </div>
                <div class="mb-3">
                  <label for="description-text" class="col-form-label">Description:</label>
                  <textarea name="task-description" class="form-control" style="height: 100px"></textarea>
                  <div class="invalid-feedback">
                    Preencha a descrição da tarefa.
                  </div>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary exclude-button">Excluir</button>
              <button type="button" class="btn btn-primary save-button">Salvar</button>
            </div>
          </div>
        </div>
      </div>`;

    this.innerHTML = template;
    this.taskNameField = this.querySelector("input[name=task-name]");
    this.taskDueDateInput = this.querySelector("date-input");
    this.taskDueDateInput.addEventListener(
      "dateInputChanged",
      async (event) => {
        const date = event.detail.value;
        this._taskDueDate = date;
      }
    );

    this.enableDueDateSwitch = this.querySelector(
      "input[name=enable-due-date]"
    );
    this.enableDueDateSwitch.addEventListener(
      "click",
      this.handleOnClickEnableDueDate.bind(this)
    );
  }

  handleOnClickEnableDueDate() {
    this.disabledTaskDueDate = !this.disabledTaskDueDate;
    if (this.disabledTaskDueDate) {
      this.taskDueDateInput.setAttribute("disabled", "disabled");
    } else {
      this.taskDueDateInput.removeAttribute("disabled");
    }
  }

  validateForm(formData) {
    let fieldValidate = false;

    if (!this.disabledTaskDueDate && this._taskDueDate.trim() == "") {
      this.taskDueDateInput.setAttribute("valid", "false");
      fieldValidate = false;
    } else {
      this.taskDueDateInput.setAttribute("valid", "true");
      fieldValidate = true;
    }

    if (formData.get("task-name").trim() === "") {
      const nameInput = this.querySelector("input[name=task-name]");
      nameInput.classList.add("is-invalid");
      fieldValidate = false;
    } else {
      const nameInput = this.querySelector("input[name=task-name]");
      nameInput.classList.remove("is-invalid");
      fieldValidate = true;
    }

    if (formData.get("task-description").trim() === "") {
      const descriptionInput = this.querySelector(
        "textarea[name=task-description]"
      );
      descriptionInput.classList.add("is-invalid");
      fieldValidate = false;
    } else {
      const descriptionInput = this.querySelector(
        "textarea[name=task-description]"
      );
      descriptionInput.classList.remove("is-invalid");
      fieldValidate = true;
    }

    return fieldValidate;
  }

  handleOnClickSaveButton(event) {
    event.preventDefault();

    const formData = new FormData(form);

    if (!this.validateForm(formData)) {
      return;
    }

    const task = {
      id: crypto.randomUUID(),
      title: formData.get("task-name"),
      description: formData.get("task-description"),
      created_date: this._taskDueDate.trim(),
      status: parseInt(formData.get("task-status")) || 0,
      deadline_date: this._taskDueDate.trim(),
      last_status_update_date: new Date().toISOString(),
    };

    this.dispatchEvent(new CustomEvent("formSubmitted", { detail: task }));

    this.form.reset();
    this.taskDueDateInput.setAttribute("value", "");
  }

  connectedCallback() {
    this.form = this.querySelector(".add-task");

    this.excludeButton = this.querySelector(".exclude-button");
    this.excludeButton.addEventListener("click", (event) => {
      event.preventDefault();
      this.dispatchEvent(new CustomEvent("excludeTask"));
    });

    this.saveButton = this.querySelector(".save-button");
    this.saveButton.addEventListener(
      "click",
      this.handleOnClickSaveButton.bind(this)
    );

    const selectTaskStatus = this.querySelector("select[name=task-status]");
    selectTaskStatus.addEventListener("change", (event) => {
      const selectedTaskStatusEvent = new CustomEvent(
        "selectedTaskStatusEvent",
        {
          composed: true,
          bubbles: true,
          detail: {
            status: event.target.value,
          },
        }
      );
      this.dispatchEvent(selectedTaskStatusEvent);
    });
  }

  disconnectedCallback() {
    this.saveButton.removeEventListener(
      "click",
      this.handleOnClickSaveButton.bind(this)
    );
    this.enableDueDateSwitch.removeEventListener(
      "click",
      this.handleOnClickEnableDueDate.bind(this)
    );
  }

  openModal(taskName, taskDescription) {
    this.taskNameField.value = taskName;
    this.querySelector("textarea[name=task-description]").textContent =
      taskDescription;
    const bootstrapModal = new bootstrap.Modal(this.querySelector("#addTask"));
    bootstrapModal.show();
  }

  get tagName() {
    return this._taskName;
  }

  set tagName(value) {
    this._taskName = value;
  }
}

customElements.define("app-modal-component", Modal);
