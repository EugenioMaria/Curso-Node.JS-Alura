const LivroDao = require('../infra/LivroDao');
//Importa banco de dados criado no arquivo database.js
const db = require('../../config/database')
//faz o modulo retornar uma funcao, que é chamada em custom-express.js passando app

const BaseController = require('../controllers/BaseController');
const baseController = new BaseController();

const Livro = require('../modelos/livro');
module.exports = (app) => {
    
    const rotasBase = BaseController.rotas();
    app.get(rotasBase.home, baseController.home());
}