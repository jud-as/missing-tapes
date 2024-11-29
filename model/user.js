const users = []

// cadastro de usuario
export function registerUser(userData) {
    const { nome, nomeDeUsuario, telefone, email, cpf, senha } = userData

    if (!nome || !nomeDeUsuario || !telefone || !email || !cpf || !senha) {
        return { success: false, message: 'Todos os campos são obrigatórios!' }
    }

    const userExists = users.some(user => user.email === email || user.cpf === cpf || user.nomeDeUsuario === nomeDeUsuario)
    if (userExists) {
        return { success: false, message: 'Usuário já existente' }
    }

    users.push({ nome, nomeDeUsuario, telefone, email, cpf, senha })
    return { success: true, message: 'Usuário registrado com sucesso' }
}

// login
export function loginUser(loginData) {
    const { nomeDeUsuario, senha } = loginData

    if (!nomeDeUsuario || !senha) {
        return { success: false, message: 'Nome de usuário e senha são obrigatórios!' }
    }
    const user = users.find(user => user.nomeDeUsuario === nomeDeUsuario && user.senha === senha)
    if (!user) {
        return { success: false, message: 'Nome de usuário ou senha incorretos' }
    }

    return { success: true, message: 'Login realizado com sucesso' }
}

// logout
export function logoutUser(logoutData) {
    const { nomeDeUsuario } = logoutData

    if (!nomeDeUsuario) {
        return { success: false, message: 'Nome de usuário é obrigatório!' }
    }

    const userIndex = users.findIndex(user => user.nomeDeUsuario === nomeDeUsuario)
    if (userIndex === -1) {
        return { success: false, message: 'Usuário não encontrado' }
    }

    users.splice(userIndex, 1)
    return { success: true, message: 'Logout realizado com sucesso' }
}

// editar
export function editUser(userData) {
    const { nomeDeUsuario, novaSenha } = userData

    if (!nomeDeUsuario || !novaSenha) {
        return { success: false, message: 'Nome de usuário e nova senha são obrigatórios!' }
    }

    const user = users.find(user => user.nomeDeUsuario === nomeDeUsuario)
    if (!user) {
        return { success: false, message: 'Usuário não encontrado' }
    }

    user.senha = novaSenha
    return { success: true, message: 'Usuário editado com sucesso' }
}

// remover
export function removeUser(userData) {
    const { nomeDeUsuario } = userData

    if (!nomeDeUsuario) {
        return { success: false, message: 'Nome de usuário é obrigatório!' }
    }

    const userIndex = users.findIndex(user => user.nomeDeUsuario === nomeDeUsuario)
    if (userIndex === -1) {
        return { success: false, message: 'Usuário não encontrado' }
    }

    users.splice(userIndex, 1)
    return { success: true, message: 'Usuário removido com sucesso' }
}
