class DateInput extends HTMLElement {
  static get observedAttributes() {
    return ["disabled", "value", "placeholder", "name", "valid"];
  }

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this.input = document.createElement("input");
    this.input.classList.add("form-control");
    this.input.type = "datetime-local";
    this.shadow.appendChild(this.input);

    const style = document.createElement("style");
    style.textContent = `
      input::-webkit-input-placeholder {
        color: red;
      }

      input:-moz-placeholder {
              color: red;
      }
    `;

    this.styleLink = document.createElement("link");
    this.styleLink.rel = "stylesheet";
    this.styleLink.href =
      "https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css";

    this.shadow.append(style, this.styleLink, this.input);
  }

  handleOnChange(event) {
    this.dateValue = event.target.value;
    const customEvent = new CustomEvent("dateInputChanged", {
      detail: {
        value: event.target.value,
      },
    });
    this.dispatchEvent(customEvent);
  }

  connectedCallback() {
    this.dateValue = this.getAttribute("value");
    this.input.name = this.getAttribute("name");
    this.input.placeholder = this.getAttribute("placeholder");
    this.input.value = this.dateValue;
    this.input.maxLength = 10;

    if (this.hasAttribute("valid") && this.getAttribute("valid") === "false") {
      this.input.classList.add("is-invalid");
    }

    if (this.hasAttribute("disabled")) {
      this.input.setAttribute("disabled", "");
    }
    this.input.addEventListener("change", this.handleOnChange.bind(this));
  }

  disconnectedCallback() {
    this.input.removeEventListener("change", this.handleOnChange.bind(this));
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "valid") {
      if (newValue === "false") {
        this.input.classList.add("is-invalid");
      } else {
        this.input.classList.remove("is-invalid");
      }
    }

    if (name === "value") {
      this.input.value = newValue;
    }

    if (name === "disabled") {
      if (newValue === "disabled") {
        this.input.setAttribute("disabled", "disabled");
      } else {
        this.input.removeAttribute("disabled");
      }
    }
  }
}

customElements.define("date-input", DateInput);
