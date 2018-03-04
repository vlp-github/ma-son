var app = require('express')();
var http = require('http');
var fs = require('fs');
var conf = require('./conf.json');
var system = require('./../system.json');
var url = require('url');
var io = require('socket.io')(http);
var sqlite3 = require('sqlite3').verbose();
var cronJob = require('cron').CronJob;
var request = require('request');

var webRoom = "/webRoom";
var ESPRoom = "/ESPRoom";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

var debug = true; 

var httpServer = http.createServer(onRequest).listen(1337, function(){
		if (debug) console.log('Server starts...')
	});

function onRequest(request, response) {
	var pathname = url.parse(request.url).pathname;
	if(pathname=='/') pathname = conf.http.index;
	var extension = pathname.split('.').pop();
	try{
	response.writeHead(200, {'Content-Type': conf.http.mime[extension]});
		try{
		if (debug) console.log(conf.http.www + pathname);
		response.end(fs.readFileSync(conf.http.www + pathname));
		}catch(e){
		response.writeHead(404, {'Content-Type': 'text/html'});
		response.end(fs.readFileSync(conf.http.error['404']));
		}
	}catch (e){
	response.writeHead(404, {'Content-Type': 'text/html'});
	response.end(fs.readFileSync(conf.http.error['404']));
	}
}

var ioSocket = io.listen(httpServer,{ log: false });

var clients = [];

io.sockets.on('connection', function (socket) {

	socket.on('init', function(){
		clients.push(socket);
		socket.join(webRoom);
		if (debug) console.log("New client initialized - ID:" + socket.id);
	});
	
	socket.on('piTalk', function(message){
		var jsonStr = JSON.stringify(message);
		var plug =message.plug;
		var state =message.state;
		request(system.pi.url+plug+'_'+state+'.php', { json: true }, (err, res, body) => {
			if (err) { return console.log(err); }
		});
	});
		
	socket.on('disconnect', function() {
        var index = clients.indexOf(socket);
        if (index != -1) {
            clients.splice(index, 1);
            if (debug) console.info('Client gone - ID:' + socket.id);
        }
    });
    
});

