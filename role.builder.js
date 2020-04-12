var roleRepairer = require('role.repairer');

var roleBuilder = {

    /** @param {Creep} creep **/
    // For builders to gather when there is nothing to build you must set
    // a flag called 'townHall' for them to return to.
    run: function(creep, sourceOne, sourceTwo) {
        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
        var sources = creep.room.find(FIND_SOURCES);
        var storage = creep.room.storage;

        if(containerOne != null && containerTwo != null){
          var containerOne = sourceOne.pos.findClosestByRange(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_CONTAINER}});
          var containerTwo = sourceTwo.pos.findClosestByRange(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_CONTAINER}});
        }
        var containerOneEnergy = containerOne.store[RESOURCE_ENERGY];
        var containerTwoEnergy = containerTwo.store[RESOURCE_ENERGY];


        // If there are no more construction sites then set the spawn amount back to zero for builders //
        if(!targets.length){Game.spawns['Spawn1'].memory.builders = 0;}

        // Expansion Builder Variables
        var isInHomeRoom = true;
        if(creep.room != Game.spawns['Spawn1'].room) {isInHomeRoom = false;}
        var isAnExpansionBuilder = false;
        if(creep.memory.role == 'expansionBuilder') {isAnExpansionBuilder = true;}

        ///////////////////////////////////////////////////////////
        // Check for energy on the ground next to the harvester //
        var energy = creep.pos.findInRange(FIND_DROPPED_RESOURCES , 1);
        if(energy[0]){creep.pickup(energy[0]);}
        //////////////////////////////////////////////////////////

        // Check is the builder is at full capacity and switch to build mode
        if(creep.carry.energy == creep.carryCapacity) { creep.memory.building = true; /*console.log(creep.name + ' is full of energy and ready to build.');*/ }
        // Check if the builder has a full energy load if not harvest energy
        if(creep.carry.energy == 0) { creep.memory.building = false; /*console.log(creep.name + ' has no energy and needs to harvest.');*/ }
        // Check if there are no targets if not disable build mode
        if(!targets.length) {creep.memory.building = false; /*console.log(creep.name + ' has nothing to build and should go home.');*/ }

        //////////////////////////////////////////////////
        // If Expansion Builder
        if(isAnExpansionBuilder && isInHomeRoom) {
            creep.moveTo(expansionFlag, {visualizePathStyle: {fill: 'transparent',stroke: '#fff',lineStyle: 'dashed',strokeWidth: .15,opacity: .5}});
            // console.log('Expansion Builder is moving to Room');
        }
        if(creep.memory.building && isAnExpansionBuilder && !isInHomeRoom) {
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {fill: 'transparent',stroke: '#fff',lineStyle: 'dashed',strokeWidth: .15,opacity: .5}});
                    // console.log(creep.name + ' the expansion builder is moving to a construction site: ' + targets[0]);
                }
                else {creep.build(targets[0]);}
            }
        }
        ///////////////////////////////////////////////////

        // If build mode is on find a construction site and move to it / build it
        if(creep.memory.building && creep.memory.role != 'expansionBuilder') {
            if(targets.length) {
                var nearestBuildSite = creep.pos.findClosestByPath(targets);
                if(creep.build(nearestBuildSite) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(nearestBuildSite, {visualizePathStyle: {fill: 'transparent',stroke: '#fff',lineStyle: 'dashed',strokeWidth: .15,opacity: .5}});
                    //console.log(creep.name + ' the builder is building a ' + targets[0]);
                }
                else {creep.build(targets[0]);}
            }
        }
        // If build mode is off and out of energy
            // Try to find storage first for construction
            // Then check for containers
            // Then resort to harvesting
        else if(creep.memory.building == false && creep.carry.energy != creep.carryCapacity) {
            if(containerOne && containerOneEnergy > 0){
              creep.moveTo(containerOne, {visualizePathStyle: {fill: 'transparent',stroke: '#fff',lineStyle: 'dashed',strokeWidth: .15,opacity: .5}});
              creep.withdraw(containerOne, RESOURCE_ENERGY, creep.carryCapacity - creep.carry.energy);
            }
            else if(containerTwo && containerTwoEnergy > 0){
              creep.moveTo(containerTwo, {visualizePathStyle: {fill: 'transparent',stroke: '#fff',lineStyle: 'dashed',strokeWidth: .15,opacity: .5}});
              creep.withdraw(containerTwo, RESOURCE_ENERGY, creep.carryCapacity - creep.carry.energy);
            }
            else if (storage && storage.store[RESOURCE_ENERGY] >= creep.carryCapacity) {
                creep.moveTo(storage, {visualizePathStyle: {fill: 'transparent',stroke: '#fff',lineStyle: 'dashed',strokeWidth: .15,opacity: .5}});
                creep.withdraw(storage, RESOURCE_ENERGY, creep.carryCapacity - creep.carry.energy);
            }
            else if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {fill: 'transparent',stroke: '#fff',lineStyle: 'dashed',strokeWidth: .15,opacity: .5}});
            }
            else if (creep.carry.energy < creep.carryCapacity) {
                creep.harvest(sources[1], {visualizePathStyle: {fill: 'transparent',stroke: '#fff',lineStyle: 'dashed',strokeWidth: .15,opacity: .5}});
            }
            if (creep.carry.energy == creep.carryCapacity) {
                creep.memory.building = true;
            }
        }
        if(creep.carry.energy > 0 && targets.length == 0) {creep.moveTo(Game.flags.townHall, {visualizePathStyle: {fill: 'transparent',stroke: '#fff',lineStyle: 'dashed',strokeWidth: .15,opacity: .5}});}
    }
};

module.exports = roleBuilder;
