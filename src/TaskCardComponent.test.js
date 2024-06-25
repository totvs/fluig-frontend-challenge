/**
 * @jest-environment jsdom
 */

import "./TaskCardComponent.js";

describe("TaskCardComponent", () => {
  let taskCardComponent;

  beforeEach(() => {
    const appTaskCard = document.createElement("app-task-card");
    appTaskCard.setAttribute("title", "Title test");
    appTaskCard.setAttribute("description", "Description test");
    appTaskCard.setAttribute("collumn-parking-days", "10");
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

  test("should render a description text", () => {
    const descriptionContainer =
      taskCardComponent.shadowRoot.querySelector(".card-text");
    expect(descriptionContainer.textContent).toBe("Description test");
  });

  test("should render a collumnParkingDays text", () => {
    const collumnParkingDaysContainer =
      taskCardComponent.shadowRoot.querySelectorAll(".card-text")[1];
    expect(collumnParkingDaysContainer.textContent).toBe(
      "10 dias nessa coluna"
    );
  });
});
