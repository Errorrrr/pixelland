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
const Player = require('./server/player.js');

var players = {};
var tick = 0;
io.on('connection', function(socket) {
    socket.on('new player', function() {
        players[socket.id] = new Player(socket.id, 0, 0);
        io.sockets.emit('state', map);
        io.sockets.sockets[socket.id].emit('load_map', map);
    });
    socket.on('movement', function(data) {
        var player = players[socket.id] || {};
        player.sector_x = Math.floor((player.x) / 100);
        player.sector_y = Math.floor((player.y+30) / 60);
        //player.speed = map.location.sectors[player.sector_x][player.sector_y].ground.speed;
        //ПОТОМ РЕАЛИЗОВАТЬ ЭТО ЧЕРЕЗОТЕДЛЬНЫЕ КЛАССЫ ПРОВЕРКИ
        if(player.attack_stage == player.endOfAttack){
            player.attack_stage = -1;
            player.doAttack(players);
            player.attack = false;
        }
        if(data.attack || player.attack_stage != -1){
            player.attack = true;
            player.ismove = false;
            if(tick % 4 == 0){
                player.attack_stage = player.attack_stage + 1;
            }
        }else{
            player.attack_stage = -1;
            player.attack = false;
            if (data.left) {
                player.horizontal_move(-5);
                player.vector = 'left';
                player.ismove = true;
            }
            if (data.right) {
                player.horizontal_move(5);
                player.vector = 'right';
                player.ismove = true;

            }
            if (data.up) {
                player.vertical_move(-5);
                player.vector = 'up';
                player.ismove = true;

            }
            if (data.down) {
                player.vertical_move(5);
                player.vector = 'down';
                player.ismove = true;
            }
        }

        if(!data.down &&  !data.right && !data.up && !data.left ){
            player.ismove = false;
        }
    });
});

setInterval(function() {
    io.sockets.emit('state', players, tick);
    tick++;
}, 1000 / 60);
