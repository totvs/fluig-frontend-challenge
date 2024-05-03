import { diffInDays } from '../shared/diff-in-days'

export class TaskElement extends HTMLElement {
  constructor() {
    super()

    this.task_id = this.getAttribute('task_id')
    this.title = this.getAttribute('title')
    this.status = this.getAttribute('status')
    this.description = this.getAttribute('description')
    this.deadline_date = this.validateDateFieldValue(this.getAttribute('deadline_date'))
    this.last_status_update_date = this.validateDateFieldValue(this.getAttribute('last_status_update_date'))

    this.render()
  }
  static observedAttributes() {
    return [
      'task_id',
      'title',
      'description',
      'status',
      'last_status_update_date',
      'deadline_date'
    ]
  }
  attributesChangedCallback(propertyName, oldValue, newValue) {
    this[propertyName] = newValue
    this.render()
  }

  connectedCallback() {
    this.addEventListener('click', this.handleClick.bind(this))
  }

  validateDateFieldValue(dateValue) {
    if (dateValue === 'null') {
      return null
    }
    if (!dateValue) {
      return null
    }
    if (dateValue === 'NaN') {
      return null
    }
    return new Date(dateValue)
  }

  handleClick() {
    const taskData = {
      id: this.task_id,
      title: this.title,
      description: this.description,
      deadline: this.deadline_date,
      lastStatusUpdateDate: this.last_status_update_date,
      status: this.status
    };

    document.dispatchEvent(new CustomEvent('openModalWithTaskData', { detail: taskData }));
  }

  generateDayCountByStatusText(last_status_update_date) {
    if (!last_status_update_date) return ''

    const lastStatusUpdate = new Date(last_status_update_date)
    const now = new Date()
    const dayDiff = Math.abs(diffInDays(lastStatusUpdate, now));
    return `${dayDiff} dias nesta coluna`
  }
  generateDeadlineCountText(deadline_date) {
    if(!deadline_date) return ''
    const deadline = new Date(deadline_date)
    const now = new Date()
    const dayDiff = diffInDays(deadline, now);
    if (dayDiff < 0) {
      return `<span class="text-danger">Expirou a ${Math.abs(dayDiff)} dias</span>`
    }
    return `<span class="text-success">${dayDiff} dias restantes</span>`
  }

  render() {
    const style = document.createElement('style')
    style.textContent = `
      .font-sm {
        font-size: 12px;
      }
    `
    const dayCount = this.generateDayCountByStatusText(
      this.last_status_update_date
    )
    const deadline = this.generateDeadlineCountText(
      this.deadline_date
    )

    const template = `
      <div class="card task border rounded-4 cursor-pointer">
        <div class="card-body p-4">
          <h5 class="card-title fs-6 fw-semibold">${this.title}</h5>
          <p class="card-text fs-6 fw-normal text-secondary">
            ${this.description}
          </p>
          <div class="d-flex justify-content-between align-items-center mt-2">
            <div class="font-sm fw-normal text-body-tertiary" data-testid="task-status-date">${dayCount}</div>
            <div class="font-sm fw-normal text-end" data-testid="task-deadline-date">${deadline}</div>
          </div>
        </div>
      </div>
    `

    const temp = document.createElement('div');
    temp.innerHTML = template
    this.innerHTML = ''
    this.appendChild(temp)
    this.appendChild(style)
  }
}

customElements.define('task-element', TaskElement)
