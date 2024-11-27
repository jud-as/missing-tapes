import express from 'express'

const app = express()

app.get('/', (request, response) => {
    response.send('Hello World')
})
app.get('/usuario', (request, response) => {
    response.send('Ok GET')
})

app.listen(3000)

/* Rotas
* 1. Tipo / Metodo HTTP
* 2. URL
* 3. Função de callback (request, response)
*/