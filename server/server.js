const path = require('path');
const http =  require('http');
const socketIO=require('socket.io');
const express=require('express');
var app=express();

const publicPath=path.join(__dirname,'../public');
const port=process.env.PORT||3000;  
var server=http.createServer(app);
var io=socketIO(server);
    
app.use(express.static(publicPath));

io.on('connection',	(socket) =>{
	console.log("User Connected");

	socket.emit('newMessage',{
		from: 'John',
		text:'See you then',
		createAt:123123
	}); 
socket.on('createMessage',(message)=>{
		console.log('createMessage',message);	
	});

	socket.on('disconnect',()=>{
		console.log('user was disconnected');
	});
});
server.listen(port,()=>{
console.log(`Server is up on ${port}`);
});