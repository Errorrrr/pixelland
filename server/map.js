/**
 * Created by danil on 10.12.2018.
 */
class Location{
    constructor(sectors){
        this.sectors = sectors;
    }
    getSector(x,y){
        return this.sectors[x][y];
    }
    getSectors(){
        return this.sectors;
    }
}
class Sector{
    constructor(cor_x, cor_y, ground){
        this.cor_x = cor_x;
        this.cor_y = cor_y;
        this.len_x = 100;
        this.len_y = 60;
        this.ground = ground;
    }
}
class Ground{
    constructor(name, speed, type, can_move, damage_on_enter, image_id,fix_x = 0,fix_y = 0){
        this.name = name;
        this.speed = speed; // 1.0 - макс скорость
        this.type = type;
        this.can_move = can_move;
        this.damage_on_enter = damage_on_enter;
        this.image_id = image_id;
        this.fix_x = fix_x;
        this.fix_y = fix_y;
    }
}
function newSector(cor_x, cor_y, ground){
    return new Sector(cor_x, cor_y, ground);
}
function newLocation(sectors){
    return new Location(sectors);
}
var land = [];
land['ground_grass0'] = new Ground('ground_grass0', 1, 'usually', true, 0, 'grass0',0,3);
land['ground_grass1'] = new Ground('ground_grass1', 0.8, 'usually', true, 0, 'grass1', 0, 6);
land['ground_grass2'] = new Ground('ground_grass2', 0.7, 'usually', true, 0, 'grass2', 2, 16);
module.exports = {
    land,
    newLocation,
    newSector
};