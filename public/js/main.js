import { registroEventoBusca } from './busca.js';
import { registrarEventoModal } from './modal.js';
import { buscar, obter } from './servico.js';
import { renderizarTarefas } from './tarefas.js';

document.addEventListener('DOMContentLoaded', async () => {
  const tarefas = await obter();

  await renderizarTarefas(tarefas);

  registroEventoBusca(async (termo) => {
    const tarefas = await buscar(termo);
    await renderizarTarefas(tarefas);
  });

  registrarEventoModal(async () => {
    const tarefas = await obter();

    await renderizarTarefas(tarefas);
  });
});
