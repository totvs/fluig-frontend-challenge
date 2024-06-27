import * as bootstrap from "bootstrap";
import "./date-input.js";

class Modal extends HTMLElement {
  constructor() {
    super();

    this.disabledTaskDueDate = true;
    this._taskId;
    this._taskDueDate;

    const titleProperty = this.getAttribute("title");

    const modalTemplate = `
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
                    <input name="task-due-date-switch" class="form-check-input" type="checkbox" role="switch">
                    <label class="form-check-label" for="enableDueDate">Habilitar prazo</label>
                  </div>
                  <div class="mb-3 w-75">
                    <label for="taskDueDate" class="col-form-label">Prazo:</label>
                    <date-input name="task-due-date" disabled></date-input>
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

    this.innerHTML = modalTemplate;
    this.taskNameField = this.querySelector("input[name=task-name]");
    this.descriptionField = this.querySelector(
      "textarea[name=task-description]"
    );

    this.closeButton = this.querySelector(".btn-close");
    this.closeButton.addEventListener("click", (event) => {
      event.preventDefault();
      this.resetFullForm();
      this.dispatchEvent(new CustomEvent("onCloseModal"));
    });

    this.taskDueDateInput = this.querySelector("date-input");
    this.taskDueDateInput.addEventListener(
      "dateInputChanged",
      this.handleOnDateInputChanged.bind(this)
    );

    this.taskDueDateSwitch = this.querySelector(
      "input[name=task-due-date-switch]"
    );
    this.taskDueDateSwitch.addEventListener(
      "click",
      this.handleOnClickTaskDueDateSwitch.bind(this)
    );
  }

  handleOnDateInputChanged(event) {
    const date = event.detail.value;
    this._taskDueDate = `${date}:00.000Z`;
  }

  resetFullForm() {
    this.descriptionField.textContent = "";
    this.form.reset();
    this.taskDueDateInput.setAttribute("value", "");
    this.taskDueDateInput.setAttribute("disabled", "disabled");
    this.taskDueDateSwitch.checked = false;

    this._taskId = null;
    this._taskDueDate = "";
    this.disabledTaskDueDate = true;
  }

  handleOnClickTaskDueDateSwitch() {
    if (this._taskDueDate && !this.disabledTaskDueDate) {
      this.taskDueDateInput.setAttribute("value", "");
      this._taskDueDate = "";
    }

    this.disabledTaskDueDate = !this.disabledTaskDueDate;

    if (this.disabledTaskDueDate) {
      this.taskDueDateInput.setAttribute("disabled", "disabled");
    } else {
      this.taskDueDateInput.removeAttribute("disabled");
    }
  }

  validateForm(formData) {
    if (!this.disabledTaskDueDate && this._taskDueDate?.trim() == "") {
      this.taskDueDateInput.setAttribute("valid", "false");
      return false;
    } else if (formData.get("task-name").trim() === "") {
      const nameInput = this.taskNameField;
      nameInput.classList.add("is-invalid");
      return false;
    } else if (formData.get("task-description").trim() === "") {
      const descriptionInput = this.descriptionField;
      descriptionInput.classList.add("is-invalid");
      return false;
    }

    this.taskNameField.classList.remove("is-invalid");
    this.descriptionField.classList.remove("is-invalid");

    return true;
  }

  handleOnClickSaveButton(event) {
    event.preventDefault();

    const formData = new FormData(this.form);

    if (!this.validateForm(formData)) {
      return;
    }

    const task = {
      title: formData.get("task-name"),
      description: formData.get("task-description"),
      created_date: new Date().toISOString(),
      status: parseInt(formData.get("task-status")) || 0,
      deadline_date: this._taskDueDate?.trim() || "",
      last_status_update_date: new Date().toISOString(),
    };

    this.dispatchEvent(
      new CustomEvent("onTaskFormSubmitted", { detail: task })
    );
  }

  handleOnClickSelectedTaskStatus(event) {
    const selectedTaskStatusEvent = new CustomEvent("onSelectedTaskStatus", {
      detail: {
        status: event.target.value,
      },
    });
    this.dispatchEvent(selectedTaskStatusEvent);
  }

  connectedCallback() {
    this.form = this.querySelector(".add-task");

    this.excludeButton = this.querySelector(".exclude-button");
    this.excludeButton.addEventListener("click", (event) => {
      event.preventDefault();
      this.resetFullForm();
      this.dispatchEvent(new CustomEvent("onTaskDeleted"));
    });

    this.saveButton = this.querySelector(".save-button");
    this.saveButton.addEventListener(
      "click",
      this.handleOnClickSaveButton.bind(this)
    );

    this.selectTaskStatus = this.querySelector("select[name=task-status]");
    this.selectTaskStatus.addEventListener(
      "change",
      this.handleOnClickSelectedTaskStatus.bind(this)
    );
  }

  disconnectedCallback() {
    this.saveButton.removeEventListener(
      "click",
      this.handleOnClickSaveButton.bind(this)
    );
    this.taskDueDateSwitch.removeEventListener(
      "click",
      this.handleOnClickTaskDueDateSwitch.bind(this)
    );
    this.selectTaskStatus.removeEventListener(
      "change",
      this.handleOnClickSelectedTaskStatus.bind(this)
    );
    this.taskDueDateInput.removeEventListener(
      "dateInputChanged",
      this.handleOnDateInputChanged.bind(this)
    );
  }

  isEmptyDeadlineDate(dueDate) {
    return dueDate === "";
  }

  getFormattedTaskDueDate(dueDate) {
    if (!dueDate) {
      return "";
    }
    let endDatePart = dueDate.match(/T(\d{2}:\d{2})/);
    let startDatePart = dueDate.match(/(\d{4}-\d{2}-\d{2})/);
    return `${startDatePart[0].trim()}T${endDatePart[1].trim()}`;
  }

  setTaskDueDate(dueDate) {
    const isEmptyDeadlineDate = this.isEmptyDeadlineDate(dueDate);
    let formattedDueDate = this.getFormattedTaskDueDate(dueDate);
    console.log("formattedDueDate", formattedDueDate);

    this.taskDueDateInput.setAttribute(
      "disabled",
      !isEmptyDeadlineDate ? "" : "disabled"
    );
    this.taskDueDateInput.setAttribute("value", formattedDueDate || "");
    this._taskDueDate = dueDate;
    this.disabledTaskDueDate = isEmptyDeadlineDate;
    this.taskDueDateSwitch.checked = !isEmptyDeadlineDate;
  }

  openModal(taskId, taskName, taskDescription, dueDate) {
    this._taskId = taskId;
    this.taskNameField.value = taskName;
    this.descriptionField.textContent = taskDescription;
    this.setTaskDueDate(dueDate);
    new bootstrap.Modal(this.querySelector("#addTask")).show();
  }
}

customElements.define("app-modal-component", Modal);
