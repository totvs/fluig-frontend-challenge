import * as bootstrap from "bootstrap";

export const showToastMessage = (message, type = "success") => {
  const toastComponent = document.querySelector(".toast-component");
  toastComponent.classList.add(`text-bg-${type}`);
  toastComponent.querySelector(".toast-body").textContent = message;
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastComponent);
  toastBootstrap.show();
};
