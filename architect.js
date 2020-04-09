/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('architect');
 * mod.thing == 'a thing'; // true
 */

var architect = {
    run: function(spawn1, room1, energyAvailable) {

        // The First Extension //

        // The base position object is the spawn //
        var sPosition = spawn1.pos;
        var cPosition = Game.spawns['Spawn1'].room.controller.pos;
        const terrain = new Room.Terrain(room1.name);

        // Positions for up to four towers //
        var tPosition1 = new RoomPosition(sPosition.x, sPosition.y+2, room1.name);
        var tPosition2 = new RoomPosition(sPosition.x, sPosition.y-2, room1.name);
        var tPosition3 = new RoomPosition(sPosition.x+2, sPosition.y, room1.name);
        var tPosition4 = new RoomPosition(sPosition.x-2, sPosition.y, room1.name);
        // Positions for up to 16 extensions //
        
        var ePosition1 = new RoomPosition(sPosition.x-1, sPosition.y-1, room1.name);
        var ePosition2 = new RoomPosition(sPosition.x+1, sPosition.y+1, room1.name);
        var ePosition3 = new RoomPosition(sPosition.x-1, sPosition.y+1, room1.name);
        var ePosition4 = new RoomPosition(sPosition.x+1, sPosition.y-1, room1.name);
        var ePosition5 = new RoomPosition(sPosition.x-3, sPosition.y-1, room1.name);
        var ePosition6 = new RoomPosition(sPosition.x+3, sPosition.y-1, room1.name);
        var ePosition7 = new RoomPosition(sPosition.x-3, sPosition.y+1, room1.name);
        var ePosition8 = new RoomPosition(sPosition.x+3, sPosition.y+1, room1.name);
        var ePosition9 = new RoomPosition(sPosition.x-1, sPosition.y+3, room1.name);
        var ePosition10 = new RoomPosition(sPosition.x-1, sPosition.y-3, room1.name);
        var ePosition11 = new RoomPosition(sPosition.x+1, sPosition.y-3, room1.name);
        var ePosition12 = new RoomPosition(sPosition.x+1, sPosition.y+3, room1.name);
        var ePosition13 = new RoomPosition(sPosition.x-1, sPosition.y-5, room1.name);
        var ePosition14 = new RoomPosition(sPosition.x-1, sPosition.y+5, room1.name);
        var ePosition15 = new RoomPosition(sPosition.x+1, sPosition.y-5, room1.name);
        var ePosition16 = new RoomPosition(sPosition.x+1, sPosition.y+5, room1.name);

        // Extention Creation //

        if(room1.controller.level > 1 && terrain.get(ePosition1.x, ePosition1.y) == 0 ||
           terrain.get(ePosition1.x, ePosition1.y) == 2)
            {ePosition1.createConstructionSite(STRUCTURE_EXTENSION);}
        if(room1.controller.level > 1 && terrain.get(ePosition2.x, ePosition2.y) == 0 ||
           terrain.get(ePosition2.x, ePosition2.y) == 2)
           {ePosition2.createConstructionSite(STRUCTURE_EXTENSION);}
        if(room1.controller.level > 1 && terrain.get(ePosition3.x, ePosition3.y) == 0 ||
           terrain.get(ePosition3.x, ePosition3.y) == 2)
           {ePosition3.createConstructionSite(STRUCTURE_EXTENSION);}
        if(room1.controller.level > 1 && terrain.get(ePosition4.x, ePosition4.y) == 0 ||
           terrain.get(ePosition4.x, ePosition4.y) == 2)
           {ePosition4.createConstructionSite(STRUCTURE_EXTENSION);}
        if(room1.controller.level > 1 && terrain.get(ePosition5.x, ePosition5.y) == 0 ||
           terrain.get(ePosition5.x, ePosition5.y) == 2)
           {ePosition5.createConstructionSite(STRUCTURE_EXTENSION);}
        if(room1.controller.level > 2 && terrain.get(ePosition6.x, ePosition6.y) == 0 ||
           terrain.get(ePosition6.x, ePosition6.y) == 2)
           {ePosition6.createConstructionSite(STRUCTURE_EXTENSION);}
        if(room1.controller.level > 2 && terrain.get(ePosition7.x, ePosition7.y) == 0 ||
           terrain.get(ePosition7.x, ePosition7.y) == 2)
           {ePosition7.createConstructionSite(STRUCTURE_EXTENSION);}
        if(room1.controller.level > 2 && terrain.get(ePosition8.x, ePosition8.y) == 0 ||
           terrain.get(ePosition8.x, ePosition8.y) == 2)
           {ePosition8.createConstructionSite(STRUCTURE_EXTENSION);}
        if(room1.controller.level > 2 && terrain.get(ePosition9.x, ePosition9.y) == 0 ||
           terrain.get(ePosition9.x, ePosition9.y) == 2)
           {ePosition9.createConstructionSite(STRUCTURE_EXTENSION);}
        if(room1.controller.level > 2 && terrain.get(ePosition10.x, ePosition10.y) == 0 ||
           terrain.get(ePosition10.x, ePosition10.y) == 2)
           {ePosition10.createConstructionSite(STRUCTURE_EXTENSION);}
        if(room1.controller.level > 2 && terrain.get(ePosition11.x, ePosition11.y) == 0 ||
           terrain.get(ePosition11.x, ePosition11.y) == 2)
           {ePosition11.createConstructionSite(STRUCTURE_EXTENSION);}
        if(room1.controller.level > 2 && terrain.get(ePosition12.x, ePosition12.y) == 0 ||
           terrain.get(ePosition12.x, ePosition12.y) == 2)
           {ePosition12.createConstructionSite(STRUCTURE_EXTENSION);}
        if(room1.controller.level > 2 && terrain.get(ePosition13.x, ePosition13.y) == 0 ||
           terrain.get(ePosition13.x, ePosition13.y) == 2)
           {ePosition13.createConstructionSite(STRUCTURE_EXTENSION);}
        if(room1.controller.level > 2 && terrain.get(ePosition14.x, ePosition14.y) == 0 ||
           terrain.get(ePosition14.x, ePosition14.y) == 2)
           {ePosition14.createConstructionSite(STRUCTURE_EXTENSION);}
        if(room1.controller.level > 2 && terrain.get(ePosition15.x, ePosition15.y) == 0 ||
           terrain.get(ePosition15.x, ePosition15.y) == 2)
           {ePosition15.createConstructionSite(STRUCTURE_EXTENSION);}
        if(room1.controller.level > 2 && terrain.get(ePosition16.x, ePosition16.y) == 0 ||
           terrain.get(ePosition16.x, ePosition16.y) == 2)
           {ePosition16.createConstructionSite(STRUCTURE_EXTENSION);}



        // Tower Creation //
        if(room1.controller.level == 3 && spawn1.memory.towersLvl2 != 1)
        {
          tPosition1.createConstructionSite(STRUCTURE_TOWER);
          // tPosition2.createConstructionSite(STRUCTURE_TOWER);
          // tPosition3.createConstructionSite(STRUCTURE_TOWER);
          // tPosition4.createConstructionSite(STRUCTURE_TOWER);

          spawn1.memory.towersLvl2 = 1;
        }
        // Build Roads Around Extensions

        var extensions = room1.find(
            FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_EXTENSION}});

        for(var i = 0; i < extensions.length; i++){
          room1.createConstructionSite(extensions[i].pos.x+1,extensions[i].pos.y, STRUCTURE_ROAD);
          room1.createConstructionSite(extensions[i].pos.x-1,extensions[i].pos.y, STRUCTURE_ROAD);
          room1.createConstructionSite(extensions[i].pos.x,extensions[i].pos.y+1, STRUCTURE_ROAD);
          room1.createConstructionSite(extensions[i].pos.x,extensions[i].pos.y-1, STRUCTURE_ROAD);
        }
/*
        if(room1.controller.level == 2 && spawn1.memory.extensionRoadsLvl2 != 1)
        {
          room1.createConstructionSite(ePosition1.x+1,ePosition1.y, STRUCTURE_ROAD);
          room1.createConstructionSite(ePosition1.x-1,ePosition1.y, STRUCTURE_ROAD);
          room1.createConstructionSite(ePosition1.x,ePosition1.y+1, STRUCTURE_ROAD);
          room1.createConstructionSite(ePosition1.x,ePosition1.y-1, STRUCTURE_ROAD);

          room1.createConstructionSite(ePosition2.x+1,ePosition2.y, STRUCTURE_ROAD);
          room1.createConstructionSite(ePosition2.x-1,ePosition2.y, STRUCTURE_ROAD);
          room1.createConstructionSite(ePosition2.x,ePosition2.y+1, STRUCTURE_ROAD);
          room1.createConstructionSite(ePosition2.x,ePosition2.y-1, STRUCTURE_ROAD);

          room1.createConstructionSite(ePosition3.x+1,ePosition3.y, STRUCTURE_ROAD);
          room1.createConstructionSite(ePosition3.x-1,ePosition3.y, STRUCTURE_ROAD);
          room1.createConstructionSite(ePosition3.x,ePosition3.y+1, STRUCTURE_ROAD);
          room1.createConstructionSite(ePosition3.x,ePosition3.y-1, STRUCTURE_ROAD);

          room1.createConstructionSite(ePosition4.x+1,ePosition4.y, STRUCTURE_ROAD);
          room1.createConstructionSite(ePosition4.x-1,ePosition4.y, STRUCTURE_ROAD);
          room1.createConstructionSite(ePosition4.x,ePosition4.y+1, STRUCTURE_ROAD);
          room1.createConstructionSite(ePosition4.x,ePosition4.y-1, STRUCTURE_ROAD);

          room1.createConstructionSite(ePosition5.x+1,ePosition5.y, STRUCTURE_ROAD);
          room1.createConstructionSite(ePosition5.x-1,ePosition5.y, STRUCTURE_ROAD);
          room1.createConstructionSite(ePosition5.x,ePosition5.y+1, STRUCTURE_ROAD);
          room1.createConstructionSite(ePosition5.x,ePosition5.y-1, STRUCTURE_ROAD);

          spawn1.memory.extensionRoadsLvl2 = 1;
        }
*/
        // Building Roads from the spawn to the sources in the room
        var sources = spawn1.room.find(FIND_SOURCES);

        if(spawn1.memory.sourceRoads != 1)
        {
          for (var j = 0; j < sources.length; j++)
          {
              var chemin = spawn1.pos.findPathTo(sources[j].pos);
              for (var i = 0; i < chemin.length; i++)
              {
                room1.createConstructionSite(chemin[i].x,chemin[i].y, STRUCTURE_ROAD);
              }
          }
        spawn1.memory.controllerRoads = 1;
        }

        // Build Road to Controller
        if(spawn1.memory.controllerRoads != 1)
        {
              var chemin = spawn1.pos.findPathTo(cPosition);
              for (var i = 0; i < chemin.length; i++)
              {
                room1.createConstructionSite(chemin[i].x,chemin[i].y, STRUCTURE_ROAD);
              }

        spawn1.memory.controllerRoads = 1;
        }


        // Container for Upgrading //
        // Retrieve memory indicating if a container has been built by the controller
        var upgradeContainerExists = spawn1.memory.upgradeContainer;

        // Define an offset site for the container
        if(terrain.get(cPosition.x-1, cPosition.y-1) == 0 ||
          terrain.get(cPosition.x-1, cPosition.y-1) == 2)
          {
          // Check if the memory on the spawn indicates an upgrade container has already been made
          // See if there are any containers in the room at all... why?
          // Make sure the position for the container is valid
          if(upgradeContainerExists != 1)
            {
              cPosition.x = cPosition.x - 1;
              cPosition.y = cPosition.y - 1;
              cPosition.createConstructionSite(STRUCTURE_CONTAINER);
              spawn1.memory.upgradeContainer = 1;
            }

        }
        else if(terrain.get(cPosition.x+1, cPosition.y+1) == 0 ||
           terrain.get(cPosition.x+1, cPosition.y+1) == 2)
        {
          // Check if the memory on the spawn indicates an upgrade container has already been made
          // See if there are any containers in the room at all... why?
          // Make sure the position for the container is valid
          if(upgradeContainerExists != 1)
            {
              cPosition.x = cPosition.x + 1;
              cPosition.y = cPosition.y + 1;
              cPosition.createConstructionSite(STRUCTURE_CONTAINER);
              spawn1.memory.upgradeContainer = 1;
            }

        }
        else {console.log("No Valid Upgrade Container Locations");}

      }
};
module.exports = architect;
