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
                this.action = 'runLeft';
            }
            if (this.data.right) {
                this.action = 'runRight';
            }
            if (this.data.up) {
                this.action = 'runUp';
            }
            if (this.data.down) {
                this.action = 'runDown';
            }
        }

        if(!this.data.down &&  !this.data.right && !this.data.up && !this.data.left ){
            this.action = 'iddle'
        }
        this.initDo();
    }
    /** @description Движение влево.
    */
    actionKeyLeft(){
        this.player.horizontal_move(-5);
        this.player.vector = 'left';
        this.player.ismove = true;
        console.log(this.action);
    }
    /** @description Движение вправо.
    */
    actionKeyRight(){
        this.player.horizontal_move(5);
        this.player.vector = 'right';
        this.player.ismove = true;
        console.log(this.action);
    }
    /** @description Движение вверх.
    */
    actionKeyUp(){
        this.player.vertical_move(-5);
        this.player.vector = 'up';
        this.player.ismove = true;
        console.log(this.action);
    }
    /** @description Движение вниз.
    */
    actionKeyDown(){
        this.player.vertical_move(5);
        this.player.vector = 'down';
        this.player.ismove = true;
        console.log(this.action);
    }
    /** @description Стояние на месте.
    */
    actionIddle(){
        this.player.ismove = false;
        console.log(this.action);
    }
    initDo(){
        if(this.action = 'runLeft'){
            this.actionKeyLeft();
        }else if(this.action = 'runRight'){
            this.actionKeyRight();
        }else if(this.action = 'runUp'){
            this.actionKeyUp();
        }else if(this.action = 'runDown'){
            this.actionKeyDown();
        }else if(this.action = 'iddle'){
            this.actionIddle();
        }
    }
}

module.exports = ActionHandler;