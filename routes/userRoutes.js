const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const fs = require('fs').promises;

const router = express.Router();

let users = [];

// Configuração do multer para upload de imagens
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images'); // Define o diretório de destino para uploads
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Define o nome do arquivo de upload
    }
});
const upload = multer({ storage: storage }); // Cria uma instância do multer com a config. de armazenamento

// Funções de usuário
function registerUser(userData) {
    const { nome, nomeDeUsuario, telefone, email, cpf, senha } = userData;

    if (!nome || !nomeDeUsuario || !telefone || !email || !cpf || !senha) {
        return { success: false, message: 'Todos os campos são obrigatórios!' };
    }

    const userExists = users.some(user => user.email === email || user.cpf === cpf || user.nomeDeUsuario === nomeDeUsuario);
    if (userExists) {
        return { success: false, message: 'Usuário já existente' };
    }

    users.push({ nome, nomeDeUsuario, telefone, email, cpf, senha });
    return { success: true, message: 'Usuário registrado com sucesso' };
}

function loginUser(loginData) {
    const { nomeDeUsuario, senha } = loginData;

    if (!nomeDeUsuario || !senha) {
        return { success: false, message: 'Nome de usuário e senha são obrigatórios!' };
    }
    const user = users.find(user => user.nomeDeUsuario === nomeDeUsuario && user.senha === senha);
    if (!user) {
        return { success: false, message: 'Nome de usuário ou senha incorretos' };
    }

    return { success: true, message: 'Login realizado com sucesso' };
}

function logoutUser(logoutData) {
    const { nomeDeUsuario } = logoutData;

    if (!nomeDeUsuario) {
        return { success: false, message: 'Nome de usuário é obrigatório!' };
    }

    const userIndex = users.findIndex(user => user.nomeDeUsuario === nomeDeUsuario);
    if (userIndex === -1) {
        return { success: false, message: 'Usuário não encontrado' };
    }

    users.splice(userIndex, 1);
    return { success: true, message: 'Logout realizado com sucesso' };
}

function editUser(userData) {
    const { nomeDeUsuario, novaSenha } = userData;

    if (!nomeDeUsuario || !novaSenha) {
        return { success: false, message: 'Nome de usuário e nova senha são obrigatórios!' };
    }

    const user = users.find(user => user.nomeDeUsuario === nomeDeUsuario);
    if (!user) {
        return { success: false, message: 'Usuário não encontrado' };
    }

    user.senha = novaSenha;
    return { success: true, message: 'Usuário editado com sucesso' };
}

function removeUser(userData) {
    const { nomeDeUsuario } = userData;

    if (!nomeDeUsuario) {
        return { success: false, message: 'Nome de usuário é obrigatório!' };
    }

    const userIndex = users.findIndex(user => user.nomeDeUsuario === nomeDeUsuario);
    if (userIndex === -1) {
        return { success: false, message: 'Usuário não encontrado' };
    }

    users.splice(userIndex, 1);
    return { success: true, message: 'Usuário removido com sucesso' };
}

// Rotas de usuário

//get
router.get('/cadastrar', (req, res) => {
    res.render('cadastrar.html', { users: users })
})

router.get('/login', (req, res) => {
    res.render('login.html', { users: users })
})

router.get('/logout', (req, res) => {
    res.render('logout.html', { users: users })
})

//post
router.post('/registro', upload.single('imagem'), async (req, res) => {
    const { nome, nomeDeUsuario, telefone, email, cpf, senha } = req.body;
    const imagem = req.file ? req.file.path : null;

    if (nome && nomeDeUsuario && telefone && email && cpf && senha) {
        users.push(
            {
                nome: nome,
                nomeDeUsuario: nomeDeUsuario,
                telefone: telefone,
                email: email,
                cpf: cpf,
                senha: senha
            }
        )
    }
    res.redirect('/')
});

router.post('/login', (req, res) => {
    const result = loginUser(req.body);
    res.redirect('/')
});

router.post('/logout', (req, res) => {
    const result = logoutUser(req.body);
    res.redirect('/')
});

router.put('/editar', (req, res) => {
    const result = editUser(req.body);
    if (result.success) {
        res.status(200).json(result.message);
    } else {
        res.status(400).json(result.message);
    }
});

router.delete('/remover', (req, res) => {
    const result = removeUser(req.body);
    if (result.success) {
        res.status(200).json(result.message);
    } else {
        res.status(400).json(result.message);
    }
});

module.exports = router;