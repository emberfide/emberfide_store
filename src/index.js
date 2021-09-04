const express = require('express')
const path = require('path')
const handlebars  = require('express-handlebars')
const morgan = require('morgan')
const app = express()
const port = 3000

const route = require('./routes');

const db = require('./config/db')

db.connect();


app.use(express.urlencoded());
app.use(express.json());


app.use(express.static(path.join(__dirname, 'public')))

app.engine('hbs', handlebars({
  extname: '.hbs'
}))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'resources', 'views'));

// app.use(morgan('combined'))

route(app);



app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})