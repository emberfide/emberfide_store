const express = require('express');
const path = require('path');
const handlebars  = require('express-handlebars');
const morgan = require('morgan');
const methodOverride = require('method-override');
const app = express();
var cookieParser = require('cookie-parser');
const port = 3000;

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
    sum: (a, b) => a+b
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