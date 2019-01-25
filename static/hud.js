class hudRender{
    /** @description Отрисовка интерфейса.
    */
    constructor(player){
        this.player = player;
    }
    renderAll(){
        context.beginPath();
        context.font = "30px Arial";
        context.fillStyle = '#274fc6';
        this.renderHP();
        this.renderScore();
        context.fill();
    }
    renderHP(){
        context.fillText("HP: " + this.player.hp, 25, 25);
    }
    renderScore(){
        context.fillText("Score: " + this.player.score, 25, 50);
    }
    renderWinthParam(playerNumber, x, y){
        context.beginPath();
        context.fillStyle = '3884ff';
        context.fillText("HP №" + playerNumber + " = " + this.player.hp, x, y);
        context.fill();
    }
}