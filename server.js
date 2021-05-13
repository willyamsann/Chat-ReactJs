const express = require('express');
const path = require('path');

const app = express();
const server = require('http').createServer(app);// protocolo http 
const io = require('socket.io')(server); //protocolo websocket

app.use(express.static(path.join(__dirname,'public'))); //Pasta para arquivos publicos Front

app.set('views', path.join(__dirname,'public')); // definido onde vai fica as view

app.engine('html', require('ejs').renderFile); //configurando a engine para definir como html pois o padrao e ejs

app.use('/', (req,res) => {
    res.render('index.html')
})
//para quando acessa ir direto para o index.html

let messages = [];
io.on('connection', socket =>{
    console.log(`Conectado: ${socket.id}`);

    socket.emit('previusMessage', messages);
    socket.on('sendMessage', data =>{
        messages.push(data);

    socket.broadcast.emit('receivedMessage',data);
    });
});
server.listen(3000) //ouvir a porta 3000
