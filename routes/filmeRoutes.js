const express = require('express')
const router = express.Router()

let filmes = []
let nextId = 1 // id do próximo filme a ser adicionado

router.get('/catalogo', (req, res) => {
    res.render('catalogo.html', { filmes: filmes })
})

router.post('/add-filme', (req, res) => {
    const { titulo, genero, ano, meta, imagem} = req.body
    if(titulo && genero && ano && meta && imagem) {
        filmes.push(
            {
                id: nextId++, // Atribui o id e depois incrementa
                titulo: titulo,
                genero: genero,
                ano: ano,
                meta: meta,
                imagem: imagem
            }
        )
    }
    res.redirect('/catalogo')
})

router.post('/delete-filme', (req, res) => {
    const { id } = req.body // recebe id do filme a ser deletado
    filmes = filmes.filter(filme => filme.id !== parseInt(id)) // filtra os filmes que não são o filme a ser deletado
    res.redirect('/catalogo')
})

module.exports = router