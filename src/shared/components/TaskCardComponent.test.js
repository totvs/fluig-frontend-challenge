/**
 * @jest-environment jsdom
 */

import "./TaskCardComponent.js";

describe("TaskCardComponent", () => {
  let taskCardComponent;
  let appTaskCard;

  beforeEach(() => {
    appTaskCard = document.createElement("app-task-card");
    appTaskCard.setAttribute("title", "Title test");
    appTaskCard.setAttribute("description", "Description test");
    appTaskCard.setAttribute("deadline", "2024-06-25T17:00:28.175Z");
    appTaskCard.setAttribute("parking-days-at-column", 10);
    document.body.appendChild(appTaskCard);

    taskCardComponent = document.body.querySelector("app-task-card");
  });

  afterEach(() => {
    document.body.innerHTML = "";
  });

  test("should render a title text", () => {
    const titleContainer =
      taskCardComponent.shadowRoot.querySelector(".card-title");
    expect(titleContainer.textContent).toBe("Title test");
  });

  test("should render a new title text", () => {
    appTaskCard.setAttribute("title", "new Title test");
    const titleContainer =
      taskCardComponent.shadowRoot.querySelector(".card-title");
    expect(titleContainer.textContent).toBe("new Title test");
  });

  test("should render a description text", () => {
    const descriptionContainer =
      taskCardComponent.shadowRoot.querySelector(".card-text");
    expect(descriptionContainer.textContent).toBe("Description test");
  });

  test("should render a new description text", () => {
    appTaskCard.setAttribute("description", "new Description test");
    const descriptionContainer =
      taskCardComponent.shadowRoot.querySelector(".card-text");
    expect(descriptionContainer.textContent).toBe("new Description test");
  });

  test("should render a parking-days-at-column text", () => {
    const parkingDaysAtCollumn =
      taskCardComponent.shadowRoot.querySelectorAll("small")[0];
    expect(parkingDaysAtCollumn.textContent).toBe("10 dias nessa coluna");
  });

  test("should render a deadline text", () => {
    const deadlineContainer =
      taskCardComponent.shadowRoot.querySelectorAll("small")[1];
    expect(deadlineContainer.textContent).toBe("Expira hoje");
  });
});
