// CounterComponent.test.js

/**
 * @jest-environment jsdom
 */

// Import necessary modules
import "./CounterComponent.js"; // Adjust the path to your actual component location

// Define the test suite
describe("CounterComponent", () => {
  let counter;

  // Set up the component before each test
  beforeEach(() => {
    document.body.innerHTML = "<counter-component></counter-component>";
    counter = document.querySelector("counter-component");
  });

  // Clean up after each test
  afterEach(() => {
    document.body.innerHTML = "";
  });

  test("should initialize with count 0", () => {
    const display = counter.shadowRoot.querySelector("div");
    expect(display.textContent).toBe("Count: 0");
  });

  test("should increment count when button is clicked", () => {
    const button = counter.shadowRoot.querySelector("button");
    const display = counter.shadowRoot.querySelector("div");

    button.click();
    expect(display.textContent).toBe("Count: 1");

    button.click();
    expect(display.textContent).toBe("Count: 2");
  });

  test("should dispatch countChanged event with new count", () => {
    const button = counter.shadowRoot.querySelector("button");
    const mockCallback = jest.fn();

    // Add event listener to catch the custom event
    counter.addEventListener("countChanged", mockCallback);

    button.click();
    button.click();

    expect(mockCallback).toHaveBeenCalledTimes(2);
    expect(mockCallback.mock.calls[1][0].detail.count).toBe(2);
  });
});
