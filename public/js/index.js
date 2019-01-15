var socket = io();

function scrollToBottom(){
	var messages=$('#messages');
	var newMessage=messages.children('li:last-child');
	var clientHeight=messages.prop('clientHeight');
	var scrollTop=messages.prop('scrollTop');
	var scrollHeight=messages.prop('scrollHeight');
	var newMessageHeight=newMessage.innerHeight();
	var lastMessageHeight=newMessage.prev().innerHeight();
	if(clientHeight+scrollTop+lastMessageHeight+newMessageHeight>=scrollHeight)
	{
		messages.scrollTop(scrollHeight);
	}
}
socket.on('connect',function(){
		console.log('connected to server');
});
socket.on('disconnect',function(){
	console.log ('Disconnected from Server');
});

socket.on('newMessage',function(message){
	var formattedTime=moment(message.createdAt).format('h:mm a');
	var template=$('#message-template').html();
	var html= Mustache.render(template,{
		from: message.from,
		text: message.text,
		createdAt:formattedTime
	});
	$('#messages').append(html);
	scrollToBottom();
});

socket.on('newLocationMessage',function(message){
	var formattedTimeLocation=moment(message.createdAt).format('h:mm a');
	var template=$('#location-message-template').html();
	var html=Mustache.render(template,{
		from: message.from,
		url: message.url,
		createdAt:formattedTimeLocation

	});
	$('#messages').append(html);
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