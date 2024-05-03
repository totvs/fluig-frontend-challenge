import { expect, test } from 'vitest';
import TaskEntity from './task';

test('TaskEntity creates an instance with correct properties', () => {
  const taskData = {
    id: 1,
    title: 'Test Task',
    description: 'This is a test task',
    status: 1,
    createdDate: '2024-05-03T00:00:00.000Z',
    deadlineDate: '2024-05-04T00:00:00.000Z',
    lastStatusUpdateDate: '2024-05-02T00:00:00.000Z',
  };

  const task = new TaskEntity(taskData);

  expect(task.id).toBe(taskData.id);
  expect(task.title).toBe(taskData.title);
  expect(task.description).toBe(taskData.description);
  expect(task.status).toBe(taskData.status);
  expect(task.createdDate).toBe(taskData.createdDate);
  expect(task.deadlineDate).toBe(taskData.deadlineDate);
  expect(task.lastStatusUpdateDate).toBe(taskData.lastStatusUpdateDate);
});
