/**
 * @jest-environment jsdom
 */

import "./TaskCardComponent.js";

describe("TaskCardComponent", () => {
  let taskCardComponent;

  beforeEach(() => {
    document.body.innerHTML = `<app-task-card
        title='Title test' 
        description='Description test' 
        collumnParkingDays='10'>
      </app-task-card>`;
    taskCardComponent = document.querySelector("app-task-card");
  });

  afterEach(() => {
    document.body.innerHTML = "";
  });

  test("should render a title text", () => {
    const titleContainer = taskCardComponent.querySelector(".card-title");
    expect(titleContainer.textContent).toBe("Title test");
  });

  test("should render a description text", () => {
    const descriptionContainer = taskCardComponent.querySelector(".card-text");
    expect(descriptionContainer.textContent).toBe("Description test");
  });

  test("should render a collumnParkingDays text", () => {
    const collumnParkingDaysContainer =
      taskCardComponent.getElementsByTagName("small")[0];
    expect(collumnParkingDaysContainer.textContent).toBe(
      "10 dias nessa coluna"
    );
  });
});
