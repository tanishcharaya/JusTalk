var socket = io();
socket.on('connect',function(){
		console.log('connected to server');
});
socket.on('disconnect',function(){
	console.log ('Disconnected from Server');
});

socket.on('newMessage',function(message){
	console.log('newMessage',message);
});