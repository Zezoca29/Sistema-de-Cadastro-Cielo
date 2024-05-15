import { editUser, deleteUser, getUsers } from '../public/test.js';
import fetch from 'jest-fetch-mock';

beforeEach(() => {
    fetch.resetMocks(); // Reseta o estado do fetch antes de cada teste
});

describe('Testes das funções', () => {
    test('Teste da função editUser', async () => {
        // Simula a resposta da requisição
        fetch.mockResponseOnce(JSON.stringify({ message: 'Usuário atualizado' }));
        // Chama a função
        await editUser('Nome', 'email@example.com', 'senha', '01/01/2000');
        // Verifica se a função foi chamada com os parâmetros corretos
        expect(fetch).toHaveBeenCalledWith('/usuarios/email@example.com', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome: 'Nome', senha: 'senha', dataNascimento: '01/01/2000' })
        });
    });

    test('Teste da função deleteUser', async () => {
        // Simula a resposta da requisição
        fetch.mockResponseOnce(JSON.stringify({ message: 'Usuário excluído' }));
        // Chama a função
        await deleteUser('email@example.com');
        // Verifica se a função foi chamada com os parâmetros corretos
        expect(fetch).toHaveBeenCalledWith('/usuarios/email@example.com', {
            method: 'DELETE'
        });
    });

    test('Teste da função getUsers', async () => {
        // Simula a resposta da requisição
        fetch.mockResponseOnce(JSON.stringify([{ nome: 'Usuário 1' }, { nome: 'Usuário 2' }]));
        // Chama a função
        const users = await getUsers();
        // Verifica se a função retornou os dados corretos
        expect(users).toEqual([{ nome: 'Usuário 1' }, { nome: 'Usuário 2' }]);
    });
});
