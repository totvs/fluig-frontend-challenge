import { atribuirValoresFormulario, registrarFormularioModal, resetarFormulario } from './formulario.js';
import { triggerToast } from './notificacao.js';
import { excluir, obter } from './servico.js';

const MODAL_ID = 'tarefaModal';
const BOTAO_CANCELAR_EXCLUIR_ID = 'modal-botao-excluir-cancelar';
const BOTAO_SALVAR_ATUALIZAR_ID = 'modal-botao-salvar-atualizar';

/**
 * Registra eventos para manipulação do modal de tarefas.
 * @param {Function} retorno - Função de callback a ser chamada após o modal ser fechado.
 */
export function registrarEventoModal(retorno) {
  let idTarefaModal = false;
  const elementoModal = document.getElementById(MODAL_ID);
  const elementoBotaoCancelarExcluir = document.getElementById(BOTAO_CANCELAR_EXCLUIR_ID);
  const elementoBotaoSalvarAtualizar = document.getElementById(BOTAO_SALVAR_ATUALIZAR_ID);
  const fecharModalElemento = document.getElementById('fecharModal');

  if (elementoModal) {
    elementoModal.addEventListener('show.bs.modal', async (event) => {
      let tarefa = {};
      resetarFormulario();

      const button = event.relatedTarget;
      const dataStatus = button.getAttribute('data-status');
      idTarefaModal = button.getAttribute('data-id');
      const modalTitle = elementoModal.querySelector('.modal-title');

      if (idTarefaModal) {
        elementoBotaoCancelarExcluir.textContent = 'Excluir';
        elementoBotaoSalvarAtualizar.textContent = 'Atualizar';
        try {
          tarefa = await obter(idTarefaModal);
        } catch (e) {
          console.error('Erro ao obter a tarefa', e);
        }
      } else {
        elementoBotaoCancelarExcluir.textContent = 'Cancelar';
        elementoBotaoSalvarAtualizar.textContent = 'Salvar';
      }

      atribuirValoresFormulario({
        ...tarefa,
        status: (tarefa.status || tarefa.status === 0) ? tarefa.status.toString() : dataStatus
      });

      modalTitle.textContent = idTarefaModal ? 'Atualizar tarefa' : 'Nova tarefa';

      registrarFormularioModal(() => {
        retorno();
        fecharModalElemento.click();
      });
    });
  }

  if (elementoBotaoCancelarExcluir) {
    elementoBotaoCancelarExcluir.addEventListener('click', async () => {
      if (idTarefaModal) {
        try {
          await excluir(idTarefaModal);
          triggerToast('Tarefa excluída com sucesso');
          retorno();
        } catch (e) {
          console.error('Erro ao excluir tarefa', e);
        }
      }
    });
  }
}
