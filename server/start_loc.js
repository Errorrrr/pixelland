/**
 * Created by danil on 10.12.2018.
 */
const settings = require('./map.js');

var sectors = [];


for(var i =0; i<100;i++){
    sectors[i] = [];
    for(var j =0; j<100;j++){
        rand = Math.floor(Math.random() * (3 - 0) + 0);
        sectors[i][j] = settings.newSector(i,j,settings.land['ground_grass'+rand]);
    }
}


var location = settings.newLocation(sectors);

module.exports = {
    location
};