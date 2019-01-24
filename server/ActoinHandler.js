class ActionHandler{
    /** @description Передвижение.
     */
    constructor(){
        this.pressedCases;
        this.action = 'idle';
        this.actionStage = 0;
        this.isMove = 'false';
        this.vector = 'up';
    }
    /** @description Задаем pressedCases.
     */
    setPressedCases(data){
        this.pressedCases = data;
    }
    /** @description Обрабатываем действия.
     */
    initDo(tick){
        var actionData = [];
        var predAction = this.action;
        var predVector = this.vector;


        actionData['deltax'] = 0;
        actionData['deltay'] = 0;
        if(this.pressedCases.left){
            actionData['deltax'] = -5;
            actionData['action'] = 'move';
            this.action = 'move';
            this.isMove = true;
            this.vector = 'left';
        }
        if(this.pressedCases.right){
            actionData['deltax'] = 5;
            actionData['action'] = 'move';
            this.action = 'move';
            this.isMove = true;
            this.vector = 'right';
        }
        if(this.pressedCases.up){
            actionData['deltay'] = -5;
            actionData['action'] = 'move';
            this.action = 'move';
            this.isMove = true;
            this.vector = 'up';
        }
        if(this.pressedCases.down){
            actionData['deltay'] = 5;
            actionData['action'] = 'move';
            this.action = 'move';
            this.isMove = true;
            this.vector = 'down';
        }
        if(!this.pressedCases.down &&  !this.pressedCases.right && !this.pressedCases.up && !this.pressedCases.left){
            actionData['action'] = 'idle';
            this.action = 'idle';
            this.isMove = false;
        }


        if(actionData['action'] == predAction && (predAction == 'move' ? predVector == this.vector : true) && this.actionStage < this.getEndOfAction(actionData['action'])){
            this.actionStage += 1;
        }else{
            this.actionStage = 0;
        }
        return actionData;
    }

    getEndOfAction(action){

        if(action == 'move'){
            return 180;
        }
        return 0;
    }
}

module.exports = ActionHandler;