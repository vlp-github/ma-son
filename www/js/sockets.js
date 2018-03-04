var webRoom = "/webRoom";
var socket;

$(document).ready(function(){
	socket = io.connect('https://maison.vlp-server.com:36782');
		
	socket.on('connect', function(){
		socket.emit('init');
	});
	
	socket.on('message', function() {

	});
})

$("#allOn").click(function(){
	socket.emit('piTalk',{'plug':'all','state':'on'}); 
});	

$("#allOff").click(function(){
	socket.emit('piTalk',{'plug':'all','state':'off'}); 
});

$("#p0on").click(function(){
	socket.emit('piTalk',{'plug':'p0','state':'on'}); 
});

$("#p0off").click(function(){
 	socket.emit('piTalk',{'plug':'p0','state':'off'}); 
});

$("#p1on").click(function(){
  	socket.emit('piTalk',{'plug':'p1','state':'on'}); 
});

$("#p1off").click(function(){
  	socket.emit('piTalk',{'plug':'p1','state':'off'}); 
});

$("#p2on").click(function(){
	socket.emit('piTalk',{'plug':'p2','state':'on'}); 
});

$("#p2off").click(function(){
	socket.emit('piTalk',{'plug':'p2','state':'off'}); 
});

$("#p3on").click(function(){
	socket.emit('piTalk',{'plug':'p3','state':'on'}); 
});

$("#p3off").click(function(){
 	socket.emit('piTalk',{'plug':'p3','state':'off'}); 
});

$("#p4on").click(function(){
	socket.emit('piTalk',{'plug':'p4','state':'on'}); 
});

$("#p4off").click(function(){
 	socket.emit('piTalk',{'plug':'p4','state':'off'}); 
});

$("#p5on").click(function(){
	socket.emit('piTalk',{'plug':'p5','state':'on'}); 
});

$("#p5off").click(function(){
	socket.emit('piTalk',{'plug':'p5','state':'off'}); 
});

