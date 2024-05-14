const express = require('express');
const mongoose = require('mongoose');
const { body, validationResult } = require('express-validator');
const Usuario = require('./models/Usuario');

const app = express();
const port = 3000;
const uri = "mongodb+srv://Kaique:Nofaka12@cielo.tdczigg.mongodb.net/?retryWrites=true&w=majority&appName=Cielo";

app.use(express.json());
app.use(express.static('public'));

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected!"))
  .catch(err => console.log(err));


app.get('/', (req, res) => {
  res.redirect('/home.html');
});

app.post('/cadastro',
  body('email').isEmail().custom(async (value) => {
    const usuario = await Usuario.findOne({ email: value });
    if (usuario) {
      throw new Error('Este email já está cadastrado');
    }
    return true;
  }),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const novoUsuario = new Usuario({
      nome: req.body.nome,
      email: req.body.email,
      senha: req.body.senha,
      dataNascimento: req.body.dataNascimento
    });

    novoUsuario.save()
      .then(() => {
        res.redirect('/home.html');
      })
      .catch((error) => {
        console.error('Erro ao cadastrar usuário:', error);
        res.status(500).json({ error: 'Erro ao cadastrar usuário' });
      });
  }
);

app.get('/usuarios', async (req, res) => {
  try {
    const usuarios = await Usuario.find({}, { _id: 0 });
    res.json(usuarios);
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
});

app.delete('/usuarios/:email', (req, res) => {
  const email = req.params.email;

  Usuario.findOneAndDelete({ email })
    .then(usuario => {
      if (!usuario) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }
      res.json({ message: 'Usuário excluído com sucesso', usuario });
    })
    .catch(error => {
      console.error('Erro ao excluir usuário:', error);
      res.status(500).json({ error: 'Erro ao excluir usuário' });
    });
});

app.put('/usuarios/:email', async (req, res) => {
  const { email } = req.params;

  try {
    // Encontrar o usuário pelo e-mail fornecido
    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    // Atualizar os campos permitidos (nome, senha, dataNascimento)
    if (req.body.nome) {
      usuario.nome = req.body.nome;
    }

    if (req.body.senha) {
      usuario.senha = req.body.senha;
    }

    if (req.body.dataNascimento) {
      usuario.dataNascimento = req.body.dataNascimento;
    }

    // Salvar as alterações no banco de dados
    await usuario.save();

    // Retornar uma resposta de sucesso
    return res.status(200).json({ message: 'Usuário atualizado com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    return res.status(500).json({ error: 'Erro ao atualizar usuário' });
  }
});






app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
