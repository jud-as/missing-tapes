const express = require('express')
const multer = require('multer')
const sharp = require('sharp')
const fs = require('fs')
const {set} = require("express/lib/application");
const router = express.Router()


let filmes = [] // Array de filmes
let nextId = 1 // id do próximo filme a ser adicionado


// Configuração do multer para upload de imagens
const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, 'public/images') // Define o diretório de destino para uploads
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`) // Define o nome do arquivo de upload
    }
})
const upload = multer({ storage: storage }) // Cria uma instância do multer com a config. de armazenamento

router.get('/catalogo', (req, res) => {
    res.render('catalogo.html', { filmes: filmes }) // Renderiza a view catalogo.html com a lista de filmes
})

router.post('/add-filme', upload.single('imagem'), async (req, res) => {
    const { titulo, genero, ano, meta} = req.body // Extrai os dados do corpo da requisição
    const imagem = req.file ? req.file.path : null // Verifica se foi feito upload de uma imagem

    if(titulo && genero && ano && meta && imagem) { // Verifica se todos os campos foram preenchidos
        const resizedImagePath = `public/images/resized/resized-${Date.now()}-${req.file.originalname}`

        // Redimensiona a imagem
        await sharp(imagem)
            .resize(166, 250)
            .toFile(resizedImagePath)

        // Deleta a imagem original após um pequeno atraso
        setTimeout(() => {
            try {
                fs.unlinkSync(imagem);
            } catch (err) {
                console.error(`Erro ao deletar a imagem ${err}`)
            }
        }, 100)

        filmes.push(
            {
                id: nextId++, // Atribui o id e depois incrementa
                titulo: titulo,
                genero: genero,
                ano: ano,
                meta: meta,
                imagem: resizedImagePath
            }
        )
    }
    res.redirect('/catalogo') // Redireciona para a rota /catalogo
})

router.post('/delete-filme', (req, res) => {
    const { id } = req.body // recebe id do filme a ser deletado
    filmes = filmes.filter(filme => filme.id !== parseInt(id)) // filtra os filmes que não são o filme a ser deletado
    res.redirect('/catalogo') // Redireciona para a rota /catalogo
})

module.exports = router // Exporta o router para ser utilizado em outros arquivos