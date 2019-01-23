class ActionHandler{
    /** @description Передвижение.
    */
    constructor(player, data, tick){
        this.player = player;
        this.data = data;
        this.tick = tick;
        this.up = false;
        this.down = false;
        this.left = false;
        this.right = false;
        this.action;
        this.actionStage;
    }
    /** @description Обработка действий.
    */
    parsingCases(){
        this.player.sector_x = Math.floor((this.player.x) / 100);
        this.player.sector_y = Math.floor((this.player.y+30) / 60);
        if(this.player.attack_stage == this.player.endOfAttack){
            this.player.attack_stage = -1;
            this.player.doAttack(this.players);
            this.player.attack = false;
        }
        if(this.data.attack || this.player.attack_stage != -1){
            this.player.attack = true;
            this.player.ismove = false;
            if(this.tick % 4 == 0){
                this.player.attack_stage = this.player.attack_stage + 1;
            }
        }
        else{
            this.player.attack_stage = -1;
            this.player.attack = false;
            if (this.data.left) {
                this.actionKeyLeft();
            }
            if (this.data.right) {
                this.actionKeyRight();
            }
            if (this.data.up) {
                this.actionKeyUp();
            }
            if (this.data.down) {
                this.actionKeyDown();
            }
        }

        if(!this.data.down &&  !this.data.right && !this.data.up && !this.data.left ){
            this.actionIddle();
        }
    }
    /** @description Движение вверх.
    */
    actionKeyUp(){
        this.player.vertical_move(-5);
        this.player.vector = 'up';
        this.player.ismove = true;
        this.action = 'run'
    }
    /** @description Движение вниз.
    */
    actionKeyDown(){
        this.player.vertical_move(5);
        this.player.vector = 'down';
        this.player.ismove = true;
        this.action = 'run'
    }
    /** @description Движение влево.
    */
    actionKeyLeft(){
        this.player.horizontal_move(-5);
        this.player.vector = 'left';
        this.player.ismove = true;
        this.action = 'run'
    }
    /** @description Движение вправо.
    */
    actionKeyRight(){
        this.player.horizontal_move(5);
        this.player.vector = 'right';
        this.player.ismove = true;
        this.action = 'run'
    }
    /** @description Стояние на месте.
    */
    actionIddle(){
        this.player.ismove = false;
        this.action = 'iddle'
    }
    initDo(){
        
    }
}

module.exports = ActionHandler;