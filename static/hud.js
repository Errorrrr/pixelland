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
        context.beginPath();
        context.fillStyle = '3884ff';
        context.fillText("HP №" + playerNumber + " = " + player.hp, x, y);
        context.fill();
    }
    //Дикие костыли, которые пофиксятся потом или выпилятся сто процентов при релизе из-за ненадобности.
    renderAtackSquad(x, y, player){
        context.strokeRect(x+player.attackRadius, y-player.widthAttack/2, player.heightAttack, player.widthAttack);
        context.strokeRect(x-player.attackRadius-player.heightAttack, y-player.widthAttack/2, player.heightAttack, player.widthAttack);
        context.strokeRect(x-player.widthAttack/2, y+player.attackRadius, player.widthAttack, player.heightAttack);
        context.strokeRect(x-player.widthAttack/2, y-player.attackRadius-player.heightAttack, player.widthAttack, player.heightAttack);
        context.fill();
    }
}