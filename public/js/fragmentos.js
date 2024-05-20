/**
 * Função assíncrona para buscar um arquivo HTML parcial pelo nome.
 * @param {string} fragmento - O nome do arquivo HTML parcial a ser buscado.
 * @returns {Promise<string|null>} Uma Promise que resolve com o conteúdo do arquivo HTML parcial, ou null se houver um erro.
 * @throws {Error} Lança um erro se a resposta não estiver OK.
 */
export async function obterFragmento(fragmento) {
  try {
    const response = await fetch(`../fragmentos/${fragmento}.html`);

    if (!response.ok) {
      throw new Error(`Erro ao buscar o fragmento: ${response.statusText}`);
    }

    return await response.text();
  } catch (error) {
    console.error('Erro ao buscar o HTML do partial de tarefas:', error);
    return null;
  }
}
