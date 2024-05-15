// Função para abrir o card sobreposto com as informações completas do usuário
function openUserCard(nome, email, senha, dataNascimento) {
    const overlay = document.getElementById('overlay');
    const overlayContent = document.getElementById('overlay-content');

    overlayContent.innerHTML = `
        <p><strong>Nome:</strong> ${nome}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Senha:</strong> ${senha}</p>
        <p><strong>Data de Nascimento:</strong> ${dataNascimento}</p>
        <button class="btn" onclick="editUser('${nome}', '${email}', '${senha}', '${dataNascimento}')">Editar</button>
        <button class="btn2" onclick="deleteUser('${email}')">Excluir</button>
        <button class="close-btn" onclick="closeOverlay()">Fechar</button>
    `;

    overlay.style.display = 'flex';
}

// Função para editar um usuário
function editUser(nome, email, senha, dataNascimento) {
    const novoNome = prompt('Digite o novo nome:', nome);
    const novaSenha = prompt('Digite a nova senha:', senha);
    const novaDataNascimento = prompt('Digite a nova data de nascimento:', dataNascimento);

    fetch(`/usuarios/${email}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nome: novoNome,
            senha: novaSenha,
            dataNascimento: novaDataNascimento
        })
    })
        .then(response => response.json())
        .then(data => {
            console.log('Usuário atualizado:', data);
            location.reload();
        })
        .catch(error => console.error('Erro ao atualizar usuário:', error));
}

// Função para excluir um usuário
function deleteUser(email) {
    if (confirm('Tem certeza que deseja excluir este usuário?')) {
        fetch(`/usuarios/${email}`, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(data => {
                console.log('Usuário excluído:', data);
                location.reload();
            })
            .catch(error => console.error('Erro ao excluir usuário:', error));
    }
}

// Função para fechar o overlay
function closeOverlay() {
    const overlay = document.getElementById('overlay');
    overlay.style.display = 'none';
}

fetch('/usuarios')
    .then(response => response.json())
    .then(data => {
        const usuariosDiv = document.getElementById('usuarios');
        data.forEach(usuario => {
            const usuarioDiv = document.createElement('div');
            usuarioDiv.classList.add('card');
            usuarioDiv.innerHTML = `
                <p><strong>Nome:</strong> ${usuario.nome}</p>
                <p><strong>Email:</strong> ${usuario.email}</p>
            `;
            usuarioDiv.addEventListener('click', () => {
                openUserCard(usuario.nome, usuario.email, usuario.senha, usuario.dataNascimento);
            });
            usuariosDiv.appendChild(usuarioDiv);
        });
    })
    .catch(error => console.error('Erro ao buscar usuários:', error));