const { validationResult } = require('express-validator/check');

const LivroDao = require('../infra/LivroDao');
const db = require('../../config/database');

const templates = require('../views/templates');

class LivroController{

    static rotas(){
        return {
            lista: '/livros',
            cadastro: '/livros/form',
            edicao: '/livros/form/:id',
            delecao: '/livros/:id'
        }
    }

    lista(){
        return function(req, resp){
                    console.log('LivroController.lista()');
                    const livroDao = new LivroDao(db);
                    livroDao.lista()
                            .then(livros => {
                                console.log('LivroController.lista() -> livroDao.lista().then()');
                                resp.marko(
                                    //'..' sai da pasta para entrarmos em outra / '.' comeca o caminho da pasta atual
                                    templates.livros.lista,
                                    {
                                        //Trás os resultados da query e joga no marko
                                        livros: livros
                                    }
                                )
                            })
                            .catch(erro => {
                                console.log('LivroController.lista() -> livroDao.lista().catch()');
                                console.log(erro)
                            });
            
                    /*
                    //'all(x, y)' -> x - consulta SQL / y - funcao que roda quando acaba a query
                    db.all('SELECT * FROM livros', function(erro, resultado){
                        //Habilita utilizar arquivos .marko
                        response.marko(
                            //'..' sai da pasta para entrarmos em outra / '.' comeca o caminho da pasta atual
                            require('../views/livros/lista/lista.marko'),
                            {
                                //Trás os resultados da query e joga no marko
                                livros: resultado
                            }
                        );
                    });
                    */
                };
    }

    formularioEdicao(){
        return function(req, resp){
                    const id = req.params.id;
                    const livroDao = new LivroDao(db);
            
                    livroDao.buscaPorId(id)
                        .then(livro =>
                            {
                                console.log("LIVRO: " + livro);
                                resp.marko(
                                    require('../views/livros/form/form.marko'),
                                    { livro: livro }
                                )
                            }
                        )
                        .catch(erro => console.log(erro));
                };
    }

    formularioCadastro(){
        return function(req, resp){
                    resp.marko(require('../views/livros/form/form.marko'), { livro : {} });
                };
    }

    cadastra(){
        return function(req, resp){
                    /*
                    Por padrao o req.body é undefined no Node, logo vamos instalar o doby-parser para nos ajudar nisso
                    1 - npm install body-parser@1.18.3 --save-exact
                    */
                    console.log(req.body);
            
                    const livroDao = new LivroDao(db);
            
                    const erros = validationResult(req);
            
                    if(!erros.isEmpty()){
                        return resp.marko(
                            require('../views/livros/form/form.marko'),
                            {
                                livro: {},
                                errosValidacao: erros.array()
                            }
                        );
                    }
            
                    livroDao.adiciona(req.body)
                            .then(
                                //Responde com um redirecionamento para /livros
                                resp.redirect(LivroController.rotas().lista)
                            )
                            .catch(erro => console.log(erro));
                };
    }

    edita(){
        return function(req, resp){
                    /*
                    Por padrao o req.body é undefined no Node, logo vamos instalar o doby-parser para nos ajudar nisso
                    1 - npm install body-parser@1.18.3 --save-exact
                    */
                    console.log(req.body);
            
                    const livroDao = new LivroDao(db);
            
                    livroDao.atualiza(req.body)
                            .then(
                                //Responde com um redirecionamento para /livros
                                resp.redirect(LivroController.rotas().lista)
                            )
                            .catch(erro => console.log(erro));
                };
    }

    remove(){
        return function(req, resp){
                    //Pegando o id vindo na url
                    const id = req.params.id;
            
                    const livroDao = new LivroDao(db);
                    livroDao.remove(id)
                        .then(() => {
                            //Mando o status 200 ao cliente dizendo que deu tudo certo
                            res.status(200).end()
                        })
                        .catch(erro => console.log(erro));
                };
    }
}

module.exports = LivroController;