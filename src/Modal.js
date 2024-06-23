class Modal extends HTMLElement {
  constructor() {
    super();

    this.isVisible = true;
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
                  <select name="task-status" class="form-select" aria-label="Default select example">
                    <option value="1">A fazer</option>
                    <option value="2">Fazendo</option>
                    <option value="3">Concluído</option>
                  </select>
                </div>
                <div>
                  <div class="form-check form-switch form-switch-lg">
                    <input class="form-check-input" type="checkbox" role="switch" id="enableDueDate">
                    <label class="form-check-label" for="enableDueDate">Habilitar prazo</label>
                  </div>
                </div>
                <div class="mb-3">
                  <label for="task-name" class="col-form-label">Task name:</label>
                  <input name="task-name" type="text" class="form-control">
                </div>
                <div class="mb-3">
                  <label for="description-text" class="col-form-label">Description:</label>
                  <textarea name="task-description" class="form-control"></textarea>
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
  }

  connectedCallback() {
    const form = this.querySelector(".add-task");
    const saveButton = this.querySelector(".save-button");
    saveButton.addEventListener("click", (event) => {
      event.preventDefault();

      const formData = new FormData(form);
      const task = {
        title: formData.get("task-name"),
        description: formData.get("task-description"),
        collumnParkingDays: formData.get("task-collumn-parking-days"),
        status: formData.get("task-status"),
      };

      this.dispatchEvent(new CustomEvent("formSubmitted", { detail: task }));

      form.reset();
    });
  }
}

customElements.define("app-modal-component", Modal);
