var socket = io();

var movement = {
    up: false,
    down: false,
    left: false,
    right: false,
    down: false,
    attack: false,
    mouseX: 0,
    mouseY: 0
};

client_w=document.body.clientWidth;
client_h=document.body.clientHeight;

let render = new Renderer(client_w/2, client_h/2);
let renderHUD = new hudRender();

socket.emit('new player');
setInterval(function() {
    socket.emit('movement', movement);
}, 1000 / 60);

var canvas = document.getElementById('canvas');
canvas.width = client_w;
canvas.height = client_h;
var context = canvas.getContext('2d');

socket.on('load_map', function(map) {
    window.map = map;
});


socket.on('state', function(players, tick) {
    context.clearRect(0, 0, client_w, client_h);
    if(window.map != undefined){// ВПИЛИТЬ ЭТОТ КОСТЫЛЬ В ЗАГРУЗКУ
        render.background( players[socket.id], map);
    }
    var currentUser;
    for (var id in players) {
        var player = players[id];
        if(id == socket.id){
            render.player(currentUser, tick);
            renderHUD.renderHP(currentUser);
        console.log(currentUser);
        }else{
            render.players(player);
        }
    }
        console.log(currentUser);
});
