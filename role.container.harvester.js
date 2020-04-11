//////////// Container Harvester Routine //////////////
// To Do List: 1.
//             2.

var _ = require('lodash');

var roleContainerHarvester = {

    /** @param {Creep} creep **/
    run: function(creep, expansionFlag) {

      var sources = creep.room.find(FIND_SOURCES);

      if(sources[0]){var sourceOne = sources[0];}
      if(sources[1]){var sourceTwo = sources[1];}

      var containerOne = sourceOne.pos.findClosestByRange(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_CONTAINER}});
      var containerTwo = sourceTwo.pos.findClosestByRange(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_CONTAINER}});


      // Stay on the position of sources extension position Source One
      if(creep.memory.role == 'containerHarvester_0' && creep.pos != containerOne.pos){
        creep.moveTo(containerOne, {visualizePathStyle: {fill: 'transparent',stroke: '#fff',lineStyle: 'dashed',strokeWidth: .15,opacity: .5}});
      }
      // If on the extension begin Mining
      if(creep.memory.role == 'containerHarvester_0'){
        creep.harvest(creep.pos.findClosestByRange(FIND_SOURCES));
      }

      // Stay on the position of sources extension position Source Two
      if(creep.memory.role == 'containerHarvester_1' && creep.pos != containerTwo.pos){
        creep.moveTo(containerTwo, {visualizePathStyle: {fill: 'transparent',stroke: '#fff',lineStyle: 'dashed',strokeWidth: .15,opacity: .5}});
      }
      // If on the extension begin Mining
      if(creep.memory.role == 'containerHarvester_1'){
        creep.harvest(creep.pos.findClosestByRange(FIND_SOURCES));
      }
    }
};
    module.exports = roleContainerHarvester;
