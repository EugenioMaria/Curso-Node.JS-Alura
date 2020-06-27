//Biblioteca para Template
require('marko/node-require').install();
require("marko/express");

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

//Para url/id.variavel (url estatico) vamos tratar diferente
//Assim sempre que usarmos uma url /estatico seremos redirecionamos para essa pasta
app.use('/estatico', express.static('src/app/public'));

/*
Bory Parser é um middleware ->
Middleware é o software de computador que fornece serviços para softwares aplicativos além daqueles disponíveis pelo sistema operacional

Para usa-lo vamos usar o comando .use(bodyParses.urlencoded())
*/
app.use(bodyParser.urlencoded({
    //Isso diz que o body parses esta habilitado a receber objetos complextos em .json
    extended: true
}));

app.use(methodOverride(function(req, res){
    if(req.body && typeof req.body === 'object' && '_method' in req.body){
        var method = req.body._method;
        delete req.body._method;
        return method;
    }
}));

const rotas = require('../app/rotas/rotas');
rotas(app);

app.use(function(req, resp, next){
    return resp.status(404).marko(
        require('../app/views/base/erros/404.marko')
    );
});

app.use(function(erro, req, resp, next){
    return resp.status(500).marko(
        require('../app/views/base/erros/500.marko')
    );
});

//Diz que o modulo vai retornar 'app'
module.exports = app;