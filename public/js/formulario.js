import { triggerToast } from './notificacao.js';
import { atualizar, salvar } from './servico.js';

// Definição das constantes para os IDs dos elementos do formulário
const FORMULARIO_ID = 'tarefa-formulario';
const FORMULARIO_TAREFA_ID = 'tarefa-id-form';
const FORMULARIO_CRIACAO_DATA_ID = 'tarefa-criacao-data-form';
const FORMULARIO_ULTIMA_ALTERACAO_ID = 'tarefa-ultima-alteracao-form';
export const FORMULARIO_STATUS_ID = 'tarefa-status-form';
export const FORMULARIO_TITULO_ID = 'tarefa-titulo-form';
export const FORMULARIO_HABILITAR_PRAZO_ID = 'tarefa-habilitar-prazo';
export const FORMULARIO_DATA_LIMITE_ID = 'tarefa-data-limite-form';
export const FORMULARIO_DESCRICAO_ID = 'tarefa-descricao-form';

/**
 * Obtém o elemento do formulário.
 * @returns {HTMLFormElement} O elemento do formulário.
 */
export function obterElementoFormulario() {
  return document.getElementById(FORMULARIO_ID);
}

/**
 * Reseta o formulário para seu estado inicial.
 */
export function resetarFormulario() {
  const formulario = obterElementoFormulario();
  resetarValidacaoCampoTitulo();
  resetarValidacaoCampoDataLimite();
  formulario.reset();
}

/**
 * Atribui valores ao formulário.
 * @param {Object} valores - Os valores a serem atribuídos.
 * @param {string} valores.id - O ID da tarefa.
 * @param {string} valores.title - O título da tarefa.
 * @param {string} valores.description - A descrição da tarefa.
 * @param {string} valores.status - O status da tarefa.
 * @param {string} valores.created_date - A data de criação da tarefa.
 * @param {string} valores.deadline_date - A data limite da tarefa.
 * @param {string} valores.last_status_update_date - A data da última atualização de status.
 */
export function atribuirValoresFormulario({
  id,
  title,
  description,
  status,
  created_date,
  deadline_date,
  last_status_update_date
}) {
  const dataCriacao = created_date ? created_date : new Date().toISOString();
  const dataLimite = deadline_date ? deadline_date : '';
  const dataUltimaAlteracao = last_status_update_date ? last_status_update_date : new Date().toISOString();

  atribuirValorCampoId(id || '');
  atribuirValorCampoTitulo(title || '');
  atribuirValorCampoDescricao(description || '');
  atribuirValorCampoStatus(status);
  atribuirValorCampoDataCriacao(dataCriacao.substring(0, 10));
  atribuirValorCampoDataLimite(dataLimite ? dataLimite.substring(0, 10) : '');
  atribuirValorCampoHabilitarPrazo(!!deadline_date);
  atribuirValorCampoDataUltimaAlteracao(dataUltimaAlteracao.substring(0, 10));
}

/**
 * Obtém os valores do formulário.
 * @returns {Object} Um objeto contendo os valores do formulário.
 */
function obterValoresFormulario() {
  const id = obterValorCampoId();
  const dataCriacao = obterValorCampoDataCriacao();
  const status = obterValorCampoStatus();
  const titulo = obterValorCampoTitulo();
  const habilitarPrazo = obterValorCampoHabilitarPrazo();
  const dataPrazo = obterValorCampoDataLimite();
  const descricao = obterValorCampoDescricao();

  const valores = {
    created_date: new Date(dataCriacao).toISOString(),
    deadline_date: habilitarPrazo ? new Date(dataPrazo).toISOString() : null,
    description: descricao,
    last_status_update_date: new Date().toISOString(),
    title: titulo,
    status,
  }

  if (id) {
    valores.id = id;
  }

  return valores
}

/**
 * Obtém o elemento do campo ID da tarefa.
 * @returns {HTMLInputElement} O elemento do campo ID.
 */
export function obterElementoCampoId() {
  return document.getElementById(FORMULARIO_TAREFA_ID);
}

/**
 * Atribui um valor ao campo ID da tarefa.
 * @param {string} valor - O valor a ser atribuído ao campo ID.
 */
export function atribuirValorCampoId(valor) {
  const campo = obterElementoCampoId();
  campo.value = valor;
}

/**
 * Obtém o valor do campo ID da tarefa.
 * @returns {string} O valor do campo ID.
 */
export function obterValorCampoId() {
  return obterElementoCampoId().value;
}

/**
 * Obtém o elemento do campo de data de criação.
 * @returns {HTMLInputElement} O elemento do campo de data de criação.
 */
export function obterElementoCampoDataCriacao() {
  return document.getElementById(FORMULARIO_CRIACAO_DATA_ID);
}

/**
 * Atribui um valor ao campo de data de criação.
 * @param {string} valor - O valor a ser atribuído ao campo de data de criação.
 */
export function atribuirValorCampoDataCriacao(valor) {
  const campo = obterElementoCampoDataCriacao();
  campo.value = valor;
}

/**
 * Obtém o valor do campo de data de criação.
 * @returns {string} O valor do campo de data de criação.
 */
export function obterValorCampoDataCriacao() {
  return obterElementoCampoDataCriacao().value;
}

/**
 * Obtém o elemento do campo de última alteração.
 * @returns {HTMLInputElement} O elemento do campo de última alteração.
 */
export function obterElementoCampoDataUltimaAlteracao() {
  return document.getElementById(FORMULARIO_ULTIMA_ALTERACAO_ID);
}

/**
 * Atribui um valor ao campo de última alteração.
 * @param {string} valor - O valor a ser atribuído ao campo de última alteração.
 */
export function atribuirValorCampoDataUltimaAlteracao(valor) {
  const campo = obterElementoCampoDataUltimaAlteracao();
  campo.value = valor || new Date().toISOString();
}

/**
 * Obtém o valor do campo de última alteração.
 * @returns {string} O valor do campo de última alteração.
 */
export function obterValorCampoDataUltimaAlteracao() {
  return obterElementoCampoDataUltimaAlteracao().value;
}

/**
 * Obtém o elemento do campo de status do formulário.
 * @returns {HTMLSelectElement} O elemento do campo de status.
 */
export function obterElementoCampoStatus() {
  return document.getElementById(FORMULARIO_STATUS_ID);
}

/**
 * Atribui um valor ao campo de status do formulário.
 * @param {string} valor - O valor a ser atribuído ao campo de status.
 */
export function atribuirValorCampoStatus(valor) {
  const campo = obterElementoCampoStatus();
  campo.value = valor;
}

/**
 * Obtém o valor do campo de status do formulário.
 * @returns {string} O valor do campo de status.
 */
export function obterValorCampoStatus() {
  return Number(obterElementoCampoStatus().value);
}

/**
 * Obtém o elemento do campo de título do formulário.
 * @returns {HTMLInputElement} O elemento do campo de título.
 */
export function obterElementoCampoTitulo() {
  return document.getElementById(FORMULARIO_TITULO_ID);
}

/**
 * Atribui um valor ao campo de título do formulário.
 * @param {string} valor - O valor a ser atribuído ao campo de título.
 */
export function atribuirValorCampoTitulo(valor) {
  const campo = obterElementoCampoTitulo();
  campo.value = valor;
}

/**
 * Valida o valor do campo de título do formulário.
 */
export function validarValorCampoTitulo() {
  const elemento = obterElementoCampoTitulo();
  if (!elemento.value) {
    elemento.classList.add('is-invalid');
    elemento.addEventListener('input', validarValorCampoTitulo);
    return;
  }
  elemento.removeEventListener('input', validarValorCampoTitulo);
  elemento.classList.remove('is-invalid');
}

/**
 * Reseta a validação do campo de título do formulário.
 */
export function resetarValidacaoCampoTitulo() {
  const elemento = obterElementoCampoTitulo();
  elemento.classList.remove('is-invalid');
}

/**
 * Obtém o valor do campo de título do formulário.
 * @returns {string} O valor do campo de título.
 */
export function obterValorCampoTitulo() {
  return obterElementoCampoTitulo().value;
}

/**
 * Obtém o elemento do campo de habilitação de prazo do formulário.
 * @returns {HTMLInputElement} O elemento do campo de habilitação de prazo.
 */
export function obterElementoCampoHabilitarPrazo() {
  return document.getElementById(FORMULARIO_HABILITAR_PRAZO_ID);
}

/**
 * Atribui um valor ao campo de habilitação de prazo do formulário.
 * @param {boolean} valor - O valor a ser atribuído ao campo de habilitação de prazo.
 */
export function atribuirValorCampoHabilitarPrazo(valor) {
  const campo = obterElementoCampoHabilitarPrazo();
  campo.checked = valor;
}

/**
 * Obtém o valor do campo de habilitação de prazo do formulário.
 * @returns {boolean} O valor do campo de habilitação de prazo.
 */
export function obterValorCampoHabilitarPrazo() {
  return obterElementoCampoHabilitarPrazo().checked;
}

/**
 * Obtém o elemento do campo de data limite do formulário.
 * @returns {HTMLInputElement} O elemento do campo de data limite.
 */
export function obterElementoCampoDataLimite() {
  return document.getElementById(FORMULARIO_DATA_LIMITE_ID);
}

/**
 * Atribui um valor ao campo de data limite do formulário.
 * @param {string} valor - O valor a ser atribuído ao campo de data limite.
 */
export function atribuirValorCampoDataLimite(valor) {
  const campo = obterElementoCampoDataLimite();
  campo.value = valor;
}

/**
 * Valida o valor do campo de data limite do formulário.
 */
export function validarValorCampoDataLimite() {
  const elemento = obterElementoCampoDataLimite();
  if (!elemento.value) {
    elemento.classList.add('is-invalid');
    elemento.addEventListener('input', validarValorCampoDataLimite);
    return;
  }
  elemento.removeEventListener('input', validarValorCampoDataLimite);
  elemento.classList.remove('is-invalid');
}

/**
 * Reseta a validação do campo de data limite do formulário.
 */
export function resetarValidacaoCampoDataLimite() {
  const elemento = obterElementoCampoDataLimite();
  elemento.classList.remove('is-invalid');
}

/**
 * Obtém o valor do campo de data limite do formulário.
 * @returns {string} O valor do campo de data limite.
 */
export function obterValorCampoDataLimite() {
  return obterElementoCampoDataLimite().value;
}

/**
 * Obtém o elemento do campo de descrição do formulário.
 * @returns {HTMLTextAreaElement} O elemento do campo de descrição.
 */
export function obterElementoCampoDescricao() {
  return document.getElementById(FORMULARIO_DESCRICAO_ID);
}

/**
 * Atribui um valor ao campo de descrição do formulário.
 * @param {string} valor - O valor a ser atribuído ao campo de descrição.
 */
export function atribuirValorCampoDescricao(valor) {
  const campo = obterElementoCampoDescricao();
  campo.value = valor;
}

/**
 * Obtém o valor do campo de descrição do formulário.
 * @returns {string} O valor do campo de descrição.
 */
export function obterValorCampoDescricao() {
  return obterElementoCampoDescricao().value;
}

/**
 * Registra o formulário modal e configura o evento de submissão.
 * @param {Function} retorno - A função de retorno a ser chamada após a submissão.
 */
export function registrarFormularioModal(retorno) {
  const formulario = document.getElementById(FORMULARIO_ID);

  if (formulario) {
    formulario.addEventListener('submit', async (event) => {
      const elementoDataLimite = obterElementoCampoDataLimite();

      resetarValidacaoCampoTitulo();
      resetarValidacaoCampoDataLimite();

      event.preventDefault();

      if (obterValorCampoHabilitarPrazo()) {
        elementoDataLimite.required = true;
      } else {
        elementoDataLimite.required = false;
      }

      if (!formulario.checkValidity()) {
        validarValorCampoTitulo();
        if (obterValorCampoHabilitarPrazo()) {
          validarValorCampoDataLimite();
        }
        event.stopPropagation();
        return;
      }

      const valores = obterValoresFormulario();

      try {
        if (valores.id) {
          await atualizar(valores.id, valores);
          triggerToast('Tarefa atualizada com sucesso');
        } else {
          await salvar(valores);
          triggerToast('Tarefa incluída com sucesso');
        }
      } catch (e) {
        console.error('Erro ao salvar nova tarefa', e);
      }
      retorno();
    });
  }
}
