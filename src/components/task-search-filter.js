export class TaskSearchFilter extends HTMLElement {
  constructor() {
    super();

    this.render();
  }

  connectedCallback() {
    const searchInput = this.querySelector('input');
    const button = this.querySelector('button');

    button.addEventListener('click', () => {
      document.dispatchEvent(
        new CustomEvent('fetchTasks', { detail: searchInput.value })
      )
    })
  }

  render() {
    const template = document.createElement('template');

    template.innerHTML = `
      <div class="search-field">
        <div class="input-group mb-3">
          <input type="search" class="form-control" placeholder="Pesquisar..." aria-label="Pesquisar..." aria-describedby="button-addon2">
          <button type="button" class="btn btn-primary fw-semibold">Buscar</button>
        </div>
      </div>
    `

    this.appendChild(template.content);
  }
}

customElements.define('task-search-filter', TaskSearchFilter)
