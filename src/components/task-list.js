export class TaskList extends HTMLElement {
  constructor() {
    super();
    // Initialize columns as an empty array
    this.columns = [];
  }

  connectedCallback() {
    // Get the columns names from the attribute
    const columnsAttribute = this.getAttribute('columns');
    // Parse the columns attribute as JSON
    this.columns = JSON.parse(columnsAttribute);

    // Create the task list HTML structure
    this.render();
  }

  render() {
    const template = document.createElement('template');

    template.innerHTML = `
      <div class="task-list">
        <div class="row px-4 gap-lg-5">
          ${this.columns.map(column => `
            <div class="col task-list-column d-flex flex-column gap-3">
              <div class="text-secondary">
                ${column}
                <span data-name="${column}-count">(0)<span>
              </div>
              <button
                class="btn btn-light w-100"
                data-name="${column}-new-task"
              >
                Nova tarefa
              </button>
              <ul class="list-unstyled d-flex flex-column gap-3" data-name="${column}"></ul>
            </div>
          `).join('')}
        </div>
      </div>
    `;
    // Append the HTML structure to the component
    this.appendChild(template.content.cloneNode(true));

    // Add event listeners to the buttons
    const buttons = this.querySelectorAll('[data-name$="-new-task"]');
    buttons.forEach((button, index) => {
      button.addEventListener('click', () => {
        const taskData = {
          status: index,
        };

        document.dispatchEvent(new CustomEvent('openModalWithTaskData', { detail: taskData }));
      })
    })
  }
}

customElements.define('task-list', TaskList);
