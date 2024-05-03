import { describe, expect, it, vi } from 'vitest';
import { TaskSearchFilter } from './task-search-filter';

describe('TaskSearchFilter', () => {
  it('TaskSearchFilter dispatches fetchTasks event on button click', () => {
    const filter = new TaskSearchFilter()

    const searchInput = filter.querySelector('input');
    const button = filter.querySelector('button');

    const mockEventHandler = vi.fn();
    document.addEventListener('fetchTasks', mockEventHandler);
    filter.connectedCallback();

    searchInput.value = 'test search';
    button.click();

    expect(mockEventHandler).toHaveBeenCalledTimes(1);
    expect(mockEventHandler).toHaveBeenCalledWith(expect.objectContaining({ detail: 'test search' }));

    filter.remove()
    document.removeEventListener('fetchTasks', mockEventHandler);
  });
})
