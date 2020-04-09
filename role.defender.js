var init = {

    run: function(creep) {
        // Home Room Variables

        var roomSodalitas1 = Game.spawns['Sodalitas1'].room;
        var defender = creep;
        var hostilesSodalitas1 = roomSodalitas1.find(FIND_HOSTILE_CREEPS);

        if(hostilesSodalitas1.length) {
            defender.moveTo(hostilesSodalitas1[0]);
            defender.attack(hostilesSodalitas1[0]);

            console.log(defender + ' is attacking ' + hostilesSodalitas1[0]);
            if(hostilesSodalitas1[0].owner.username !== 'Source Keeper'){
                defender.moveTo(hostilesSodalitas1[0]);
                defender.attack(hostilesSodalitas1[0]);
            }

        }
        else {defender.moveTo(Game.flags.townHall, {visualizePathStyle: {fill: 'transparent',stroke: '#fff',lineStyle: 'dashed',strokeWidth: .15,opacity: .5}});}

    }
};

module.exports = init;