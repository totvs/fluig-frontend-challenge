import TaskApi from "./core/infra/task-api.js";
import { calculateDiffDaysFromDate } from "./utils/calculate-diff-days-from-date.js";
import { showToastMessage } from "./core/infra/toast-alert.js";
import {
  EventNotifierObservable,
  EventListenerObserver,
} from "./core/notification/event-notifier-observable.js";

const eventNotifierObservable = new EventNotifierObservable();
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

const setTotalTaskByColumn = (selector, totalText) => {
  const element = document.querySelector(selector);
  element.textContent = `(${totalText})`;
};

const openModalByTask = (task) => {
  const formAppModalComponent = document.querySelector("app-modal-component");
  formAppModalComponent.openModal(
    task.id,
    task.title,
    task.description,
    task.deadline_date
  );
};

const buildTaskCard = (task) => {
  const taskCard = document.createElement("app-task-card");
  taskCard.setAttribute("title", task.title);
  taskCard.setAttribute("description", task.description);
  taskCard.setAttribute("deadline", task.deadline_date);
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

    const task = {
      id: taskId,
      title: taskName,
      description: taskDescription,
      deadline_date: taskDeadline,
    };

    openModalByTask(task);
  });

  const taskCardWrapper = document.createElement("div");
  taskCardWrapper.className = "mb-3 text-start";
  taskCardWrapper.appendChild(taskCard);
  return taskCardWrapper;
};

const buildSearchResultItem = (task) => {
  const dropdownItem = document.createElement("li");
  const dropdownItemButton = document.createElement("button");
  dropdownItemButton.type = "button";
  dropdownItemButton.textContent = task.title;
  dropdownItemButton.addEventListener("click", async (event) => {
    eventNotifierObservable.notify({
      event: "onClickTaskCard",
      detail: {
        id: task.id,
        title: task.title,
        description: task.description,
        deadline: task.deadline_date,
      },
      action: "click",
    });
  });
  dropdownItem.appendChild(dropdownItemButton);
  return dropdownItem;
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

const handleHideSearchResultDropdown = (data) => {
  if (data.action === "click") {
    const { detail: task } = data;
    taskId = task.id;

    const searchResultDropdown = document.querySelector(
      ".search-result-dropdown"
    );
    searchResultDropdown.classList.add("hide");

    openModalByTask(task);
  }
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

      if (tasks.length !== 0) {
        searchResultDropdownList.textContent = "";
        searchResultDropdown.classList.toggle("hide");
      }

      tasks.forEach((task) => {
        const itemList = buildSearchResultItem(task);
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

  formAppModalComponent.addEventListener("onCloseModal", () => {
    taskId = null;
  });

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

      if (taskId) {
        try {
          preparedTask = {
            ...task,
            id: taskId,
          };
          console.log("preparedTask", preparedTask);
          await taskApi.updateTask(preparedTask);
          showToastMessage("Tarefa atualizada com sucesso!", "success");
        } catch (error) {
          showToastMessage(
            "Erro ao atualizar a tarefa, tente novamente mais tarde.",
            "danger"
          );
        }
      } else {
        try {
          preparedTask = {
            ...task,
            id: crypto.randomUUID(),
          };
          await taskApi.addTask(preparedTask);
          showToastMessage("Tarefa criada com sucesso!", "success");
        } catch (error) {
          showToastMessage(
            "Erro ao salvar a tarefa, tente novamente mais tarde.",
            "danger"
          );
        }
      }
      if (resetTaskContainers()) await populateAllTasks();
    }
  );
};

const setupObservables = () => {
  const clickSearchResultItemNotifier = new EventListenerObserver(
    "HideSearchResultDropdown",
    handleHideSearchResultDropdown
  );
  eventNotifierObservable.subscribe(clickSearchResultItemNotifier);
};

export const bootstrapApp = async () => {
  await populateAllTasks();
  setupObservables();
  setupSearchResultDropdown();
  setupModal();
};

window.onload = async () => {
  await bootstrapApp();
};
