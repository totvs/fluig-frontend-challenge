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

const renderTasks = async () => {
  const tasks = await getTasks();
  const tasksContainer = document.querySelector(".task-container-make");
  tasks.forEach((task) => {
    const taskElementWrapper = document.createElement("div");
    taskElementWrapper.className = "mb-3 text-start";

    const taskElement = document.createElement("app-task-card");
    taskElement.setAttribute("title", task.title);
    taskElement.setAttribute("description", task.description);
    taskElement.setAttribute("collumn-parking-days", task.collumnParkingDays);
    taskElement.setAttribute("status", task.status);
    taskElement.setAttribute("id", task.id);

    taskElementWrapper.appendChild(taskElement);
    tasksContainer.appendChild(taskElementWrapper);
  });
};

export const bootstrapApp = async () => {
  await renderTasks();

  const formAppModalComponent = document.querySelector("app-modal-component");
  formAppModalComponent.addEventListener("formSubmitted", async (event) => {
    const task = event.detail;
    await addTask(task);
    await renderTasks();
  });
};

window.onload = async () => {
  await bootstrapApp();
};
