const LivroDao = require('../infra/LivroDao');
//Importa banco de dados criado no arquivo database.js
const db = require('../../config/database')
//faz o modulo retornar uma funcao, que é chamada em custom-express.js passando app

const LivroController = require('../controllers/LivroController');
const livroController = new LivroController();

const Livro = require('../modelos/livro');

module.exports = (app) => {
    const rotasLivro = LivroController.rotas();
   
    app.get(rotasLivro.lista, livroController.lista());

    app.route(rotasLivro.cadastro)
        .get(livroController.formularioCadastro())
        .post(Livro.valicaoes(), livroController.cadastra())
        //Put trata do metodo PUT para edicao
        .put(livroController.edita());

    app.get(rotasLivro.edicao, livroController.formularioEdicao());

    //Como o id do livro é variavel fazemos :id e com isso qualquer variavel depois de livros/ é salva na variavel id
    app.delete(rotasLivro.delecao, livroController.remove());
}