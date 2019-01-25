class Player{
    /** @description Характеристики персонажа.
     * @param {int} hp указывает на количество здоровья у персонажа.
     * @param {int} stan указывает на время оглушения.
     * @param {string} lastPlayerHit указывает на последнего игрока, нанесшего урон персонажу.
     */
    constructor(Socket,x,y, actionHandler){
        this.id = Socket;
        this.actionHandler = actionHandler;
        this.x = x;
        this.y = y;
        this.squadKit = [];
        this.hp = 100;
        this.score = 0;
        this.lastPlayerHit = null;
        this.attackRadius = 100;
        this.sector_x = Math.floor((x) / 100);
        this.sector_y = Math.floor((y+30) / 60);
        this.speed = 1;
        this.damage = 20;
    }

    init(tick, players){
        var actionData = (this.actionHandler.initDo(tick));

        if(actionData['action'] == 'move'){
            this.horizontal_move(actionData['deltax']);
            this.vertical_move(actionData['deltay']);
        }

        if(actionData['action'] == 'attack' && actionData['isDamageAttack'] == true){
            this.doAttack(players);
        }

        this.actionHandler.updateActionStage();

        this.sector_x = Math.floor((this.x) / 100);
        this.sector_y = Math.floor((this.y+30) / 60);
    }

    /** @description Движение по оси y.
     */
    vertical_move(y){
        this.y += y * this.speed;
    }

    /** @description Движение по оси x.
     */
    horizontal_move(x){
        this.x += x * this.speed;
    }

    /** @description Метод атаки.
     */
    doAttack(players) {
        var squadKit = this.getAttackSquad();
        console.log(players)
        for (var id in players) {
            var player = players[id];
            console.log(id != this.id,player.isHeat(squadKit));
            if(id != this.id && player.isHeat(squadKit) == true){
                console.log('havehit');
                player.heat(this, this.damage);
            }
        }
    }

    /** @description Метод получения урона.
     * @param {number} player Сокет игрока, который нанес урон.
     */
    heat(player, pureDamage) {
        this.hp -= pureDamage;
        if(this.hp < 1){
            this.death();
        }
     //   player.stan = 2;
        this.lastPlayerHit = player;
    }

    /** @description Попадает ли player?.
     */
    isHeat(squadKit){
        console.log(squadKit, this.x, this.y);
        if(this.x >= squadKit['x']-(squadKit['sideX']/2) && this.x <= squadKit['x']+(squadKit['sideX']/2) && this.y >= squadKit['y']-(squadKit['sideY']/2) && this.y <= squadKit['y']+(squadKit['sideY']/2)){
            return true;
        }
        return false;
    }
    /** @description Cмерть персонажа.
     */
    death(){
        this.lastPlayerHit.addScore(1);
        //io.sockets.connected[player.id].disconnect(true);
    }
    /** @description Добавление очков.
     */
    addScore(countScore){
        this.score += countScore;
    }
    /** @description Просчет координат и стороны прямоугольника атаки.
     */
    getAttackSquad(){
        var x,y,sideX,sideY;
        if(this.actionHandler.vector == 'up'){
            x = this.x;
            y = this.y - this.attackRadius;
            sideX = 100;
            sideY = 60;
        }
        else if(this.actionHandler.vector == 'down'){
            x = this.x;
            y = this.y + this.attackRadius;
            sideX = 100;
            sideY = 60;
        }
        else if(this.actionHandler.vector == 'left'){
            x = this.x - this.attackRadius;
            y = this.y;
            sideX = 60;
            sideY = 100;
        }
        else if(this.actionHandler.vector == 'right'){
            x = this.x + this.attackRadius;
            y = this.y;
            sideX = 60;
            sideY = 100;
        }
        this.squadKit['x'] = x;
        this.squadKit['y'] = y;
        this.squadKit['sideX'] = sideX;
        this.squadKit['sideY'] = sideY;
        return this.squadKit;
    }
}

module.exports = Player;