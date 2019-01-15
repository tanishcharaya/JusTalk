var socket = io();
socket.on('connect',function(){
		console.log('connected to server');
});
socket.on('disconnect',function(){
	console.log ('Disconnected from Server');
});

socket.on('newMessage',function(message){
	var formattedTime=moment(message.createdAt).format('h:mm a');
	console.log('newMessage',message);
	var li=$('<li></li>');
	li.text(`${message.from} ${formattedTime}: ${message.text}`);
	$('#messages').append(li);
});

socket.on('newLocationMessage',function(message){
	var formattedTimeLocation=moment(message.createdAt).format('h:mm a');
	var li=$('<li></li>');
	var a =$('<a target="_blank">My Current Locatin</a>');
	li.text(`${message.from} ${formattedTimeLocation}:`);
	a.attr('href',message.url);
	li.append(a);
	$('#messages').append(li);
});
$('#message-form').on('submit',function(e){
	e.preventDefault();
	socket.emit('createMessage',{
		from:'User',
		text:$('[name=message]').val()
	},function(){
		$('[name=message]').val('');
	});
});

var locationButton=$('#send-location');
locationButton.on('click',function(){
	if(!navigator.geolocation){
		return alert('Geolocatin not supported by your browser');
	} 
	locationButton.attr('disabled','disabled').text('Sending Location...');
	navigator.geolocation.getCurrentPosition(function(position){
		locationButton.removeAttr('disabled').text('Send Locaton');
		socket.emit('createLocationMessage',{
			latitude: position.coords.latitude,
			longitude: position.coords.longitude
		});
	},function(){
		locationButton.removeAttr('disabled').text('Send Locaton');
		alert('Cannot fetch the geolocation')
	});
});