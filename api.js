const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const port = 3000;

const apiKey = 'e23dc836e9b24c519b16db3b708edca2';
const apiUrl = 'https://newsapi.org/v2/top-headlines';
const country = 'br'; // Altere conforme necessário

// Configuração do EJS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    axios.get(apiUrl, {
        params: {
            country: country,
            apiKey: apiKey
        }
    })
        .then(response => {
            // Passar os artigos para a página e renderizá-la
            res.render('index', { articles: response.data.articles });
        })
        .catch(error => {
            // Lidar com erros
            console.error('Erro ao obter notícias:', error);
            res.send('Erro ao obter notícias. Por favor, tente novamente mais tarde.');
        });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

