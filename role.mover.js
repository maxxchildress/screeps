//////////// Container Harvester Routine //////////////
// To Do List: 1.
//             2.

var _ = require('lodash');

var roleMover = {

    /** @param {Creep} creep **/
    run: function(creep, sourceOne, sourceTwo) {

      var role = creep.memory.role;

      var noHarvesters = 0;

      var containerOne = sourceOne.pos.findClosestByRange(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_CONTAINER}});
      var containerTwo = sourceTwo.pos.findClosestByRange(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_CONTAINER}});

      var containerOneEnergy = containerOne.store[RESOURCE_ENERGY];
      var containerTwoEnergy = containerTwo.store[RESOURCE_ENERGY];

      var controllerContainer = creep.room.controller.pos.findClosestByRange(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_CONTAINER}});

      var containerHarvesters_0 = _.filter(Game.creeps, (creep) => creep.memory.role == 'containerHarvester_0');
      var containerHarvesters_1 = _.filter(Game.creeps, (creep) => creep.memory.role == 'containerHarvester_1');

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
      var totalExtensions = Game.spawns['Spawn1'].room.find(FIND_MY_STRUCTURES, { filter: { structureType: STRUCTURE_EXTENSION }});
      // Storage //
      var storage = creep.room.storage;
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

      // Check for actual container harvesters //
      if(containerHarvesters_0 < 1 && containerHarvesters_1 < 1){noHarvesters = 1;}

      ////////Mining Routine //////////
      // Closest Extension to Creep //
      var closestExtension = creep.pos.findClosestByPath(extensions);
      // Move to Container One
      if(creep.withdraw(containerOne, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE && creep.carry.energy == 0 && role == 'containerMovers_0' && containerOneEnergy != 0){
        creep.moveTo(containerOne, {visualizePathStyle: {fill: 'transparent',stroke: '#fff',lineStyle: 'dashed',strokeWidth: .15,opacity: .5}});
      } // If one container is empty move to the other one if it has energy.
      else if(creep.withdraw(containerTwo, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE && creep.carry.energy == 0 && role == 'containerMovers_0' && containerTwoEnergy != 0){
          creep.moveTo(containerTwo, {visualizePathStyle: {fill: 'transparent',stroke: '#fff',lineStyle: 'dashed',strokeWidth: .15,opacity: .5}});
        }
      // Move to Container Two
      if(creep.withdraw(containerTwo, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE && creep.carry.energy == 0 && role == 'containerMovers_1' && containerTwoEnergy != 0){
        creep.moveTo(containerTwo, {visualizePathStyle: {fill: 'transparent',stroke: '#fff',lineStyle: 'dashed',strokeWidth: .15,opacity: .5}});
      } // If one container is empty move to the other one if it has energy.
      else if(creep.withdraw(containerOne, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE && creep.carry.energy == 0 && role == 'containerMovers_1' && containerOneEnergy != 0){
          creep.moveTo(containerOne, {visualizePathStyle: {fill: 'transparent',stroke: '#fff',lineStyle: 'dashed',strokeWidth: .15,opacity: .5}});
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

      // If all extensions are empty and no harvesters exist try to move
      // energy from the storage unit to the extensions and spawn to
      // restart harvester production
      if(storage != null && extensions.length == totalExtensions/2 && noHarvesters == 1){
        // Move to Storage for Mover One
        if(creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE && creep.carry.energy == 0 && role == 'containerMovers_0'){
          creep.moveTo(storage, {visualizePathStyle: {fill: 'transparent',stroke: '#fff',lineStyle: 'dashed',strokeWidth: .15,opacity: .5}});
        }
        // Move to Storage for Mover Two
        if(creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE && creep.carry.energy == 0 && role == 'containerMovers_1'){
          creep.moveTo(storage, {visualizePathStyle: {fill: 'transparent',stroke: '#fff',lineStyle: 'dashed',strokeWidth: .15,opacity: .5}});
        }

      }












    }
};
    module.exports = roleMover;
