// Import all of Bootstrap's JS
import * as bootstrap from "bootstrap";

let taskId;

export const getTasks = async () => {
  const response = await fetch(
    "http://localhost:3000/tasks?_sort=title&_order=asc"
  );
  const tasks = await response.json();
  return tasks;
};

export const addTask = async (task) => {
  const response = await fetch("http://localhost:3000/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
  const createdTask = await response.json();
  return createdTask;
};

export const updateTask = async (task) => {
  const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
  const updatedTask = await response.json();
  return updatedTask;
};

export const deleteTask = async (id) => {
  const response = await fetch(`http://localhost:3000/tasks/${id}`, {
    method: "DELETE",
  });
  const deletedTask = await response.json();
  return deletedTask;
};

export const getTask = async (id) => {
  const response = await fetch(`http://localhost:3000/tasks/${id}`);
  const task = await response.json();
  return task;
};

const resetTaskContainerMaker = () => {
  const tasksContainer = document.querySelector(".task-container-to-do");
  tasksContainer.textContent = "";
  return true;
};

const moveTask = async (id) => {
  const task = await getTask(id);
  const updatedTask = {
    ...task,
    status: id,
  };
  await updateTask(updatedTask);
};

const createTaskCard = (task) => {
  const taskElement = document.createElement("app-task-card");
  taskElement.setAttribute("title", task.title);
  taskElement.setAttribute("description", task.description);
  taskElement.setAttribute("collumn-parking-days", task.collumnParkingDays);
  taskElement.setAttribute("status", task.status);
  taskElement.setAttribute("id", task.id);
  taskElement.addEventListener("clickOnTaskCard", async (event) => {
    taskId = event.detail.id;
    const taskName = event.detail.title;
    const taskDescription = event.detail.description;

    const formAppModalComponent = document.querySelector("app-modal-component");
    formAppModalComponent.openModal(taskName, taskDescription);
  });

  const taskElementWrapper = document.createElement("div");
  taskElementWrapper.className = "mb-3 text-start";
  taskElementWrapper.appendChild(taskElement);
  return taskElementWrapper;
};

const renderTasks = async () => {
  let toDoList = [];
  let doingList = [];
  let doneList = [];

  const tasks = await getTasks();
  tasks.forEach((task) => {
    const card = createTaskCard(task);
    if (task.status === 0) {
      toDoList.push(card);
    } else if (task.status === 1) {
      doingList.push(card);
    } else if (task.status === 2) {
      doneList.push(card);
    }
  });

  const todoListContainer = document.querySelector(".task-container-to-do");
  const doingListContainer = document.querySelector(".task-container-doing");
  const doneListContainer = document.querySelector(".task-container-done");
  toDoList.forEach((card) => {
    todoListContainer.appendChild(card);
  });
  doingList.forEach((card) => {
    doingListContainer.appendChild(card);
  });
  doneList.forEach((card) => {
    doneListContainer.appendChild(card);
  });

  const totalTodoTasksTextContainer = document.querySelector(
    ".total-todo-tasks-text"
  );
  totalTodoTasksTextContainer.textContent = `(${toDoList.length})`;

  const totalDoingTasksTextContainer = document.querySelector(
    ".total-doing-tasks-text"
  );
  totalDoingTasksTextContainer.textContent = `(${doingList.length})`;

  const totalCompletedTasksTextContainer = document.querySelector(
    ".total-completed-tasks-text"
  );
  totalCompletedTasksTextContainer.textContent = `(${doneList.length})`;
};

export const bootstrapApp = async () => {
  await renderTasks();

  const formAppModalComponent = document.querySelector("app-modal-component");
  formAppModalComponent.addEventListener("excludeTask", async (event) => {
    await deleteTask(taskId);
    if (resetTaskContainerMaker()) await renderTasks();
  });

  formAppModalComponent.addEventListener(
    "selectedTaskStatusEvent",
    async (event) => {
      const status = event.detail.status;
    }
  );

  formAppModalComponent.addEventListener("formSubmitted", async (event) => {
    const task = event.detail;
    await addTask(task);
    if (resetTaskContainerMaker()) await renderTasks();
  });
};

window.onload = async () => {
  await bootstrapApp();
};
