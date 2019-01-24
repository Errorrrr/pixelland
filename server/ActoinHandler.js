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
        this.returnValue = [];
    }
    /** @description Задаем pressedCases.
    */
    setPressedCases(data){
        this.pressedCases = data;
        }
    /** @description Обрабатываем действия.
    */
    initDo(data, tick){
        this.setPressedCases(data);
        if(this.pressedCases.left){
            this.horizontalMove = -5;
            this.isMove = true;
            this.vector = 'left';
        }else if(this.pressedCases.right){
            this.horizontalMove = 5;
            this.isMove = true;
            this.vector = 'right';
        }else if(this.pressedCases.up){
            this.verticalMove = -5;
            this.isMove = true;
            this.vector = 'up';
        }else if(this.pressedCases.down){
            this.verticalMove = 5;
            this.isMove = true;
            this.vector = 'down';
        }else if(!this.pressedCases.down &&  !this.pressedCases.right && !this.pressedCases.up && !this.pressedCases.left){
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