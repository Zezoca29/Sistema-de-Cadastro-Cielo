// Importar a função fetch do jest-fetch-mock
import fetch from 'jest-fetch-mock';

// Função para editar um usuário
async function editUser(nome, email, senha, dataNascimento, fetchFunction = fetch) {
    try {
        const response = await fetchFunction(`/usuarios/${email}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: nome,
                senha: senha,
                dataNascimento: dataNascimento
            })
        });
        const data = await response.json();
        console.log('Usuário atualizado:', data);
        return data;
    } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        throw error;
    }
}

// Função para excluir um usuário
async function deleteUser(email, fetchFunction = fetch) {
    try {
        const response = await fetchFunction(`/usuarios/${email}`, {
            method: 'DELETE'
        });
        const data = await response.json();
        console.log('Usuário excluído:', data);
        return data;
    } catch (error) {
        console.error('Erro ao excluir usuário:', error);
        throw error;
    }
}

// Função para buscar usuários
async function getUsers(fetchFunction = fetch) {
    try {
        const response = await fetchFunction('http://localhost:3000/usuarios');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        throw error;
    }
}

// Exportar as funções
export { editUser, deleteUser, getUsers };
