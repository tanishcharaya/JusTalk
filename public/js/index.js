var socket = io();
socket.on('connect',function(){
		console.log('connected to server');
});
socket.on('disconnect',function(){
	console.log ('Disconnected from Server');
});

socket.on('newMessage',function(message){
	console.log('newMessage',message);
	var li=$('<li></li>');
	li.text(`${message.from}: ${message.text}`);
	$('#messages').append(li);
});

$('#message-form').on('submit',function(e){
	e.preventDefault();
	socket.emit('createMessage',{
		from:'User',
		text:$('[name=message]').val()
	},function(){
		//acknowledgement 
		console.log('This message is from the server');
	});
});