// Dependencies.
var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');

var app = express();
var server = http.Server(app);
var io = socketIO(server);

app.set('port', 5000);
app.use('/static', express.static(__dirname + '/static'));

// Routing
app.get('/', function(request, response) {
    response.sendFile(path.join(__dirname, 'index.html'));
});

server.listen(5000, function() {
    console.log('Starting server on port 5000');
});

const map = require('./server/start_loc.js');
const player = require('./server/player.js');
const movement = require('./server/movement.js');
var enums = require('./server/enums.js');

var players = {};
var tick = 0;
io.on('connection', function(socket) {
    socket.on('new player', function() {
        players[socket.id] = new player(socket.id, 0, 0);
        io.sockets.emit('state', map);
        io.sockets.sockets[socket.id].emit('load_map', map);
    });
    socket.on('movement', function(data) {
        var player = players[socket.id] || {};
        move = new movement(player, data, tick);
        move.parsingCases();
    });
});

setInterval(function() {
    io.sockets.emit('state', players, tick);
    tick++;
}, 1000 / 60);
