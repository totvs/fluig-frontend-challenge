import TaskApi from "./core/infra/TaskApi.js";
import { calculateDiffDaysFromDate } from "./utils/calculate-diff-days-from-date.js";
import * as bootstrap from "bootstrap";

const taskApi = new TaskApi();
let taskId;

const resetTaskContainers = () => {
  const taskContainers = [
    ".task-container-to-do",
    ".task-container-doing",
    ".task-container-done",
  ];

  taskContainers.forEach((taskContainer) => {
    const element = document.querySelector(taskContainer);
    element.textContent = "";
  });

  return true;
};

const buildTaskCard = (task) => {
  const taskCard = document.createElement("app-task-card");
  taskCard.setAttribute("title", task.title);
  taskCard.setAttribute("description", task.description);
  taskCard.setAttribute("deadline", task.deadline_date || task.created_date);
  const calculateParkingDaysAtColumn = calculateDiffDaysFromDate(
    task.created_date
  );

  taskCard.setAttribute("parking-days-at-column", calculateParkingDaysAtColumn);
  taskCard.setAttribute("status", task.status);
  taskCard.setAttribute("id", task.id);
  taskCard.addEventListener("onClickTaskCard", async (event) => {
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

const populateToDoListContainer = (toDoList) => {
  const todoListContainer = document.querySelector(".task-container-to-do");
  toDoList.forEach((card) => {
    todoListContainer.appendChild(card);
  });
};

const populateDoingListContainer = (doingList) => {
  const doingListContainer = document.querySelector(".task-container-doing");
  doingList.forEach((card) => {
    doingListContainer.appendChild(card);
  });
};

const populateDoneListContainer = (doneList) => {
  const doneListContainer = document.querySelector(".task-container-done");
  doneList.forEach((card) => {
    doneListContainer.appendChild(card);
  });
};

const setTotalTaskByColumn = (selector, totalText) => {
  const element = document.querySelector(selector);
  element.textContent = `(${totalText})`;
};

const populateAllTasks = async () => {
  let toDoList = [];
  let doingList = [];
  let doneList = [];

  try {
    const tasks = await taskApi.getAllTasks();
    tasks.forEach((task) => {
      const card = buildTaskCard(task);
      if (task.status === 0) {
        toDoList.push(card);
      } else if (task.status === 1) {
        doingList.push(card);
      } else if (task.status === 2) {
        doneList.push(card);
      }
    });

    populateToDoListContainer(toDoList);
    populateDoingListContainer(doingList);
    populateDoneListContainer(doneList);

    setTotalTaskByColumn(".todo-tasks-total-text", toDoList.length);
    setTotalTaskByColumn(".doing-tasks-total-text", doingList.length);
    setTotalTaskByColumn(".completed-tasks-total-text", doneList.length);
  } catch (error) {
    showToastMessage(
      "Erro ao carregar as tarefas, tente novamente mais tarde.",
      "danger"
    );
  }
};

const handleOnMouseLeaveSearchResultDropdown = (event) => {
  event.target.classList.add("hide");
};

const setupSearchResultDropdown = () => {
  const searchResultDropdown = document.querySelector(
    ".search-result-dropdown"
  );
  searchResultDropdown.addEventListener(
    "mouseleave",
    handleOnMouseLeaveSearchResultDropdown
  );

  const searchButton = document.querySelector(".search-button");
  searchButton.addEventListener("click", async (event) => {
    event.preventDefault();

    const searchResultDropdownList = document.querySelector(
      ".search-result-dropdown-list"
    );

    try {
      const searchInput = document.querySelector(".search-input");
      const tasks = await taskApi.getTasksByTitle(searchInput.value);
      searchResultDropdownList.textContent = "";

      if (tasks.length !== 0) {
        searchResultDropdown.classList.toggle("hide");
      }

      tasks.forEach((task) => {
        const itemList = document.createElement("li");
        const button = document.createElement("button");
        button.type = "button";
        button.textContent = task.title;
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
    } catch (error) {
      showToastMessage(
        "Erro ao pesquisar as tarefas, tente mais tarde.",
        "danger"
      );
    }
  });
};

const setupModal = () => {
  const formAppModalComponent = document.querySelector("app-modal-component");
  formAppModalComponent.addEventListener("onTaskDeleted", async () => {
    try {
      await taskApi.onTaskDeleted(taskId);
      if (resetTaskContainers()) await populateAllTasks();
    } catch (error) {
      showToastMessage(
        "Erro ao excluir a tarefa, tente novamente mais tarde.",
        "danger"
      );
    }
  });

  formAppModalComponent.addEventListener(
    "onTaskFormSubmitted",
    async (event) => {
      const task = event.detail;
      let preparedTask;

      try {
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
        if (resetTaskContainers()) await populateAllTasks();
      } catch (error) {
        showToastMessage(
          "Erro ao salvar a tarefa, tente novamente mais tarde."
        );
      }
    }
  );
};

const showToastMessage = (message, type = "success") => {
  const toastComponent = document.querySelector(".toast-component");
  toastComponent.classList.add(`text-bg-${type}`);
  toastComponent.querySelector(".toast-body").textContent = message;
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastComponent);
  toastBootstrap.show();
};

export const bootstrapApp = async () => {
  await populateAllTasks();
  setupSearchResultDropdown();
  setupModal();
};

window.onload = async () => {
  await bootstrapApp();
};
