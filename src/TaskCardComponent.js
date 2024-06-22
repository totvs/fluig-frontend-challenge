class TaskCardComponent extends HTMLElement {
  constructor() {
    super();

    const titleProperty = this.getAttribute("title");
    const descriptionProperty = this.getAttribute("description");
    const collumnParkingDaysProperty = this.getAttribute("collumnParkingDays");

    const cardContainer = document.createElement("div");
    cardContainer.className = "card";

    const cardBodyContainer = document.createElement("div");
    cardBodyContainer.className = "card-body";

    const h5Container = document.createElement("h5");
    h5Container.textContent = titleProperty;
    h5Container.className = "card-title";

    const paragraphContainer = document.createElement("p");
    paragraphContainer.textContent = descriptionProperty;
    paragraphContainer.className = "card-text";

    const collumnParkingDaysContainer = document.createElement("p");
    collumnParkingDaysContainer.className = "card-text";
    const smallContainer = document.createElement("small");
    smallContainer.textContent = `${collumnParkingDaysProperty} dia${collumnParkingDaysProperty > 1 ? "s" : ""} nessa coluna`;
    collumnParkingDaysContainer.appendChild(smallContainer);

    cardContainer.appendChild(cardBodyContainer);
    cardBodyContainer.appendChild(h5Container);
    cardBodyContainer.appendChild(paragraphContainer);
    cardBodyContainer.appendChild(collumnParkingDaysContainer);
    this.appendChild(cardContainer);
  }
}

customElements.define("app-task-card", TaskCardComponent);
