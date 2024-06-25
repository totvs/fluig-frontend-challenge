/**
 * @jest-environment jsdom
 */

import "./DateInput.js";

describe("DateInput", () => {
  let dateInput;

  beforeEach(() => {
    document.body.innerHTML = `
      <date-input name="dueDate" value="2024-04-17" placeholder="17/07/2024"></date-input>
    `;
    dateInput = document.querySelector("date-input");
  });

  it("should render the date input", () => {
    expect(dateInput).toBeTruthy();
  });

  it("should render the a value to the date input", () => {
    expect(dateInput.input.value).toBe("2024-04-17");
  });

  it("should render the a name to the date input", () => {
    expect(dateInput.input.name).toBe("dueDate");
  });

  it("should render the a placeholder to the date input", () => {
    expect(dateInput.input.placeholder).toBe("17/07/2024");
  });

  it("should render the a maxLength to the date input", () => {
    expect(dateInput.input.maxLength).toBe(10);
  });

  it("should render the a disabled to the date input", () => {
    dateInput.setAttribute("disabled", "true");
    expect(dateInput.input.disabled).toBe(false);
  });

  it("should render the input less the disabled attribute", () => {
    dateInput.removeAttribute("disabled");
    expect(dateInput.input.disabled).toBe(false);
  });
});
