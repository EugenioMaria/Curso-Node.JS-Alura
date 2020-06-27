class BaseController{

    static rotas() {
        return {
            home: '/'
        }
    }

    home(){
        return function(req, resp){
                //Manda a resposta para o cliente
                resp.send(`
                    <html>
                        <head>
                            <meta charset="utf-8">
                        </head>
                        <body>
                            <h1>Casa do Código</h1>
                        </body>
                    </html>
                `);
            };
    }
}

module.exports = BaseController;