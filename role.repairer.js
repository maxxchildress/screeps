var roleRepairer = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var needsRepair = null;
        ////////////////////////////
        // Define Sources in room //
        var sources = creep.room.find(FIND_SOURCES);
        var storage = creep.room.storage;
        ////////////////////////////
        //////////////////////
        // Check for towers //
        var towersExist = false;
        var towersSodalitas1 = creep.room.find(FIND_STRUCTURES, { filter: (s) => s.structureType == STRUCTURE_TOWER});
        if(towersSodalitas1.length){towersExist = true;}
        //////////////////////
        ///////////////////////////////////////////////////////////
        // Check for energy on the ground next to the creep      //
        var energy = creep.pos.findInRange(FIND_DROPPED_RESOURCES , 1);
        if(energy[0]){creep.pickup(energy[0]);}
        //////////////////////////////////////////////////////////

        ////////////////////////////////////////////////////////////
        // Look for a container in the room to pull energy from. //
        var pullFromContainer = false;
        var roomContainer = creep.room.find(FIND_STRUCTURES, { filter: { structureType: STRUCTURE_CONTAINER }});
        if(roomContainer[0]) {
            if(roomContainer[0].store[RESOURCE_ENERGY] >= creep.carryCapacity) {
                pullFromContainer = true;
            }
        }
        //////////////////////////////////////////////////////////

        ////////////////////////////////////////
        // Find structures that need repair. //
        var needsSomeRepair = creep.room.find(FIND_STRUCTURES, { filter: object => object.hits < object.hitsMax });
        var needsMildRepair = creep.room.find(FIND_STRUCTURES, { filter: object => object.hits < object.hitsMax / 2 });
        var needsUrgentRepair = creep.room.find(FIND_STRUCTURES, { filter: object => object.hits < object.hitsMax / 3 });
        var needsImmediateRepair = creep.room.find(FIND_STRUCTURES, { filter: object => object.hits < object.hitsMax / 4 });

        if(needsImmediateRepair.length) {needsRepair = needsImmediateRepair[0];}
        else if(needsUrgentRepair.length) {needsRepair = needsUrgentRepair[0];}
        else if(needsMildRepair.length) {needsRepair = needsMildRepair[0];}
        else if(needsSomeRepair.length) {needsRepair = needsSomeRepair[0];}

        ///////////////////////////////////////

        /////////////////////////////////////
        // If energy tank is empty refill it.
        if(creep.carry.energy == 0) {creep.memory.repairing = false;}
        /////////////////////////////////////

        ////////////////////////////////////////////////////////////////////////////////
        // If energy tank is not empty and there are things to repair begin repairing //
        // and there are no towers built yet.                                         //
        if(needsRepair){
            if(creep.carry.energy > 0 && !towersExist) 
                {creep.memory.repairing = true;}
        }
        //////////////////////////////////////////////////////////////////////////////

        ///////////////////////////////
        // Routine for filling tank //
        if(storage && storage.store[RESOURCE_ENERGY] >= creep.carryCapacity && creep.memory.repairing == false && creep.carry.energy == 0){
            if(creep.withdraw(storage, RESOURCE_ENERGY, creep.carryCapacity) == ERR_NOT_IN_RANGE){
                creep.moveTo(storage, {visualizePathStyle: {fill: 'transparent',stroke: '#fff',lineStyle: 'dashed',strokeWidth: .15,opacity: .5}});
            }
        }
        else if(creep.memory.repairing == false && pullFromContainer && creep.carry.energy == 0) {            
            if(creep.withdraw(roomContainer[0], RESOURCE_ENERGY, creep.carryCapacity) == ERR_NOT_IN_RANGE) {
                creep.moveTo(roomContainer[0], {visualizePathStyle: {fill: 'transparent',stroke: '#fff',lineStyle: 'dashed',strokeWidth: .15,opacity: .5}});            
            }
        }
        else if(creep.memory.repairing == false && creep.harvest(sources[0]) == ERR_NOT_IN_RANGE && !pullFromContainer && creep.carry.energy == 0) {
                creep.moveTo(sources[0], {visualizePathStyle: {fill: 'transparent',stroke: '#fff',lineStyle: 'dashed',strokeWidth: .15,opacity: .5}});              
            }
        ///////////////////////////////

        ///////////////////////////
        // Routine for rapairing //
        if(needsRepair && creep.memory.repairing == true) {
            if(creep.repair(needsRepair) == ERR_NOT_IN_RANGE) {
                creep.moveTo(needsRepair, {visualizePathStyle: {fill: 'transparent',stroke: '#fff',lineStyle: 'dashed',strokeWidth: .15,opacity: .5}});
                // creep.room.visual.line(creep.pos, needsRepair[0].pos,{color: 'red', style: 'dashed'});
                creep.room.visual.text("🔧", needsRepair.pos.x, needsRepair.pos.y + .4, {color: 'red', font: 1});
            }
            else {creep.repair(needsRepair); creep.room.visual.text("🔧", needsRepair.pos.x, needsRepair.pos.y + .4, {color: 'red', font: 1});}
        }
        ////////////////////////////

        //////////////////////////////////////////////////////////
        // If towers exist just fill towers and let them repair //
        if(towersExist && creep.memory.repairing == false && creep.carry.energy == creep.carryCapacity) {
            if(creep.transfer(towersSodalitas1[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                creep.moveTo(towersSodalitas1[0], {visualizePathStyle: {fill: 'transparent',stroke: '#fff',lineStyle: 'dashed',strokeWidth: .15,opacity: .5}});
            }
        }
        ///////////////////////////////////////////////////////////
        

        ////////////////////////
        // Routine for idle. //
        if(creep.carry.energy > 0 && !needsRepair) {creep.moveTo(Game.flags.townHall, {visualizePathStyle: {fill: 'transparent',stroke: '#fff',lineStyle: 'dashed',strokeWidth: .15,opacity: .5}});}
        ///////////////////////
    }
};

module.exports = roleRepairer;