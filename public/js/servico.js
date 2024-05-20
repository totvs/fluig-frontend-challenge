/**
 * Busca uma tarefa pelo seu ID ou todas as tarefas, se nenhum ID for fornecido.
 * @param {string} [id] - O ID da tarefa a ser buscada. Se não fornecido, busca todas as tarefas.
 * @returns {Promise<Object|Array>} - Uma Promise que resolve com os dados da tarefa ou lista de tarefas encontradas.
 */
export async function obter(id) {
  try {
    const url = id ? `http://localhost:3000/tasks/${id}` : 'http://localhost:3000/tasks';
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Erro ao buscar tarefas');
    }

    return await response.json();
  } catch (error) {
    console.error('Erro ao buscar tarefas:', error);
    return [];
  }
}

/**
 * Busca tarefas que contenham um determinado termo na descrição.
 * @param {string} busca - O termo a ser buscado nas descrições das tarefas.
 * @returns {Promise<Array>} - Uma Promise que resolve com a lista de tarefas que correspondem à busca.
 */
export async function buscar(busca) {
  const tarefas = await obter();
  return tarefas.filter((task) => task.title.toLowerCase().includes(busca.toLowerCase()));
}

/**
 * Salva uma nova tarefa no servidor.
 * @param {Object} dados - Os dados da tarefa a serem salvos.
 * @returns {Promise<Response>} - Uma Promise que resolve com a resposta da requisição.
 */
export async function salvar(dados) {
  const opcoesRequisicao = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dados)
  };

  try {
    const response = await fetch('http://localhost:3000/tasks', opcoesRequisicao);
    return response;
  } catch (e) {
    console.error('Erro ao salvar tarefa', e);
  }
}

/**
 * Atualiza os dados de uma tarefa no servidor.
 * @param {string} id - O ID da tarefa a ser atualizada.
 * @param {Object} dados - Os novos dados da tarefa.
 * @returns {Promise<Response>} - Uma Promise que resolve com a resposta da requisição.
 */
export async function atualizar(id, dados) {
  const opcoesRequisicao = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dados)
  };

  try {
    const response = await fetch(`http://localhost:3000/tasks/${id}`, opcoesRequisicao);
    return response;
  } catch (e) {
    console.error('Erro ao atualizar tarefa', e);
  }
}

/**
 * Exclui uma tarefa do servidor.
 * @param {string} id - O ID da tarefa a ser excluída.
 * @returns {Promise<Response>} - Uma Promise que resolve com a resposta da requisição.
 */
export async function excluir(id) {
  const opcoesRequisicao = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
  };

  try {
    const response = await fetch(`http://localhost:3000/tasks/${id}`, opcoesRequisicao);
    return response;
  } catch (e) {
    console.error('Erro ao excluir tarefa', e);
  }
}
