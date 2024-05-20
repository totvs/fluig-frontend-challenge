import { adicionarItemLista, alterarContadorColuna, limparItemsLista } from './coluna.js';
import { calcularDiasDesde, calcularPrazoConclusao, verificarConclusaoPrazo } from './dateUtils.js';
import { obterFragmento } from "./fragmentos.js";

/**
 * ID do elemento HTML onde será exibido o contador de dias na coluna.
 * @type {string}
 */
const ID_ELEMENTO_DIAS_COLUNA = 'tarefa-dias-na-coluna';

/**
 * ID do elemento HTML onde será exibido o status de conclusão da tarefa.
 * @type {string}
 */
const ID_ELEMENTO_CONSLUSAO = 'tarefa-prazo-conclusao';

/**
 * Adiciona o contador de dias desde a última alteração da tarefa na coluna.
 * @param {HTMLElement} fragmento - O fragmento HTML onde serão inseridos os dados da tarefa.
 * @param {Object} tarefa - Os dados da tarefa.
 */
function adicionaContadorDeDiasColuna(fragmento, tarefa) {
  const diasUltimaAlteracao = calcularDiasDesde(tarefa.last_status_update_date);
  const complementoTexto = diasUltimaAlteracao <= 1 ? `dia` : 'dias';
  const texto = `${diasUltimaAlteracao} ${complementoTexto} nesta coluna`;

  fragmento.querySelector(`#${ID_ELEMENTO_DIAS_COLUNA}`).textContent = texto;
}

/**
 * Adiciona o status de andamento da tarefa no fragmento HTML.
 * @param {HTMLElement} fragmento - O fragmento HTML onde serão inseridos os dados da tarefa.
 * @param {Object} tarefa - Os dados da tarefa.
 */
function adicionarAndamentoTarefa(fragmento, tarefa) {
  let elementoEstilo;
  let texto;
  const prazo = calcularPrazoConclusao(tarefa.deadline_date);

  if(prazo.dataFinalHoje) {
    elementoEstilo = 'text-warning';
    texto = 'Expira hoje';
  } else if (!prazo.expirada) {
    elementoEstilo = 'text-success';
    texto = `${prazo.diasParaExpirar} ${prazo.diasParaExpirar > 1 ? 'dias restantes' : 'dia restante'}`;
  } else {
    elementoEstilo = 'text-danger';
    texto = `Expirou a ${prazo.diasExpirada} ${prazo.diasExpirada > 1 ? 'dias' : 'dia'}`;
  }

  if(tarefa.status === 2 && tarefa.deadline_date) {
    if(verificarConclusaoPrazo(tarefa.deadline_date, tarefa.last_status_update_date)) {
      elementoEstilo = 'text-success';
      texto = 'Entrega no prazo';
    } else {
      elementoEstilo = 'text-danger';
      texto = 'Entrega com atraso';
    }
  }

  fragmento.querySelector(`#${ID_ELEMENTO_CONSLUSAO}`).classList.add(elementoEstilo);
  fragmento.querySelector(`#${ID_ELEMENTO_CONSLUSAO}`).textContent = texto;
}

/**
 * Cria um elemento HTML para representar uma tarefa.
 * @param {HTMLElement} fragmento - O fragmento HTML onde serão inseridos os dados da tarefa.
 * @param {Object} tarefa - Os dados da tarefa.
 * @returns {HTMLElement} - O elemento HTML criado.
 */
function criarElementoTarefa(fragmento, tarefa) {
  const taskElement = document.createElement('div');
  taskElement.innerHTML = fragmento.trim();

  taskElement.querySelector('.card-title').textContent = tarefa.title;
  taskElement.querySelector('.card-text').textContent = tarefa.description;
  taskElement.querySelector('.card-button').setAttribute('data-id', tarefa.id);

  adicionaContadorDeDiasColuna(taskElement, tarefa);

  if (tarefa.deadline_date) {
    adicionarAndamentoTarefa(taskElement, tarefa);
  }

  return taskElement.firstChild;
}

/**
 * Renderiza as tarefas na interface do usuário.
 * @param {Array} tarefas - A lista de tarefas a serem renderizadas.
 */
export async function renderizarTarefas(tarefas) {
  const fragmento = await obterFragmento('tarefa');
  const organizador = { '0': [], '1': [], '2': [] };

  limparItemsLista();

  if(!fragmento) {
    console.error('Não foi possível encontrar o fragmento da tarefa.');
    return null;
  }

  tarefas.forEach((tarefa) => {
    organizador[tarefa.status].push(criarElementoTarefa(fragmento, tarefa));
  });

  for (const chave in organizador) {
    alterarContadorColuna(chave, organizador[chave].length);
    organizador[chave].forEach(elemento => adicionarItemLista(chave, elemento));
  }
}
