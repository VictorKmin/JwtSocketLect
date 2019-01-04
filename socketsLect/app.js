const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require("path");
const expBars = require('express-handlebars');

app.use(express.static(path.join(__dirname, 'public', 'views')));
app.use(express.json())
app.use(express.urlencoded());

app.engine('.hbs', expBars({
    extname: '.hbs',
}));

app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'public', 'views'));


app.get('/', (req, res) => {
    res.render('main')
});

io.on('connection', socket => {
    console.log('User connected');

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });

    socket.on('sendMsg',text => {
        io.emit('msg', text.txt)
    })
});


http.listen(3000, () => {
    console.log('Listen 3000...');
});
