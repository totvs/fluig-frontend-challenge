/**
 * Mapeamento dos IDs dos contadores de colunas por status.
 * @type {Object.<string, string>}
 */
const COLUNA_CONTADOR_ID_POR_STATUS = {
  '0': 'coluna-a-fazer-contador',
  '1': 'coluna-fazendo-contador',
  '2': 'coluna-concluido-contador'
};

/**
 * Mapeamento dos IDs das listas de itens por status.
 * @type {Object.<string, string>}
 */
const COLUNA_LISTA_ID_POR_STATUS = {
  '0': 'coluna-a-fazer-lista-items',
  '1': 'coluna-fazendo-lista-items',
  '2': 'coluna-concluido-lista-items'
};

/**
 * Altera o valor do contador de itens em uma coluna específica baseada no status.
 * @param {string} codigoStatus - O código do status da coluna.
 * @param {number} valorContador - O novo valor do contador.
 */
export function alterarContadorColuna(codigoStatus, valorContador) {
  const idColunaContador = COLUNA_CONTADOR_ID_POR_STATUS[codigoStatus] || 'Desconhecido';
  const contadorElemento = document.getElementById(idColunaContador);

  if (contadorElemento) {
    contadorElemento.innerText = valorContador || 0;
  } else {
    console.error(`Elemento contador não encontrado para ID: ${idColunaContador}`);
  }
}

/**
 * Limpa todos os itens de todas as listas de colunas.
 */
export function limparItemsLista() {
  Object.values(COLUNA_LISTA_ID_POR_STATUS).forEach((value) => {
    const listaElemento = document.getElementById(value);
    listaElemento.innerHTML = '';
  });
}

/**
 * Adiciona um item a uma lista de coluna específica baseada no status.
 * @param {string} codigoStatus - O código do status da coluna.
 * @param {HTMLElement} item - O elemento do item a ser adicionado.
 */
export function adicionarItemLista(codigoStatus, item) {
  const idColunaLista = COLUNA_LISTA_ID_POR_STATUS[codigoStatus] || 'Desconhecido';
  const listaElemento = document.getElementById(idColunaLista);

  const elemento = document.createElement("li");
  elemento.classList = 'list-group-item';
  elemento.appendChild(item);

  if (listaElemento) {
    listaElemento.appendChild(elemento);
  } else {
    console.error(`Elemento lista não encontrado para ID: ${idColunaLista}`);
  }
}
