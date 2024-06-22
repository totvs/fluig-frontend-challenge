/**
 * @jest-environment jsdom
 */

import "./Modal.js";

describe("Modal", () => {
  let modal;

  beforeEach(() => {
    document.body.innerHTML =
      "<app-modal-component title='Nova tarefa'></app-modal-component>";
    modal = document.querySelector("app-modal-component");
  });

  afterEach(() => {
    document.body.innerHTML = "";
  });

  test("should render a modal title", () => {
    const title = modal.querySelector(".modal-title");
    expect(title.textContent).toBe("Nova tarefa");
  });
});
