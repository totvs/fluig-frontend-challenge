import TaskApi from "./core/infra/TaskApi.js";

const taskApi = new TaskApi();
let taskId;

const resetTaskContainerMaker = () => {
  const tasksContainer = document.querySelector(".task-container-to-do");
  const tasksContainerDoing = document.querySelector(".task-container-doing");
  const tasksContainerDone = document.querySelector(".task-container-done");
  tasksContainerDoing.textContent = "";
  tasksContainerDone.textContent = "";
  tasksContainer.textContent = "";
  return true;
};

const getParkingDaysAtColumn = (deadline) => {
  const deadlineDate = new Date(deadline);
  const today = new Date();
  const timeDifference = deadlineDate - today;
  const days = Math.floor(timeDifference / (1000 * 3600 * 24));
  return days;
};

const createTaskCard = (task) => {
  const taskCard = document.createElement("app-task-card");
  taskCard.setAttribute("title", task.title);
  taskCard.setAttribute("description", task.description);
  taskCard.setAttribute("deadline", task.deadline_date);
  taskCard.setAttribute(
    "parking-days-at-column",
    getParkingDaysAtColumn(task.deadline_date)
  );
  taskCard.setAttribute("status", task.status);
  taskCard.setAttribute("id", task.id);
  taskCard.addEventListener("clickOnTaskCard", async (event) => {
    taskId = event.detail.id;
    const taskName = event.detail.title;
    const taskDescription = event.detail.description;
    const taskDeadline = event.detail.deadline;

    const formAppModalComponent = document.querySelector("app-modal-component");
    formAppModalComponent.openModal(
      taskId,
      taskName,
      taskDescription,
      taskDeadline
    );
  });

  const taskCardWrapper = document.createElement("div");
  taskCardWrapper.className = "mb-3 text-start";
  taskCardWrapper.appendChild(taskCard);
  return taskCardWrapper;
};

const renderTasks = async () => {
  let toDoList = [];
  let doingList = [];
  let doneList = [];

  const tasks = await taskApi.getAllTasks();
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

const renderSearchResultDropdown = (tasks) => {
  const searchResultDropdown = document.querySelector(
    ".search-result-dropdown"
  );
  const searchResultDropdownList = document.createElement("ul");
  searchResultDropdown.appendChild(searchResultDropdownList);

  const searchInput = document.querySelector("input[type='search']");
  searchInput.addEventListener("click", async (event) => {
    console.log("focus");
  });

  const searchButton = document.querySelector(".search-button");
  searchButton.addEventListener("click", async (event) => {
    event.preventDefault();

    const tasks = await taskApi.getTasksByTitle(searchInput.value);
    searchResultDropdownList.textContent = "";

    if (tasks.length !== 0) {
      searchResultDropdown.classList.toggle("hide");
    }

    tasks.forEach((task) => {
      const itemList = document.createElement("li");
      const button = document.createElement("button");
      button.type = "button";
      button.textContent =
        task.title +
        " - " +
        new Date(task.deadline_date).getDate() +
        "/" +
        (new Date(task.deadline_date).getMonth() + 1);
      button.addEventListener("click", async (event) => {
        searchResultDropdown.classList.toggle("hide");
        taskId = task.id;
        const formAppModalComponent = document.querySelector(
          "app-modal-component"
        );
        formAppModalComponent.openModal(
          taskId,
          task.title,
          task.description,
          task.deadline_date
        );
      });
      itemList.appendChild(button);
      searchResultDropdownList.appendChild(itemList);
    });
  });
};

const renderModal = () => {
  const formAppModalComponent = document.querySelector("app-modal-component");
  formAppModalComponent.addEventListener("onTaskDeleted", async (event) => {
    await taskApi.onTaskDeleted(taskId);
    if (resetTaskContainerMaker()) await renderTasks();
  });

  formAppModalComponent.addEventListener("onTaskFormSubmitted", async (event) => {
    const task = event.detail;
    let preparedTask;

    if (taskId) {
      preparedTask = {
        ...task,
        id: taskId,
      };
      await taskApi.updateTask(preparedTask);
    } else {
      preparedTask = {
        ...task,
        id: crypto.randomUUID(),
      };
      await taskApi.addTask(preparedTask);
    }

    if (resetTaskContainerMaker()) await renderTasks();
  });
};

export const bootstrapApp = async () => {
  await renderTasks();
  renderSearchResultDropdown();
  renderModal();
};

window.onload = async () => {
  await bootstrapApp();
};
