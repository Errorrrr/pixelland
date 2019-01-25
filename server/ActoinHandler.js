class ActionHandler{
    /** @description Передвижение.
     */
    constructor(){
        this.pressedCases;
        this.action = 'idle';
        this.actionStage = 0;
        this.isMove = 'false';
        this.vector = 'up';
        this.predAction = 'idle';
        this.predVector = 'up';
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
        this.predAction = this.action;
        this.predVector = this.vector;

        if(!this.isActionEnd()){
            actionData['action'] = this.action;
            actionData['isDamageAttack'] = this.isDamageAttack();
            return actionData;
        }

        if(this.pressedCases.attack){
            actionData['action'] = 'attack';
            this.action = 'attack';
            this.isMove = false;
            return actionData;
        }
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

        return actionData;
    }

    updateActionStage(){
        if(this.action == this.predAction && (this.predAction == 'move' ? this.predVector == this.vector : true) && this.actionStage < this.getEndOfAction(this.action)){
            this.actionStage += 1;
        }else{
            this.actionStage = 0;
        }
    }

    isActionEnd(){
        if(this.action == 'move' || this.action == 'idle' ){
            return true;
        }
        if(this.actionStage < this.getEndOfAction(this.action)){
            return false;
        }else{
            return true;
        }
    }

    isDamageAttack(){
        if(this.actionStage == 30 || this.actionStage == 40){
            return true;
        }
        return false;
    }

    getEndOfAction(action){
        if(action == 'attack'){
            return 60;
        }
        if(action == 'move'){
            return 180;
        }
        return 0;
    }
}

module.exports = ActionHandler;