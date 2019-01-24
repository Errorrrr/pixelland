class ActionHandler{
    /** @description Передвижение.
    */
    constructor(){
        this.data;
        this.tick;
        this.up = false;
        this.down = false;
        this.left = false;
        this.right = false;
        this.action;
        this.actionStage;
        this.isMove;
        this.horizontalMove;
        this.verticalMove;
        this.vector;
        this.returnValue = [5,5,true,'down'];
    }
    /** @description Обработка действий.
    */
    parsingCases(data, tick){
            this.data = data;
            this.tick = tick;
            if (this.data.left) {
                this.action = 'runLeft';
                return this.initDo();
            }
            if (this.data.right) {
                this.action = 'runRight';
                return this.initDo();
            }
            if (this.data.up) {
                this.action = 'runUp';
                return this.initDo();
            }
            if (this.data.down) {
                this.action = 'runDown';
                return this.initDo();
            }

            if(!this.data.down &&  !this.data.right && !this.data.up && !this.data.left ){
                this.action = 'iddle'
                return this.initDo();
            }
        }
    initDo(){
        if(this.action == 'runLeft'){
            this.horizontalMove = -5;
            this.isMove = true;
            this.vector = 'left';
        }else if(this.action == 'runRight'){
            this.horizontalMove = 5;
            this.isMove = true;
            this.vector = 'right';
        }else if(this.action == 'runUp'){
            this.verticalMove = -5;
            this.isMove = true;
            this.vector = 'up';
        }else if(this.action == 'runDown'){
            this.verticalMove = 5;
            this.isMove = true;
            this.vector = 'down';
        }else if(this.action == 'iddle'){
            this.isMove = false;
        }
        this.returnValue['horizontalMove'] = this.horizontalMove;
        this.returnValue['verticalMove'] = this.verticalMove;
        this.returnValue['isMove'] = this.isMove;
        this.returnValue['vector'] = this.vector;
        return this.returnValue;
    }
}

module.exports = ActionHandler;