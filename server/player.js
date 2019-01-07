class Player{
    /** @description Характеристики персонажа.
    * @param {int} hp указывает на количество здоровья у персонажа.
    * @param {int} stan указывает на время оглушения.
    * @param {string} lastPlayerHit указывает на последнего игрока, нанесшего урон персонажу.
    */
    constructor(x, y){
        this.x = x;
        this.y = y;
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
    isAttack() {
        var x,y,sideX,sideY;
        getAttackSquad();
        if(player.isHeat(x,y,sideX,sideY) == true){
            player.heat(this, 282);
        }   
    }
    /** @description Метод получения урона.
    * @param {number} player Сокет игрока по которому должен пройти урон.
    */
    heat(player, pureDamage) {
        this.hp -= pureDamage;
        player.stan = 2;
        this.lastPlayerHit = player;
    }
    /** @description Попадает ли player?.
    */
    isHeat(x,y,sideX,sideY){
        if(this.x >= x-(sideX/2) && this.x <= x+(sideX/2) && this.y >= y-(sideY/2) && this.y <= y+(sideY/2)){
            return true;
        }
        eles{
            return false;
        }
    }
    /** @description Просчет координат и стороны прямоугольника атаки.
    */
    getAttackSquad(){
        if(vector == 'up'){
            x = this.x;
            y = this.y + attackRadius;
            sideX = 100;
            sideY = 60;
        }
        else if(vector == 'down'){
            x = this.x;
            y = this.y - attackRadius;
            sideX = 100;
            sideY = 60;
        }
        else if(vector == 'left'){
            x = this.x + attackRadius;
            y = this.y;
            sideX = 60;
            sideY = 100;
        }
        else if(vector == 'right'){
            x = this.x - attackRadius;
            y = this.y;
            sideX = 60;
            sideY = 100;
        }
    }
}

module.exports = Player;