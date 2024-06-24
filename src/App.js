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

const renderTasks = async () => {
  let toDoList = [];
  const tasks = await getTasks();
  toDoList = [...toDoList, ...tasks];

  const todoListContainer = document.querySelector(".task-container-to-do");

  toDoList.forEach((task) => {
    const taskElementWrapper = document.createElement("div");
    taskElementWrapper.className = "mb-3 text-start";

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

      const formAppModalComponent = document.querySelector(
        "app-modal-component"
      );
      formAppModalComponent.openModal(taskName, taskDescription);

      // var modalElement = document.getElementById("addTask");

      // const bootstrapModal = new bootstrap.Modal(modalElement);
      // bootstrapModal.show();
    });

    taskElementWrapper.appendChild(taskElement);
    todoListContainer.appendChild(taskElementWrapper);
  });
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
