class Player{
    /** @description Характеристики персонажа.
    * @param {int} hp указывает на количество здоровья у персонажа.
    * @param {int} stan указывает на время оглушения.
    * @param {string} lastPlayerHit указывает на последнего игрока, нанесшего урон персонажу.
    */
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.SquadKit;
        this.hp = 100;
        this.stan = 0;
        this.lastPlayerHit = null;
        this.attackRadius = 100;
        this.vector = 'down';
        this.ismove = false;
        this.sector_x = Math.floor((x) / 100);
        this.sector_y = Math.floor((y+30) / 60);
        this.speed = 1;
        this.attack = false;
        this.attack_stage = -1;
        this.endOfAttack = 3;
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
        for (var id in players) { 
            var player = players[id];
            if(player.isHeat(squadKit, player) == true){ 
                player.heat(this, 282); 
            }
        }
    }
    /** @description Метод получения урона.
    * @param {number} player Сокет игрока, который нанес урон.
    */
    heat(player, pureDamage) {
        this.hp -= pureDamage;
        player.stan = 2;
        this.lastPlayerHit = player;
    }
    /** @description Попадает ли player?.
    */
    isHeat(SquadKit, PlayerNow){
        console.log(SquadKit);
        console.log(PlayerNow.x,PlayerNow.y);
        if(PlayerNow.x >= SquadKit.x-(SquadKit.sideX/2) && PlayerNow.x <= SquadKit.x+(SquadKit.sideX/2) && PlayerNow.y >= SquadKit.y-(SquadKit.sideY/2) && PlayerNow.y <= SquadKit.y+(SquadKit.sideY/2)){
            return true;
            console.log('hit!');
        }
        console.log('!hit');
        return false; 
    }
    /** @description Просчет координат и стороны прямоугольника атаки.
    */
    getAttackSquad(){
        var x,y,sideX,sideY;
        if(this.vector == 'up'){
            x = this.x;
            y = this.y - this.attackRadius;
            sideX = 100;
            sideY = 60;
        }
        else if(this.vector == 'down'){
            x = this.x;
            y = this.y + this.attackRadius;
            sideX = 100;
            sideY = 60;
        }
        else if(this.vector == 'left'){
            x = this.x - this.attackRadius;
            y = this.y;
            sideX = 60;
            sideY = 100;
        }
        else if(this.vector == 'right'){
            x = this.x + this.attackRadius;
            y = this.y;
            sideX = 60;
            sideY = 100;
        }
        this.SquadKit = [x, y, sideX, sideY];
        return this.SquadKit;
    }
}

module.exports = Player;