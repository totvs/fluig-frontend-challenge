class Modal extends HTMLElement {
  constructor() {
    super();

    this.disabledTaskDueDate = false;
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
                    <option value="1">A fazer</option>
                    <option value="2">Fazendo</option>
                    <option value="3">Concluído</option>
                  </select>
                </div>
                <div class="mb-3">
                  <div class="form-check form-switch form-switch-lg enable-due-date">
                    <input class="form-check-input" type="checkbox" role="switch">
                    <label class="form-check-label" for="enableDueDate">Habilitar prazo</label>
                  </div>
                  <div class="mb-3 w-75">
                    <label for="taskDueDate" class="col-form-label">Prazo:</label>
                    <input name="task-due-date" class="form-control task-due-date-input" type="text" role="taskDueDate" placeholder="dd/mm/aaaa" autocomplete="off">
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
              <button type="button" class="btn btn-secondary">Excluir</button>
              <button type="button" class="btn btn-primary save-button">Salvar</button>
            </div>
          </div>
        </div>
      </div>`;

    this.innerHTML = template;

    taskDueDateInput = this.querySelector(".task-due-date-input");
    taskDueDateInput.setAttribute("disabled", "disabled");

    const enableDueDate = this.querySelector(".enable-due-date");
    enableDueDate.addEventListener("click", () => {
      this.disabledTaskDueDate = !this.disabledTaskDueDate;

      if (this.disabledTaskDueDate) {
        taskDueDateInput.removeAttribute("disabled");
        return;
      }
      taskDueDateInput.setAttribute("disabled", "disabled");
    });
  }

  validateForm(formData) {
    let fieldValidate = false;

    if (
      this.disabledTaskDueDate &&
      formData.get("task-due-date").trim() === ""
    ) {
      const statusInput = this.querySelector("input[name=task-due-date]");
      statusInput.classList.add("is-invalid");
      fieldValidate = false;
    } else if (!this.disabledTaskDueDate) {
      const statusInput = this.querySelector("input[name=task-due-date]");
      statusInput.classList.remove("is-invalid");
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

  connectedCallback() {
    const form = this.querySelector(".add-task");
    const saveButton = this.querySelector(".save-button");
    saveButton.addEventListener("click", (event) => {
      event.preventDefault();

      const formData = new FormData(form);

      if (!this.validateForm(formData)) {
        return;
      }

      console.log("AQUI");

      const task = {
        title: formData.get("task-name"),
        description: formData.get("task-description"),
        created_date: formData.get("task-due-date"),
        collumnParkingDays: formData.get("task-collumn-parking-days"),
        status: formData.get("task-status"),
      };

      this.dispatchEvent(new CustomEvent("formSubmitted", { detail: task }));

      form.reset();
    });
  }

  disconnectedCallback() {
    this.querySelector(".save-button").removeEventListener("click");
    this.querySelector(".enable-due-date").removeEventListener("click");
  }
}

customElements.define("app-modal-component", Modal);
