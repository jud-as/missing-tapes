const mustacheExpress = require('mustache-express');
const express = require('express');
const bodyParser = require('body-parser');
const filmeRoutes = require('./routes/filmeRoutes');
const path = require('path');

let app = express();


// Registrar '.html' como extensão de arquivos de visualização
app.engine('html', mustacheExpress());
app.set('views engine', 'html');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({ extended: true }));

// Servir arquivos estáticos do diretório 'public/images'
app.use('/public/images', express.static(path.join(__dirname, 'public/images')));

app.get('/', (request, response) => {
    response.send('Hello World')
})



app.use('/', filmeRoutes)

app.listen(3000, function () {
    console.log('Server rodando na porta 3000')
})

/* Rotas
* 1. Tipo / Metodo HTTP
* 2. URL
* 3. Função de callback (request, response)
*/