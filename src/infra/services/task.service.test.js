import { describe, expect, it, vi } from 'vitest';
import { TaskService } from './task';
import TaskEntity from '../../domain/entities/task';

// Mock the HttpClient for testing
const mockHttpClient = {
  get: vi.fn(),
  post: vi.fn(),
  put: vi.fn(),
  delete: vi.fn(),
};

describe('TaskService', () => {
  it('Should TaskService.getTasks fetches tasks and maps to TaskEntity', async () => {
    const mockTasksData = [
      { id: 1, title: 'Task 1', description: 'This is task 1' },
      { id: 2, title: 'Task 2', description: 'This is task 2' },
    ];

    mockHttpClient.get.mockResolvedValueOnce(mockTasksData);
    const taskService = new TaskService(mockHttpClient);

    const tasks = await taskService.getTasks();

    expect(mockHttpClient.get).toHaveBeenCalledWith('http://localhost:4000/tasks');
    expect(tasks.length).toBe(2);
    // expect(tasks[0]).toBeInstanceOf(TaskEntity);
    expect(tasks[0]).toEqual(
      new TaskEntity({
        id: 1,
        title: 'Task 1',
        description: 'This is task 1',
      })
    );
  });

  it('Should TaskService.getTasks filters by title', async () => {
    const mockTasksData = [
      { id: 1, title: 'Filtered Task', description: 'This is a filtered task' },
    ];

    mockHttpClient.get.mockResolvedValueOnce(mockTasksData);
    const taskService = new TaskService(mockHttpClient);

    const filteredTasks = await taskService.getTasks({ title: 'Filtered Task' });

    expect(mockHttpClient.get).toHaveBeenCalledWith('http://localhost:4000/tasks?title=Filtered+Task');
    expect(filteredTasks.length).toBe(1);
    expect(filteredTasks[0].title).toBe('Filtered Task');
  });

  it('Should TaskService.createTask creates a task and maps to TaskEntity', async () => {
    const newTask = { title: 'New Task', description: 'This is a new task' };
    const mockResponseData = { id: 3, ...newTask };

    mockHttpClient.post.mockResolvedValueOnce(mockResponseData);
    const taskService = new TaskService(mockHttpClient);

    const createdTask = await taskService.createTask(newTask);

    expect(mockHttpClient.post).toHaveBeenCalledWith('http://localhost:4000/tasks', newTask);
    // expect(createdTask).toBeInstanceOf(TaskEntity);
    expect(createdTask).toEqual(new TaskEntity(mockResponseData));
  });

  it('Should TaskService.updateTask updates a task and maps to TaskEntity', async () => {
    const taskId = 1;
    const updatedTask = { title: 'Updated Task', description: 'This is the updated task' };
    const mockResponseData = { id: taskId, ...updatedTask };

    mockHttpClient.put.mockResolvedValueOnce(mockResponseData);
    const taskService = new TaskService(mockHttpClient);

    const updatedTaskEntity = await taskService.updateTask(updatedTask, taskId);

    expect(mockHttpClient.put).toHaveBeenCalledWith(`http://localhost:4000/tasks/${taskId}`, updatedTask);
    // expect(updatedTaskEntity).toBeInstanceOf(TaskEntity);
    expect(updatedTaskEntity).toEqual(new TaskEntity(mockResponseData));
  });

  it('Should TaskService.deleteTask deletes a task', async () => {
    const taskId = 2;

    mockHttpClient.delete.mockResolvedValueOnce();
    const taskService = new TaskService(mockHttpClient);

    await taskService.deleteTask(taskId);

    expect(mockHttpClient.delete).toHaveBeenCalledWith(`http://localhost:4000/tasks/${taskId}`);
  });
})

