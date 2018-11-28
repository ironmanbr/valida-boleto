const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const boletoService = require('./services/boleto');

app.use(bodyParser.json());

app.get('/', function(req, res) {
    let data = {
        'name': 'BoletoTest',
        'version': '0.0.1'
    };

    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(data));
});

app.get('/boleto/:digits', function(req, res) {
    let digits = req.params.digits || '';

    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(boletoService(digits)));
});

app.post('/boleto', function(req, res) {
    let digits = req.body.boleto || '';

    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(boletoService(digits)));;
});

app.listen(8000, function() {
    console.log('Servidor rodando na porta 8000.');
});