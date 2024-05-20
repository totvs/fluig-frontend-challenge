/**
 * Registra o evento de busca no formulário e chama a função de retorno quando ocorre uma busca.
 * @param {function} retorno A função de retorno que será chamada com o termo de busca.
 */
export function registroEventoBusca(retorno) {
  try {
    const formulario = document.getElementById('formulario-busca');

    if (!formulario) {
      console.error('Não foi possível encontrar o formulário de busca no DOM.');
      return;
    }

    formulario.addEventListener('submit', (event) => {
      event.preventDefault();

      const searchTerm = document.getElementById('formulario-busca-entrada').value;

      retorno(searchTerm);
    });
  } catch (error) {
    console.error('Erro ao registrar evento de busca:', error);
  }
}


