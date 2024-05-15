function validarFormulario() {
    var nome = document.getElementById('nome').value;
    var email = document.getElementById('email').value;
    var senha = document.getElementById('senha').value;
    var dataNascimento = document.getElementById('dataNascimento').value;
    var confirmarSenha = document.getElementById('confirmarSenha').value;

    if (nome === '' || email === '' || senha === '' || dataNascimento === '' || confirmarSenha === '') {
        alert('Todos os campos devem ser preenchidos');
        return false;
    }

    if (senha !== confirmarSenha) {
        alert('As senhas não coincidem');
        return false;
    }

    // Verifica se a senha tem pelo menos 8 caracteres e um caractere especial
    if (senha.length < 8 || !/[!@#$%^&*(),.?":{}|<>]/.test(senha)) {
        alert('A senha deve ter pelo menos 8 caracteres e um caractere especial');
        return false;
    }

    enviarDados(nome, email, senha, dataNascimento);

    return true;
}

async function enviarDados(nome, email, senha, dataNascimento) {
    try {
        var response = await fetch('http://localhost:3000/cadastro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome, email, senha, dataNascimento })
        });

        if (response.ok) {
            alert('Usuário cadastrado com sucesso');
        } else {
            alert('Erro ao cadastrar usuário');
        }
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        alert('Erro ao cadastrar usuário');
    }
}

function mostrarSenha() {
    var senhaInput = document.getElementById("senha");
    if (senhaInput.type === "password") {
        senhaInput.type = "text";
    } else {
        senhaInput.type = "password";
    }
}

// Adicione um event listener para o evento de submit do formulário
document.getElementById("formulario").addEventListener("submit", function (event) {
    event.preventDefault();
    validarFormulario();
});

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

    