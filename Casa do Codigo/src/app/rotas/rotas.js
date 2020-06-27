const livroRotas = require('./LivroRotas');
const baseRotas = require('./BaseRotas');

module.exports = (app) => {
    baseRotas(app);
    livroRotas(app);
}