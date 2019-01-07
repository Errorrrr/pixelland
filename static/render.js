/**
 * Created by danil on 21.08.2018.
 */
class AnimationPlayer{
    constructor(player,x,y,slide){
        this.player = player;
        this.camera_x = x;
        this.camera_y = y;
        this.slide = slide;
    }
    handler(){
        if(!this.player.ismove){
            this.slide = 0;
        }
        if(this.player.vector == 'down'){
            if(this.player.attack){
                this.attackDown();
            }else{
                this.moveDown();
            }
        }else if(this.player.vector == 'up'){
            this.moveUp();
        }else if(this.player.vector == 'left'){
            this.moveLeft();
        }else if(this.player.vector == 'right'){
            this.moveRight();
        }
    }
    moveUp(){
        var img = document.getElementById("run_up");
        context.drawImage(img, 200*(this.slide % 7), 0, 200, 240, this.camera_x-50, this.camera_y-60, 100, 120);
    }
    moveDown(){
        var img = document.getElementById("run_down");
        context.drawImage(img, 200*(this.slide % 6), 0, 200, 240, this.camera_x-50, this.camera_y-60+7, 100, 120);// ПЛЮСЫ ДЛЯ ОТЦЕНТРИРОВАНИЯ СПРАЙТА
    }
    moveRight(){
        var img = document.getElementById("run_right");
        context.drawImage(img, 200*(this.slide % 7), 0, 200, 240, this.camera_x-41, this.camera_y-50, 83, 100);
    }
    moveLeft(){
        var img = document.getElementById("run_left");
        context.drawImage(img, 200*(this.slide % 7), 0, 200, 240, this.camera_x-40, this.camera_y-49, 81, 98);
    }
    attackDown(){
        var img = document.getElementById("attack_down");
        context.drawImage(img, 100*(this.player.attack_stage+1), 0, 100, 101, this.camera_x-50+2, this.camera_y-60+19, 96, 98);// ПЛЮСЫ ДЛЯ ОТЦЕНТРИРОВАНИЯ СПРАЙТА
    }
}
class Renderer{

    constructor(x, y, real_x = 0, real_y = 0) {
        this.x = x;
        this.y = y;
        this.real_x = real_x;
        this.real_y = real_y;
        this.slide = 0;
    }


    player(player, game_tick){
        this.real_x = player.x;
        this.real_y = player.y;
        context.msImageSmoothingEnabled = false;
        context.imageSmoothingEnabled = false;

        this.checkSlide(game_tick);
        var anim = new AnimationPlayer(player,this.x,this.y,this.slide);//Подумать над логикой слайдов
        anim.handler();
        
        if(player.attack == true){
            var squad = player.getAttackSquad();
            context.rect(squad.x-this.real_x+this.x, squad.y-this.real_y+this.y, squad.sideX, squad.sideY);
            context.fill();
        }
    }

    players(player){
        context.beginPath();
        var plus = 0;
        if(player.hp < 1){
            plus = 100;
        }
        context.arc(player.x-this.real_x+this.x, player.y-this.real_y+this.y, 50+plus, 0, 2 * Math.PI);
        context.fill();
    }

    background(player, map){
        context.msImageSmoothingEnabled = false;
        context.imageSmoothingEnabled = false;
        var down_x = Math.round(Math.max(player.sector_x - (document.body.clientWidth / 200) - 2, 0));
        var up_x = Math.round(Math.min(player.sector_x + (document.body.clientWidth / 200)+2, map.location.sectors.length));
        var  down_y = Math.round(Math.max(player.sector_y - (document.body.clientHeight / 120) - 2, 0));
        var up_y = Math.round(Math.min(player.sector_y + (document.body.clientHeight / 120)+2, map.location.sectors[0].length));
       for(var i = down_x; i<up_x;i++){
            for(var j =down_y; j<up_y;j++){
                var item = map.location.sectors[i][j];
                var img = document.getElementById(item.ground.image_id);
                context.drawImage(img, -this.real_x + +this.x + item.len_x * item.cor_x, -this.real_y +this.y + item.len_y * item.cor_y  - item.ground.fix_y, item.len_x+item.ground.fix_x, item.len_y+item.ground.fix_y);
            }
        }
    }

    checkSlide(tick){
        if(tick % 5 == 0){
            this.slide++;
        }
    }

}
