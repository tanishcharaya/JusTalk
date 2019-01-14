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
			from:'Admin',
			text: 'Welcome to the group'
		});
		socket.broadcast.emit('newMessage',{
			text:'New User Joined'
		});
	socket.on('createMessage',(message)=>{
		//console.log('createMessage',message);
		// io.emit('newMessage',{
		// 	from: message.from,
		// 	text: message.text,
		// 	createdAt: new Date().getTime()
		// });	

		socket.broadcast.emit('newMessage',{
			from: message.from,
			text: message.text,
			//createdAt: new Date.getTime()
		});
	});

	socket.on('disconnect',()=>{
		console.log('user was disconnected');
	});
});
server.listen(port,()=>{
console.log(`Server is up on ${port}`);
});