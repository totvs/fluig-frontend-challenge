import TasksGateway from "./tasks-gateway.js";

describe("TasksGateway", () => {
  it("should be defined", () => {
    const tasksGateway = new TasksGateway();
    expect(tasksGateway).toBeDefined();
  });

  it("should be implemented", () => {
    const tasksGateway = new TasksGateway();
    expect(tasksGateway.getTasksByTitle).toBeDefined();
    expect(tasksGateway.getAllTasks).toBeDefined();
    expect(tasksGateway.addTask).toBeDefined();
    expect(tasksGateway.updateTask).toBeDefined();
    expect(tasksGateway.onTaskDeleted).toBeDefined();
    expect(tasksGateway.getTaskById).toBeDefined();
  });

  it("should throw an error", () => {
    const tasksGateway = new TasksGateway();
    expect(tasksGateway.getTasksByTitle).toThrow(
      new Error("Method 'getTasksByTitle' must be implemented.")
    );
    expect(tasksGateway.getAllTasks).toThrow(
      new Error("Method 'getAllTasks' must be implemented.")
    );
    expect(tasksGateway.addTask).toThrow(
      new Error("Method 'addTask' must be implemented.")
    );
    expect(tasksGateway.updateTask).toThrow(
      new Error("Method 'updateTask' must be implemented.")
    );
    expect(tasksGateway.onTaskDeleted).toThrow(
      new Error("Method 'onTaskDeleted' must be implemented.")
    );
    expect(tasksGateway.getTaskById).toThrow(
      new Error("Method 'getTaskById' must be implemented.")
    );
  });
});
