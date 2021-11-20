const express = require('express');
const path = require('path');
const handlebars  = require('express-handlebars');
const morgan = require('morgan');
const methodOverride = require('method-override');
const app = express();
const cookieParser = require('cookie-parser');
const port = 3000;
const bodyParser = require('body-parser');

const route = require('./routes');

const db = require('./config/db');

const session = require('express-session');
const MongoDBSession = require('connect-mongodb-session')(session);

const store = new MongoDBSession({
	uri: 'mongodb://localhost:27017/ember_fide_store_dev',
	collection: 'sessions'
})

const handleCart = require('./app/middleware/handleCart');


db.connect();

app.use(cookieParser());
app.use(express.urlencoded());
app.use(express.json());

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.set('json spaces', 1);


// const session = require('express-session'); 
// const MongoStore = require('connect-mongo')(session);

app.use(methodOverride('_method'));

// app.get(function(req,res,next){
// 	req.session.isAuth = true;
// 	next();
// });


app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
	secret: 'keyboard cat',
	saveUninitialized: true, // don't create session until something stored
	resave: false, //don't save session if unmodified
	store: store,
}));

app.engine('hbs', handlebars({
  extname: '.hbs',
  helpers: {
    sum: (a, b) => a+b,
	compare: (a,b) => a == b,
	valueObject: (object) => Object.values(object),
	mutiple: (a,b) =>  {
		return (a*b).toFixed(2);
	},
	totalPrice: (arrayCart) => {
		let totalPrice = 0;
		arrayCart.forEach(item => {
			totalPrice += item.count*item.price.sellPrice;
		})
		return totalPrice;
	},
	checkPriceForShipping: (arrayCart) => {
		let totalPrice = 0;
		arrayCart.forEach(item => {
			totalPrice += item.count*item.price.sellPrice;
		})
		return totalPrice > 99;
	},
	sumPrice: (a, b) => {
		return (parseFloat(a) + parseFloat(b)).toFixed(2);
	}
}
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// app.use(morgan('combined'))

app.use(handleCart);

route(app);




app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})