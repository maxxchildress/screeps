//////////// Harvester Routine //////////////
// To Do List: 1. Improve building mode import builder routine?
//             2.

var roleBuilder = require('role.builder');
var roleUpgrader = require('role.upgrader');
var _ = require('lodash');
var links = Game.spawns['Spawn1'].room.find(FIND_STRUCTURES, { filter: (s) => s.structureType == STRUCTURE_LINK});


var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep, expansionFlag) {
        var spawn1 = Game.spawns['Spawn1'];
        var homeRoom = spawn1.room;
        var towerEnergyDifference = 0;

        // construction targets //
        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
        // containers //
        var roomContainer = creep.room.find(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_CONTAINER}});
        // closest source //
        var nearest_source = homeRoom.find(FIND_SOURCES);
        // home sources //
        var home_source = homeRoom.find(FIND_SOURCES);
        // extensions //
        var extensions = Game.spawns['Spawn1'].room.find(FIND_MY_STRUCTURES, { filter: { structureType: STRUCTURE_EXTENSION }});
        // Storage //
        var storage = creep.room.storage;

        ///////////////////////////////////////////////////////////
        // Check for energy on the ground next to the harvester //
        var energy = creep.pos.findInRange(FIND_DROPPED_RESOURCES , 1);
        if(energy[0]){creep.pickup(energy[0]);}
        //////////////////////////////////////////////////////////

        ////////////////////////////
        // Remove Full Containers //
        var cntnrs = roomContainer.length - 1;
        for (cntnrs; cntnrs >= 0; cntnrs--) {
            if(_.sum(roomContainer[cntnrs].store) >= 2000){
                _.pull(roomContainer, roomContainer[cntnrs]);
            }
        }
        //////////////////////////////////////////////////////////////
        // Check for full extensions and remove them from the list. //
        var ext = extensions.length - 1;
        for (ext; ext >= 0; ext--) {
            if(extensions[ext].energy == 50){
                // Remove any extension with 50 energy from the array.
                // console.log('Removing ' + extensions[ext] + 'from extension array');
                _.pull(extensions, extensions[ext]);
            }
        }
        /////////////////////////////////////////////////
        // Find the closest extension that isn't empty //
        if(extensions.length){var closestExtension = creep.pos.findClosestByPath(extensions);}

        if(closestExtension != null){
            if(closestExtension.energy == 50){
                closestExtensions = null;
            }
        }

        ///////////////////////////////////////////
        // Look for an empty tower in the array. //
        var towers = creep.room.find(FIND_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_TOWER});
        if(towers){
            var twr = towers.length -1;
            for (twr; twr > 0; twr--) {
                if (towers[twr].energy != 1000) {
                    twr = twr;
                    towerEnergyDifference = twr.energyCapacity - twr.energy;
                    break;
                }
            }
        }


        // If room is not at capacity we arent building with harvesters
        if (homeRoom.energyAvailable != homeRoom.energyCapacityAvailable) {
            creep.memory.building = false;
        }

        if (creep.carryCapacity == creep.carry.energy) {
            creep.memory.fullLoad = 1;
        }
        if (creep.carry.energy == 0) {
            creep.memory.fullLoad = 0;
        }
        // If harvester emptied his load then harvest another load
        if (creep.carry.energy != creep.carryCapacity && creep.memory.building == false && creep.memory.fullLoad == 0) {
            // Harvester 0 Routine

            if (creep.memory.role == 'harvester_0' && creep.harvest(home_source[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(home_source[0], {visualizePathStyle: {fill: 'transparent',stroke: '#fff',lineStyle: 'dashed',strokeWidth: .15,opacity: .5}});
            }
            else {
                creep.harvest(home_source[0]);
            }
            // Harvester 1 Routine
            if (creep.memory.role == 'harvester_1' && creep.harvest(home_source[1]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(home_source[1], {visualizePathStyle: {fill: 'transparent',stroke: '#fff',lineStyle: 'dashed',strokeWidth: .15,opacity: .5}});
            }
            else {
                creep.harvest(home_source[1]);
            }
            // Harvester 2 Routine
            if (creep.memory.role == 'harvester_2' && creep.harvest(home_source[2]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(home_source[2, {visualizePathStyle: {fill: 'transparent',stroke: '#fff',lineStyle: 'dashed',strokeWidth: .15,opacity: .5}}]);
            }
            else {
                creep.harvest(home_source[2]);
            }
            // Harvester 3 Routine
            if (creep.memory.role == 'harvester_3' && creep.harvest(home_source[3]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(home_source[3], {visualizePathStyle: {fill: 'transparent',stroke: '#fff',lineStyle: 'dashed',strokeWidth: .15,opacity: .5}});
            }
            else {
                creep.harvest(home_source[3], {visualizePathStyle: {fill: 'transparent',stroke: '#fff',lineStyle: 'dashed',strokeWidth: .15,opacity: .5}});
            }
        }

        // Spawn
        else if (creep.memory.role == 'harvester_eR1_0' && creep.memory.fullLoad == 1 && creep.room != Game.spawns['Spawn1'].room) {
            creep.moveTo(Game.spawns['Spawn1'], {visualizePathStyle: {fill: 'transparent',stroke: '#fff',lineStyle: 'dashed',strokeWidth: .15,opacity: .5}});
        }
        else if (Game.spawns['Spawn1'].energy < 300 && creep.transfer(Game.spawns['Spawn1'], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            //console.log('Harvesters are detecting empty spawn.');
            creep.moveTo(Game.spawns['Spawn1'], {visualizePathStyle: {fill: 'transparent',stroke: '#fff',lineStyle: 'dashed',strokeWidth: .15,opacity: .5}});
            if (creep.carry.energy > 0) {
                creep.transfer(Game.spawns['Spawn1'], RESOURCE_ENERGY);
            }
            if (creep.carry.energy == 0) {
                creep.memory.fullLoad = 0;
            }

        }
        // Extensions
        else if(closestExtension != null && closestExtension.energy < 50) {
            //console.log('Harvesters are detecting empty extensions.');
            if (creep.transfer(closestExtension, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(closestExtension, {visualizePathStyle: {fill: 'transparent',stroke: '#fff',lineStyle: 'dashed',strokeWidth: .15,opacity: .5}});
                if (creep.carry.energy == 0) {
                    creep.memory.fullLoad = 0;
                }
            }
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
        else if(roomContainer.length && roomContainer[0].store[RESOURCE_ENERGY] < roomContainer[0].storeCapacity)        {
            //console.log('Harvesters are detecting empty containers.');
            if(creep.transfer(roomContainer[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(roomContainer[0], {visualizePathStyle: {fill: 'transparent',stroke: '#fff',lineStyle: 'dashed',strokeWidth: .15,opacity: .5}});
                if(creep.carry.energy > 0) {creep.transfer(roomContainer[0], RESOURCE_ENERGY);}
                if(creep.carry.energy == 0) {creep.memory.fullLoad = 0;}

            }
        }
        // Storage
        else if(storage && storage.store[RESOURCE_ENERGY] < storage.storeCapacity)        {
            //console.log('Harvesters are detecting empty storage.');
            if(creep.transfer(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(storage, {visualizePathStyle: {fill: 'transparent',stroke: '#fff',lineStyle: 'dashed',strokeWidth: .15,opacity: .5}});
                if(creep.carry.energy > 0) {creep.transfer(storage, RESOURCE_ENERGY);}
                if(creep.carry.energy == 0) {creep.memory.fullLoad = 0;}
            }
        }
        // Begin Constrction Routine
        else if(creep.room.energyAvailable == creep.room.energyCapacityAvailable) {
            // If there ARE construction sites begin constructing
            if(targets.length) {
                roleBuilder.run(creep);
            }
            // else {creep.memory.building = false; roleUpgrader.run(creep);}
        }
        // else {creep.memory.building = false;}

	}


};

module.exports = roleHarvester;
