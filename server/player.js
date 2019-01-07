class Player{
    /**
    Характеристики персонажа
    Переменная hp - очки здоровья персонажа
    Переменная stan - время оглушения
    Переменная lastPlayerHit - последний игрок, нанесший урон
    */
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.hp = 100;
        this.stan = 0;
        this.lastPlayerHit = "";
        this.vector = 'down';
        this.ismove = false;
        this.sector_x = Math.floor((x) / 100);
        this.sector_y = Math.floor((y+30) / 60);
        this.speed = 1;
        this.attack = false;
        this.attack_stage = -1;
        this.endOfAttack = 3;
    }
    /**
    Движение по оси y
    */
    vertical_move(y){
      this.y += y * this.speed;
    }
    /**
    Движение по оси x
    */
    horizontal_move(x){
        this.x += x * this.speed;
    }
    /**
    Метод атаки
    */
    attack() {

    }
    /**
    Метод получения урона
    */
    heat(player, pureDamage) {
        player.hp -= pureDamage;
        player.stan = 2;
    }
    /**
    Последний, кто нанёс урон
    */
    lastHitPlayer(player){
        This.lastPlayerHit = player;
    }
}

module.exports = Player;