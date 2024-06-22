class Card extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });

    const title = this.getAttribute("title");

    const span = document.createElement("span");
    span.textContent = title;
    span.classList.add("block");
    span.addEventListener("click", () => {
      span.classList.toggle("block");
    });

    const style = document.createElement("style");
    style.textContent = `
      .block {
        border-radius: 10px;
        padding: 20px;
        background-color: red;
        color: white;
      }
    `;

    shadow.appendChild(style);
    shadow.appendChild(span);
  }
}

customElements.define("app-card", Card);
