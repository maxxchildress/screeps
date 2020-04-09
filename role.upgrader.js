var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var myRoom = creep.room;
        var controllerPosition = myRoom.controller.pos;
        var SOURCES = creep.room.find(FIND_SOURCES);
        var links = creep.room.find(FIND_STRUCTURES, { filter: { structureType: STRUCTURE_LINK }});
        var storage = creep.room.storage;
        var CONTRLR = creep.room.controller;
        var CLOSEST_CONTAINER = creep.pos.findClosestByPath(FIND_STRUCTURES, { filter: { structureType: STRUCTURE_CONTAINER }});
        var upgraderEnergyNeed = creep.carryCapacity - creep.carry.energy;
        var mySign = Game.spawns['Spawn1'].memory.mySign = 0;

        ///////////////////////////////////////////////////////////
        // Check for energy on the ground next to the harvester //
        var energy = creep.pos.findInRange(FIND_DROPPED_RESOURCES , 1);
        if(energy[0]){creep.pickup(energy[0]);}
        //////////////////////////////////////////////////////////


        // If energy is out stop upgrading.
        if(creep.memory.upgrading && creep.carry.energy == 0) {creep.memory.upgrading = false;}
        // If energy is full start upgrading.
        if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {creep.memory.upgrading = true;}

        // If upgrade mode is on
        
        if(creep.memory.upgrading) {
            
            // If not in range of controller move towards it.
            if(creep.upgradeController(CONTRLR) == ERR_NOT_IN_RANGE) {
                creep.moveTo(CONTRLR, {visualizePathStyle: {fill: 'transparent',stroke: '#fff',lineStyle: 'dashed',strokeWidth: .15,opacity: .5}});
            }
            else {creep.upgradeController(CONTRLR);}
        }
        // If Upgrading is Off look for energy.
        else {
            if(links.length >= 1 && links[1].energy > 0) {
                if(links[1].energy > 0 && creep.energy != creep.carryCapacity){
                    creep.moveTo(links[1], {visualizePathStyle: {fill: 'transparent',stroke: '#fff',lineStyle: 'dashed',strokeWidth: .15,opacity: .5}});
                    creep.withdraw(links[1], RESOURCE_ENERGY, creep.carryCapacity - creep.carry.energy);
                    // console.log('Move to and Withdraw');
                }
            }
            // Else If there are no containers check for room storage.
            else if (storage && creep.withdraw(storage, RESOURCE_ENERGY, upgraderEnergyNeed) && _.sum(storage.store) >= upgraderEnergyNeed) {
                creep.moveTo(storage, {visualizePathStyle: {fill: 'transparent',stroke: '#fff',lineStyle: 'dashed',strokeWidth: .15,opacity: .5}});
                creep.withdraw(storage, RESOURCE_ENERGY, creep.carryCapacity - creep.carry.energy);
            }
            // If a container exists nearby that has energy.
            else if(CLOSEST_CONTAINER != null && CLOSEST_CONTAINER.store[RESOURCE_ENERGY] > 50) {
                // Move to the container if not in range.
                if(creep.withdraw(CLOSEST_CONTAINER, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(CLOSEST_CONTAINER);
                }   
                // If close enough transfer energy from the container to the creep
                //else {CLOSEST_CONTAINER.transfer(creep, RESOURCE_ENERGY, creep.carryCapacity);}
            }
            
            else if(creep.harvest(SOURCES[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(SOURCES[0], {visualizePathStyle: {fill: 'transparent',stroke: '#fff',lineStyle: 'dashed',strokeWidth: .15,opacity: .5}});
            }

        }
    }
};

module.exports = roleUpgrader;