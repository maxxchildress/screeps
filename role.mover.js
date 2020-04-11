//////////// Container Harvester Routine //////////////
// To Do List: 1.
//             2.

var _ = require('lodash');

var roleMover = {

    /** @param {Creep} creep **/
    run: function(creep, expansionFlag) {

      var sources = creep.room.find(FIND_SOURCES);

      if(sources[0]){var sourceOne = sources[0];}
      if(sources[1]){var sourceTwo = sources[1];}

      var containerOne = sourceOne.pos.findClosestByRange(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_CONTAINER}});
      var containerTwo = sourceTwo.pos.findClosestByRange(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_CONTAINER}});

      var controllerContainer = creep.room.controller.pos.findClosestByRange(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_CONTAINER}});
      
      // Possible Energy Destinations //
      // construction targets //
      var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
      // containers //
      var roomContainer = creep.room.find(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_CONTAINER}});
      // closest source //
      var nearest_source = creep.room.find(FIND_SOURCES);
      // home sources //
      var home_source = creep.room.find(FIND_SOURCES);
      // extensions //
      var extensions = Game.spawns['Spawn1'].room.find(FIND_MY_STRUCTURES, { filter: { structureType: STRUCTURE_EXTENSION }});
      // Storage //
      var storage = creep.room.storage;
      // Closest Extension to Creep //
      var closestExtension = creep.pos.findClosestByPath(extensions);
      // Towers //
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

      // Move to Container One
      if(creep.withdraw(containerOne, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE && creep.carry.energy == 0){
        creep.moveTo(containerOne, {visualizePathStyle: {fill: 'transparent',stroke: '#fff',lineStyle: 'dashed',strokeWidth: .15,opacity: .5}});
      }
      // Move to Container Two
      if(creep.withdraw(containerTwo, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE && creep.carry.energy == 0){
        creep.moveTo(containerTwo, {visualizePathStyle: {fill: 'transparent',stroke: '#fff',lineStyle: 'dashed',strokeWidth: .15,opacity: .5}});
      }

      // Spawn
      if (Game.spawns['Spawn1'].energy < 300 && creep.transfer(Game.spawns['Spawn1'], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE && creep.carry.energy > 0) {
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

      else if(closestExtension != null && closestExtension.energy < 50 && creep.carry.energy > 0) {
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

      // Upgrade Container
      else if(controllerContainer.store[RESOURCE_ENERGY] < controllerContainer.storeCapacity && creep.carry.energy > 0)        {
          if(creep.transfer(controllerContainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
              creep.moveTo(controllerContainer, {visualizePathStyle: {fill: 'transparent',stroke: '#fff',lineStyle: 'dashed',strokeWidth: .15,opacity: .5}});
              if(creep.carry.energy > 0) {creep.transfer(controllerContainer, RESOURCE_ENERGY);}
          }
      }

      // Storage
      else if(storage && storage.store[RESOURCE_ENERGY] < storage.storeCapacity && creep.carry.energy > 0)        {
          //console.log('Harvesters are detecting empty storage.');
          if(creep.transfer(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
              creep.moveTo(storage, {visualizePathStyle: {fill: 'transparent',stroke: '#fff',lineStyle: 'dashed',strokeWidth: .15,opacity: .5}});
              if(creep.carry.energy > 0) {creep.transfer(storage, RESOURCE_ENERGY);}
              if(creep.carry.energy == 0) {creep.memory.fullLoad = 0;}
          }
      }












    }
};
    module.exports = roleMover;
