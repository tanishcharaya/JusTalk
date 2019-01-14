const path = require('path');
const http =  require('http');
const socketIO=require('socket.io');
const express=require('express');
var app=express();
const {generateMessage}=require('./utils/message');
const publicPath=path.join(__dirname,'../public');  
const port=process.env.PORT||3000;  
var server=http.createServer(app);
var io=socketIO(server);
    
app.use(express.static(publicPath));

io.on('connection',	(socket) =>{
	console.log("User Connected"); 
	socket.emit('newMessage',generateMessage('Admin','Welcome to the Chat app'));
	
	socket.broadcast.emit('newMessage',generateMessage('Admin','New User Joined'));
	
	socket.on('createMessage',(message,callback)=>{
		console.log('createMessage',message);
		io.emit('newMessage',generateMessage(message.from,message.text));	
		callback('This is Sent from the Server');
		//socket.broadcast.emit('newMessage',generateMessage(message.from,message.text));
	});

	socket.on('disconnect',()=>{
		console.log('user was disconnected');
	});
});
server.listen(port,()=>{
console.log(`Server is up on ${port}`);
});