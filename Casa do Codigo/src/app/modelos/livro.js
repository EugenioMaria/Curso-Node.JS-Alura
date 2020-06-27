const {check, validationResult} = require('express-validator/check');

class Livro{


    static valicaoes(){
        return  [
                    check('titulo').isLength({min: 5}).withMessage('O título precisa ter no minímo 5 caracteres'),
                    check('preco').isCurrency().withMessage('O preço precisa ter um valor monetário válido')
                ];
    }
}

module.exports = Livro;