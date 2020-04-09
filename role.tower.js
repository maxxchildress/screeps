var roleTower = {
    run: function() {
        // Home Room Variables

        var room1 = Game.spawns['Spawn1'].room;
        var storage = room1.storage
        var towersSodalitas1 = room1.find(FIND_STRUCTURES, { filter: (s) => s.structureType == STRUCTURE_TOWER});
        var hostilesSodalitas1 = room1.find(FIND_HOSTILE_CREEPS);
        var needsRepair = room1.find(FIND_STRUCTURES, { filter: object => object.hits < object.hitsMax });
        var numberOfTowers = towersSodalitas1.length - 1;
        var defcon = 0;
        needsRepair.sort((a,b) => a.hits - b.hits);
        /*
        console.log('Towers: ' + towersSodalitas1);
        console.log('Needs Repair: ' + needsRepair);
        */

        if(hostilesSodalitas1[0] == undefined){console.log('No Hostiles Detected. Defcon: ' + defcon);}

        else {defcon = hostilesSodalitas1.length;}
        
        // Old Attack Routine
        // if(defcon > 0) {towersSodalitas1[0].attack(hostilesSodalitas1[0]); console.log('Tower Attack: ' + hostilesSodalitas1[0]);}

        if(defcon > 0) {
            for(numberOfTowers; numberOfTowers > 0; numberOfTowers--){
                towersSodalitas1[numberOfTowers].attack(hostilesSodalitas1[0]);
                //console.log('Tower Attack: ' + hostilesSodalitas1[0]);
            }
        }
        else if(defcon <= 0) {
            if(numberOfTowers > 0){
                for(numberOfTowers; numberOfTowers > 0; numberOfTowers--){
                    towersSodalitas1[numberOfTowers].repair(needsRepair[0]);
                    //console.log('Tower trying to repair.');
                }
            }
            else {towersSodalitas1[0].repair(needsRepair[0]);}
        }
    }
}
module.exports = roleTower;