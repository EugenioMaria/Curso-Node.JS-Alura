/*
Configurando o server:
1 - Abrir cmd na pasta do server
2 - npm init -> npm é o gerenciador de pacotes do node, init transforma o projeto em node
    a - Devemos colocar os dados, nome do package, versao, etc... Assim como entry point, que é o arquivo a ser aberto ao iniciar o server
3 - Será criado um arquivo .json chamado package que define o projeto como node, ele tem as informações digitadas no npm init
4 - npm install express@4.16.3 --save-exact -> Instalando express, que é um framework para node, @4.16.3 é a versão e '--save-exact' diz que
    express é uma dependencia da minha aplicacao
5 - o package.json lista as dependencias, e agora express é uma dependencia, entao se for preciso baixar novamente o express é so dar o comando
    'npm install', e ele atualizara as dependencias. Isso é bom pois o express se baseia no sistema operacional utilizado, logo nao se deve mandar
    a pasta node_modules junto com o projeto, e sim a pessoa que recebe deve executar o comando 'npm install' antes de comecar a trabalhar
*/

/*
Nomemon -> Faz o server atualizar no momento que salvo o codigo, para nao ter que resetar o server toda vez

1 - npm install nodemon@1.18.4 --save-exact --save-dev -> Indica que é uma dependencia para desenvolvimento, mas nao para rodar
2 - Para usar é necessario rodas o server com o comando nodemon server.js
*/

const app = require('./src/config/custom-express');

//Define a porta de execucao e a funcao que sera executada quando o servidor iniciar
app.listen(3000, function(){
    console.log('Servidor na porta 3000');
});



/*O codigo abaixo a o jeito sem usar o modulo express, o modulo express facilita a criacao do servidor

//'require' é basicamente import de biblioteca, ele requisita o modulo http, que é um arquivo js
const http = require('http');
//Cria o server e devolve algo quando receber uma requisicao
const servidor = http.createServer(function(request, response){

    var html = `123`;

    //retorna a url requisitada
    if(request.url == '/'){
        //end manda uma resposta ao cliente
        html = `
            <html>
                <head>
                    <meta charset="utf-8">
                </head>
                <body>
                    <h1>Casa do Código</h1>
                </body>
            </html>
        `;
    }
    else if(request.url == '/livros'){
        html = `
            <html>
                <head>
                    <meta charset="utf-8">
                </head>
                <body>
                    <h1>Listagem de Livros</h1>
                </body>
            </html>
        `;
    }
    response.end(html);
});
//Passa a porta que deve ser usada para executar o servidor
servidor.listen(3000);
*/