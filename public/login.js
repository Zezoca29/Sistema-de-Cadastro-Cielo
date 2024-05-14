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
