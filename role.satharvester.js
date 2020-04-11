var rolesatHarvester = {

    /** @param {Creep} creep **/
    run: function (creep, expansionFlag) {


        var homeRoomStorage = Game.spawns['Spawn1'].room.storage;
        var roomContainer = Game.spawns['Spawn1'].room.find(FIND_STRUCTURES, { filter: { structureType: STRUCTURE_CONTAINER }});
        var inSatRoom = false;
        var nearest_source = creep.pos.findClosestByRange(FIND_SOURCES);

        /////////////////////////////////////////////
        // Check for extensions that are not full //
        var extensions = Game.spawns['Spawn1'].room.find(FIND_MY_STRUCTURES, { filter: { structureType: STRUCTURE_EXTENSION }});
        var ext = extensions.length - 1;
        for (ext; ext > 0; ext--) {
           if(extensions[ext].energy < 50) {
                break;
            }
        }
        /////////////////////////////////////////////
         
        ///////////////////////////////////////////
        // Look for an empty tower in the array. //
        var towers = Game.spawns['Spawn1'].room.find(FIND_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_TOWER});
        if(towers){
            var twr = towers.length -1;
            for (twr; twr > 0; twr--) {
                if (towers[twr].energy != 1000) {
                    twr = twr;
                    break;
                }
            }
        }
        //////////////////////////////////////////////

        ///////////////////////////////////////////////////////////
        // Check for energy on the ground next to the creep      //
        var energy = creep.pos.findInRange(FIND_DROPPED_RESOURCES , 1);
        if(energy[0]){creep.pickup(energy[0]);}
        //////////////////////////////////////////////////////////

        ///////////////////////////////
        // Move to the expansionFlag //
        if(creep.room != Game.spawns['Spawn1'].room){
        	inSatRoom = true;
        }
        else if(creep.room == Game.spawns['Spawn1'].room && creep.carry.energy <= 0) {
        	creep.moveTo(expansionFlag, {visualizePathStyle: {fill: 'transparent',stroke: '#fff',lineStyle: 'dashed',strokeWidth: .15,opacity: .1}});
        	// console.log(creep.name + 'satHarvester Moving to New room');
        }
        ////////////////////////

        //////////////////////////////////////////
        // If harvester is not at full capacity //
	    if(creep.carry.energy < creep.carryCapacity && inSatRoom) {
            if(creep.harvest(nearest_source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(nearest_source, {visualizePathStyle: {fill: 'transparent',stroke: '#fff',lineStyle: 'dashed',strokeWidth: .15,opacity: .5}});
                // console.log('Trying to Move to nearest Source');
            }
            else {creep.harvest(nearest_source);}
        }

        ////////////////////////////////////////////////////////////
        // If the spawn isn't full fill it up.
        else if(Game.spawns['Spawn1'].energy < 300 && creep.transfer(Game.spawns['Spawn1'], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE && creep.carry.energy > 0) {
            creep.moveTo(Game.spawns['Spawn1'], {visualizePathStyle: {fill: 'transparent',stroke: '#fff',lineStyle: 'dashed',strokeWidth: .15,opacity: .5}});

            if(creep.carry.energy > 0) {
                creep.transfer(Game.spawns['Spawn1'], RESOURCE_ENERGY);
                creep.room.visual.text("🚚+", Game.spawns['Spawn1'].pos.x, Game.spawns['Spawn1'].pos.y, {color: 'white', font: .5});
            }
        }
        /////////////////////////////////
        // Look for extensions to fill //
        else if(extensions.length > 0 && extensions[ext].energy < 50  && creep.carry.energy > 0) {
            if(creep.transfer(extensions[ext], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(extensions[ext], {visualizePathStyle: {fill: 'transparent',stroke: '#fff',lineStyle: 'dashed',strokeWidth: .15,opacity: .5}});
                creep.room.visual.text("🚚+", extensions[ext].pos.x, extensions[ext].pos.y, {color: 'white', font: .5});
            }
            else if(creep.carry.energy > 0) {creep.transfer(extensions[ext], RESOURCE_ENERGY);}
        }
        // Towers
        else if(towers.length && towers[twr].energy < towers[twr].energyCapacity && creep.carry.energy > 0) {
            if(creep.transfer(towers[twr], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(towers[twr], {visualizePathStyle: {fill: 'transparent',stroke: '#fff',lineStyle: 'dashed',strokeWidth: .15,opacity: .5}});
                if(creep.carry.energy > 0) {creep.transfer(towers[0], RESOURCE_ENERGY);}
                if(creep.carry.energy == 0 ) {creep.memory.fullLoad = 0;}
            }
        }

        // Containers
        else if(roomContainer.length && roomContainer[0].store[RESOURCE_ENERGY] < roomContainer[0].storeCapacity && creep.carry.energy > 0)        {
            // console.log('container is not full');
            if(creep.transfer(roomContainer[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(roomContainer[0], {visualizePathStyle: {fill: 'transparent',stroke: '#fff',lineStyle: 'dashed',strokeWidth: .15,opacity: .5}});
                if(creep.carry.energy > 0) {creep.transfer(roomContainer[0], RESOURCE_ENERGY);}
                if(creep.carry.energy == 0) {creep.memory.fullLoad = 0;}

            }
        }

        // If extensions and spawn are full store the energy in storage
        else if(homeRoomStorage && homeRoomStorage.store[RESOURCE_ENERGY] < homeRoomStorage.storeCapacity && creep.carry.energy > 0) {
            creep.moveTo(homeRoomStorage, {visualizePathStyle: {fill: 'transparent',stroke: '#fff',lineStyle: 'dashed',strokeWidth: .15,opacity: .5}});
            if(creep.carry.energy > 0) {
                creep.transfer(homeRoomStorage, RESOURCE_ENERGY);
                creep.room.visual.text("🚚+", homeRoomStorage.pos.x, homeRoomStorage.pos.y, {color: 'white', font: .5});
            }
        }

	}


};
module.exports = rolesatHarvester;
