class TaskCardComponent extends HTMLElement {
  static get observedAttributes() {
    return ["id", "title", "description", "deadline", "parking-days-at-column"];
  }

  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    this._idProp;
    this._titleProp;
    this._descriptionProp;
    this._parkingDaysAtCollumn;
    this._deadlineProps;

    this.cardContainer = document.createElement("div");
    this.cardContainer.className = "card";
    this.cardContainer.style.cursor = "pointer";

    this.cardBodyContainer = document.createElement("div");
    this.cardBodyContainer.className = "card-body";

    this.h5Container = document.createElement("h5");
    this.h5Container.className = "card-title";

    this.paragraphContainer = document.createElement("p");
    this.paragraphContainer.className = "card-text text-secondary";

    this.wrapperTextRow = document.createElement("div");
    this.wrapperTextRow.className = "d-flex justify-content-between";

    this.parkingDaysTextParagraph = document.createElement("p");
    this.parkingDaysTextParagraph.className = "card-text m-0";
    this.smallParkingDaysSmallText = document.createElement("small");
    this.smallParkingDaysSmallText.className = "text-secondary";
    this.parkingDaysTextParagraph.appendChild(this.smallParkingDaysSmallText);

    this.deadlineTextParagraph = document.createElement("p");
    this.deadlineTextParagraph.className = "card-text m-0";

    this.deadlineSmallText = document.createElement("small");
    this.deadlineSmallText.className = "text-secondary";
    this.deadlineTextParagraph.appendChild(this.deadlineSmallText);

    this.wrapperTextRow.appendChild(this.parkingDaysTextParagraph);
    this.wrapperTextRow.appendChild(this.deadlineTextParagraph);

    this.styleLink = document.createElement("link");
    this.styleLink.rel = "stylesheet";
    this.styleLink.href =
      "https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css";

    this.cardContainer.appendChild(this.cardBodyContainer);
    this.cardBodyContainer.appendChild(this.h5Container);
    this.cardBodyContainer.appendChild(this.paragraphContainer);
    this.cardBodyContainer.appendChild(this.wrapperTextRow);
    this.shadowRoot.append(this.cardContainer, this.styleLink);
  }

  handleCardClick() {
    const event = new CustomEvent("clickOnTaskCard", {
      composed: true,
      bubbles: true,
      detail: {
        id: this._idProp,
        title: this._titleProp,
        deadline: this._deadlineProps,
        description: this._descriptionProp,
        parkingDaysAtCollumn: this._parkingDaysAtCollumn,
        status: this._statusProp,
      },
    });
    this.dispatchEvent(event);
  }

  getDaysSinceExpired(date) {
    const deadline = new Date(date);
    const now = new Date();
    const diffTimeInMilliseconds = deadline - now;
    const minutes = 1000 * 60;
    const hours = minutes * 60;
    const days = hours * 24;
    const diffDays = Math.ceil(diffTimeInMilliseconds / days);
    return diffDays;
  }

  connectedCallback() {
    this._idProp = this.getAttribute("id");
    this._titleProp = this.getAttribute("title");
    this._descriptionProp = this.getAttribute("description");
    this._parkingDaysAtCollumn = this.getAttribute("parking-days-at-column");
    this._deadlineProps = this.getAttribute("deadline");

    this.h5Container.textContent = this._titleProp;
    this.paragraphContainer.textContent = this._descriptionProp;

    const parkingDaysAtCollumn = this._parkingDaysAtCollumn;
    const deadlineDays = this.getDaysSinceExpired(this._deadlineProps);

    if (!deadlineDays) this.deadlineSmallText.textContent = null;

    if (deadlineDays < 0) {
      this.deadlineSmallText.textContent = `Expirou a ${Math.abs(deadlineDays)} dia${Math.abs(deadlineDays) > 1 ? "s" : ""}`;
      this.deadlineSmallText.classList.add("text-danger");
    } else if (deadlineDays > 0) {
      this.deadlineSmallText.textContent = `${deadlineDays} dia${deadlineDays > 1 ? "s" : ""} restantes`;
      this.deadlineSmallText.classList.add("text-success");
    } else if (deadlineDays === 0) {
      this.deadlineSmallText.textContent = "Expira hoje";
      this.deadlineSmallText.classList.add("text-warning");
    }

    this.smallParkingDaysSmallText.textContent = `${parkingDaysAtCollumn} dia${parkingDaysAtCollumn > 1 ? "s" : ""} nessa coluna`;
    this.cardContainer.addEventListener(
      "click",
      this.handleCardClick.bind(this)
    );
  }

  disconnectedCallback() {
    this.cardContainer.removeEventListener(
      "click",
      this.handleCardClick.bind(this)
    );
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "title") {
      this.h5Container.textContent = newValue;
    } else if (name === "description") {
      this.paragraphContainer.textContent = newValue;
    } else if (name === "parking-days-at-column") {
      this.smallParkingDaysSmallText.textContent = `${newValue} dia${newValue > 1 ? "s" : ""} nessa coluna`;
    } else if (name === "deadline") {
      this.deadlineSmallText.textContent = `${this.getDaysSinceExpired(newValue)} dia${this.getDaysSinceExpired(newValue) > 1 ? "s" : ""} restantes`;
    }
  }
}

customElements.define("app-task-card", TaskCardComponent);
