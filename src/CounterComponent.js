class CounterComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.count = 0;

    // Create a button and display area for the count
    this.button = document.createElement("button");
    this.button.textContent = "Increment";

    this.display = document.createElement("div");
    this.display.textContent = `Count: ${this.count}`;

    // Attach the button and display to the shadow DOM
    this.shadowRoot.append(this.display, this.button);

    // Bind the increment function to this instance
    this.increment = this.increment.bind(this);
  }

  connectedCallback() {
    // Add event listener to the button
    this.button.addEventListener("click", this.increment);
  }

  disconnectedCallback() {
    // Clean up event listener when the element is removed
    this.button.removeEventListener("click", this.increment);
  }

  increment() {
    this.count += 1;
    this.display.textContent = `Count: ${this.count}`;

    // Dispatch a custom event with the new count
    const event = new CustomEvent("countChanged", {
      detail: { count: this.count },
    });

    this.dispatchEvent(event);
  }
}

// Define the custom element
customElements.define("counter-component", CounterComponent);
