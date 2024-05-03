import { describe, expect, it } from "vitest";
import { TaskElement } from "./task-element";

describe('TaskElement', () => {
  it('Should renders the component with basic data', () => {
    const element = new TaskElement();
    element.task_id = '123';
    element.title = 'Sample Task';
    element.description = 'This is a sample task description';
    element.status = '0';
    element.last_status_update_date = '2024-05-03T13:00:53.660Z';
    element.deadline_date = '2024-04-26T00:00:00.000Z';

    element.setAttribute('task_id', element.task_id);
    element.setAttribute('title', element.title);
    element.setAttribute('description', element.description);
    element.setAttribute('status', element.status);
    element.setAttribute('last_status_update_date', element.last_status_update_date);
    element.setAttribute('deadline_date', element.deadline_date);

    element.render()

    expect(element.querySelector('.card-title').textContent)
      .toBe('Sample Task');
    expect(element.querySelector('.card-text').textContent.trim())
      .toBe('This is a sample task description');

    expect(element.querySelector('[data-testid="task-status-date"]').textContent)
      .toBe('0 dias nesta coluna');

    expect(element.querySelector('[data-testid="task-deadline-date"]').textContent)
      .toBe('Expirou a 7 dias');

    element.remove()
  });
})
