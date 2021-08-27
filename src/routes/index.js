
const products = require('./products');
const site = require('./sites');
const categorys = require('./categorys');

function route(app){
    app.use('/products', products);
    app.use('/categorys', categorys);
    app.use('/', site);
}

module.exports = route;