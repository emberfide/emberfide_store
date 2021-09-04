const collections = require('./collections');
const products = require('./products');
const site = require('./sites');
const categorys = require('./categorys');
const admin = require('./admin');

function route(app){
    app.use('/admin', admin);
    app.use('/collections', collections);
    app.use('/products', products);
    app.use('/categorys', categorys);
    app.use('/', site);
}

module.exports = route;