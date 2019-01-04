const express = require('express');
const app = express();
const path = require("path");
const expBars = require('express-handlebars');

app.use(express.static(path.join(__dirname, 'public', 'views')));
app.use(express.json())
app.use(express.urlencoded());

app.engine('.hbs', expBars({
    extname: '.hbs',
}));
const base = require('./dataBase/index').getInstance();
base.setModels();

app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'public', 'views'));

const homePage = require('./controllers/homePage');
const getAllUsers = require('./controllers/getAllUsers');
const register = require('./controllers/register');

app.get('/', homePage);
app.get('/users', getAllUsers);
app.post('/register', register)

app.listen(5000)
