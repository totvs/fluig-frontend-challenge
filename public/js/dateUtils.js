/**
 * Calcula o número de dias desde uma data até hoje.
 * @param {string} dataReferencia - A data no formato ISO 8601 (e.g., "2024-04-24T13:47:53.045Z").
 * @returns {number} O número de dias desde a data até hoje.
 */
export function calcularDiasDesde(dataReferencia) {
  // Converte a string da data para um objeto Date
  const data = new Date(dataReferencia);

  // Obtém a data atual
  const hoje = new Date();

  // Calcula a diferença em milissegundos
  const diferencaMilissegundos = hoje - data;

  // Converte a diferença de milissegundos para dias
  const diferencaDias = Math.floor(diferencaMilissegundos / (1000 * 60 * 60 * 24));

  return diferencaDias;
}

/**
 * Calcula informações sobre a data de uma tarefa.
 * @param {string} dataInicioString - A data de início no formato ISO 8601 (e.g., "2024-04-24T13:47:53.045Z").
 * @param {string} dataFimString - A data de término no formato ISO 8601 (e.g., "2024-04-26T13:47:53.045Z").
 * @returns {Object} Um objeto contendo as informações calculadas.
 */
export function calcularPrazoConclusao(dataFimTarefa) {
  const dataFim = new Date(dataFimTarefa);
  const hoje = new Date();

  // Remove a parte do tempo das datas para comparar apenas as datas
  dataFim.setHours(0, 0, 0, 0);
  hoje.setHours(0, 0, 0, 0);

  // Calcula a diferença em milissegundos entre hoje e a data de fim
  const diferencaMilissegundos = dataFim - hoje;
  const diferencaDias = Math.floor(diferencaMilissegundos / (1000 * 60 * 60 * 24));

  const resultado = {
    expirada: diferencaDias < 0,
    diasExpirada: diferencaDias < 0 ? Math.abs(diferencaDias) : 0,
    diasParaExpirar: diferencaDias > 0 ? diferencaDias : 0,
    dataFinalHoje: diferencaDias === 0,
  };

  return resultado;
}

/**
 * Verifica se a tarefa foi concluída dentro do prazo ou após a data limite.
 * @param {string} dataLimite - A data limite em formato ISO 8601.
 * @param {string} dataUltimaAlteracao - A data da última atualização de status em formato ISO 8601.
 * @returns {boolean} - Retorna verdadeiro se a tarefa foi concluída dentro do prazo, falso se foi concluída após a data limite.
 */
export function verificarConclusaoPrazo(dataLimite, dataUltimaAlteracao) {
  const limite = new Date(dataLimite);
  const ultimaAtualizacao = new Date(dataUltimaAlteracao);

  limite.setHours(0, 0, 0, 0);
  ultimaAtualizacao.setHours(0, 0, 0, 0);

  return ultimaAtualizacao <= limite;
}