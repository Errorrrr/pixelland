class Player{
    /** @description Характеристики персонажа
    * @param {int} hp указывает на количество здоровья у персонажа
    * @param {int} stan указывает на время оглушения
    * @param {string} lastPlayerHit указывает на последнего игрока, нанесшего урон персонажу
    */
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.hp = 100;
        this.stan = 0;
        this.lastPlayerHit = null;
        this.vector = 'down';
        this.ismove = false;
        this.sector_x = Math.floor((x) / 100);
        this.sector_y = Math.floor((y+30) / 60);
        this.speed = 1;
        this.attack = false;
        this.attack_stage = -1;
        this.endOfAttack = 3;
    }
    /** @description Движение по оси y
    */
    vertical_move(y){
        this.y += y * this.speed;
    }
    /** @description Движение по оси x
    */
    horizontal_move(x){
        this.x += x * this.speed;
    }
    /** @description Метод атаки
    */
    isAttack() {

    }
    /** @description Метод получения урона
    * @param {number} player Сокет игрока по которому должен пройти урон.
    */
    Heat(player, pureDamage) {
        player.hp -= pureDamage;
        player.stan = 2;
        this.lastPlayerHit = player;
    }
}

module.exports = Player;