class ActionHandler{
    /** @description Передвижение.
    */
    constructor(){
        this.pressedCases;
        this.action;
        this.actionStage;
        this.isMove;
        this.horizontalMove;
        this.verticalMove;
        this.vector;
    }
    /** @description Задаем pressedCases.
    */
    setPressedCases(data){
        this.pressedCases = data;
        }
    /** @description Обрабатываем действия.
    */
    initDo(tick){
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
        var returnValue = [];
        returnValue['horizontalMove'] = this.horizontalMove;
        returnValue['verticalMove'] = this.verticalMove;
        returnValue['isMove'] = this.isMove;
        returnValue['vector'] = this.vector;
        return returnValue;
    }
}

module.exports = ActionHandler;