class TaskCardComponent extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.cardContainer = document.createElement("div");
    this.cardContainer.className = "card";

    this.cardBodyContainer = document.createElement("div");
    this.cardBodyContainer.className = "card-body";

    this.h5Container = document.createElement("h5");
    this.h5Container.className = "card-title";

    this.paragraphContainer = document.createElement("p");
    this.paragraphContainer.className = "card-text";

    this.collumnParkingDaysContainer = document.createElement("p");
    this.collumnParkingDaysContainer.className = "card-text";

    const smallContainer = document.createElement("small");
    this.collumnParkingDaysContainer.appendChild(smallContainer);

    this.styleLink = document.createElement("link");
    this.styleLink.rel = "stylesheet";
    this.styleLink.href =
      "https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css";

    this.cardContainer.appendChild(this.cardBodyContainer);
    this.cardBodyContainer.appendChild(this.h5Container);
    this.cardBodyContainer.appendChild(this.paragraphContainer);
    this.cardBodyContainer.appendChild(this.collumnParkingDaysContainer);
    this.shadowRoot.append(this.cardContainer, this.styleLink);
  }

  connectedCallback() {
    const title = this.getAttribute("title");
    const description = this.getAttribute("description");
    const collumnParkingDays = this.getAttribute("collumn-parking-days");
    this.h5Container.textContent = title;
    this.paragraphContainer.textContent = description;
    this.collumnParkingDaysContainer.textContent = `${collumnParkingDays} dia${collumnParkingDays > 1 ? "s" : ""} nessa coluna`;
  }

  // attributeChangedCallback(name, oldValue, newValue) {
  //   if (name === "title") {
  //     this.h5Container.textContent = newValue;
  //   } else if (name === "description") {
  //     this.paragraphContainer.textContent = newValue;
  //   } else if (name === "collumn-parking-days") {
  //     this.collumnParkingDaysContainer.textContent = `${newValue} dia${newValue > 1 ? "s" : ""} nessa coluna`;
  //   }
  // }
}

customElements.define("app-task-card", TaskCardComponent);
