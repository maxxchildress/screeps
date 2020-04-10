//////////// Harvester Routine //////////////
// To Do List: 1. Improve building mode import builder routine?
//             2.

var roleBuilder = require('role.builder');
var roleUpgrader = require('role.upgrader');
var _ = require('lodash');
var links = Game.spawns['Spawn1'].room.find(FIND_STRUCTURES, { filter: (s) => s.structureType == STRUCTURE_LINK});


var roleContainerHarvester = {

    /** @param {Creep} creep **/
    run: function(creep, expansionFlag) {
      sourceOnePos = Game.spawns['Spawn1'].memory.sourceOnePos;
      sourceTwoPos = Game.spawns['Spawn1'].memory.sourceTwoPos;

      // Stay on the position of sources extension position
      if(creep.pos != sourceOnePos){
        creep.moveTo(sourceOnePos, {visualizePathStyle: {fill: 'transparent',stroke: '#fff',lineStyle: 'dashed',strokeWidth: .15,opacity: .5}});
      }

      // If on the extension begin Mining
      if(creep.pos == sourceOnePos){
        creep.harvest(creep.pos.findClosestByRange(FIND_SOURCES));
      }
    }
};
    module.exports = roleContainerHarvester;
