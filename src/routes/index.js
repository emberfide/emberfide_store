const collections = require('./collections');
const products = require('./products');
const site = require('./sites');
const categorys = require('./categorys');
const admin = require('./admin');
const cart = require('./cart');
const checkOut = require('./checkOut');

function route(app){
    app.use('/admin', admin);
    app.use('/collections', collections);
    app.use('/products', products);
    app.use('/categorys', categorys);
    app.use('/cart',cart);
    app.use('/', site);
    app.use('/check-out',checkOut);
}

module.exports = route;