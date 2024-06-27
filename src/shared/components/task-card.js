import { calculateDiffDaysFromDate } from "../../utils/calculate-diff-days-from-date.js";

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
    this._deadlineProp;

    this.card = document.createElement("div");
    this.card.className = "card";
    this.card.style.cursor = "pointer";

    this.cardBody = document.createElement("div");
    this.cardBody.className = "card-body";

    this.cardTitle = document.createElement("h5");
    this.cardTitle.className = "card-title";

    this.cardDescription = document.createElement("p");
    this.cardDescription.className = "card-text text-secondary";

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

    this.card.appendChild(this.cardBody);
    this.cardBody.appendChild(this.cardTitle);
    this.cardBody.appendChild(this.cardDescription);
    this.cardBody.appendChild(this.wrapperTextRow);
    this.shadowRoot.append(this.card, this.styleLink);
  }

  handleCardClick() {
    const event = new CustomEvent("onClickTaskCard", {
      detail: {
        id: this._idProp,
        title: this._titleProp,
        deadline: this._deadlineProp,
        description: this._descriptionProp,
        parkingDaysAtCollumn: this._parkingDaysAtCollumn,
        status: this._statusProp,
      },
    });
    this.dispatchEvent(event);
  }

  getFomattedParkingDaysText(parkingDaysAtCollumn) {
    const days = Math.abs(parkingDaysAtCollumn);
    return `${days} dia${days > 1 ? "s" : ""} nessa coluna`;
  }

  getFormattedDaysSinceExpired(daysSinceExpired) {
    if (daysSinceExpired < 0) {
      return `Expirou a ${Math.abs(daysSinceExpired)} dia${Math.abs(daysSinceExpired) > 1 ? "s" : ""}`;
    } else if (daysSinceExpired > 0) {
      return `${daysSinceExpired} dia${daysSinceExpired > 1 ? "s" : ""} restantes`;
    } else if (daysSinceExpired === 0) {
      return "Expira hoje";
    }
  }

  getClassForDaysSinceExpired(daysSinceExpired) {
    if (daysSinceExpired < 0) {
      return "text-danger";
    } else if (daysSinceExpired > 0) {
      return "text-success";
    } else if (daysSinceExpired === 0) {
      return "text-warning";
    }
  }

  connectedCallback() {
    this._idProp = this.getAttribute("id");
    this._titleProp = this.getAttribute("title");
    this._descriptionProp = this.getAttribute("description");
    this._parkingDaysAtCollumn = this.getAttribute("parking-days-at-column");
    this._deadlineProp = this.getAttribute("deadline");

    this.cardTitle.textContent = this._titleProp;
    this.cardDescription.textContent = this._descriptionProp;

    const daysSinceExpired = calculateDiffDaysFromDate(this._deadlineProp);
    if (!daysSinceExpired) this.deadlineSmallText.textContent = null;
    this.deadlineSmallText.textContent =
      this.getFormattedDaysSinceExpired(daysSinceExpired);
    this.deadlineSmallText.className =
      this.getClassForDaysSinceExpired(daysSinceExpired);

    this.smallParkingDaysSmallText.textContent =
      this.getFomattedParkingDaysText(this._parkingDaysAtCollumn);

    this.card.addEventListener("click", this.handleCardClick.bind(this));
  }

  disconnectedCallback() {
    this.card.removeEventListener("click", this.handleCardClick.bind(this));
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "title") {
      this.cardTitle.textContent = newValue;
    } else if (name === "description") {
      this.cardDescription.textContent = newValue;
    } else if (name === "parking-days-at-column") {
      this.smallParkingDaysSmallText.textContent =
        this.getFomattedParkingDaysText(newValue);
    } else if (name === "deadline") {
      this.deadlineSmallText.textContent = `${calculateDiffDaysFromDate(newValue)} dia${calculateDiffDaysFromDate(newValue) > 1 ? "s" : ""} restantes`;
    }
  }
}

customElements.define("app-task-card", TaskCardComponent);
