const toastLiveExample = document.getElementById('liveToast');
const TOAST_ELEMENTO_ID = 'toast-body-text';

/**
 * Exibe uma notificação do tipo toast com a mensagem fornecida.
 * @param {string} texto - A mensagem a ser exibida no toast.
 */
export function triggerToast(texto) {
  const elementoParaTexto = document.getElementById(TOAST_ELEMENTO_ID);

  if (!elementoParaTexto) {
    console.error(`Elemento com ID ${TOAST_ELEMENTO_ID} não encontrado.`);
    return;
  }

  if (!toastLiveExample) {
    console.error('Elemento do toast não encontrado.');
    return;
  }

  elementoParaTexto.textContent = texto;

  // Desabilitado pois a importação do item bootstrap se dá pelo index.html,
  // sendo assim não necessário a importação do mesmo aqui.
  // eslint-disable-next-line no-undef
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
  toastBootstrap.show();
}
