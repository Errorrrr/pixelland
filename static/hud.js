class hudRender{
    /** @description Отрисовка интерфейса.
    */
    constructor(){}
    renderAll(player){
        context.beginPath();
        context.font = "30px Arial";
        context.fillStyle = '#274fc6';
        this.renderHP(player);
        this.renderScore(player);
        context.fill();
    }
    renderHP(player){
        context.fillText("HP: " + player.hp, 25, 25);
    }
    renderScore(player){
        context.fillText("Score: " + player.score, 25, 50);
    }
    renderWinthParam(playerNumber, x, y, player){
        var playerID = 1;
        var y = 25;
        context.beginPath();
        context.fillStyle = '3884ff';
        context.fillText("HP №" + playerNumber + " = " + player.hp, x, y);
        context.fill();
        playerID++;
        y = y + 25;
    }
}