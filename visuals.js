var visuals = {

    run: function(creep, icon) { 
        
        //////////////////////////   Text Next To Creeps   //////////////////////////////////////
        var hitpoints = creep.hits;
        var maxHitpoints = creep.hitsMax;
        var lifeSpan = creep.ticksToLive;
        creep.room.visual.text("[" + hitpoints + " / " + maxHitpoints + "] " + lifeSpan + icon, creep.pos.x + 2.5, creep.pos.y + .1, {color: 'white', font: .5, backgroundPadding: '.1'}); 
        // Creep Name on Screen Next to Creep // -> creep.room.visual.text(creep.name + " - " + icon, creep.pos.x + 1.7, creep.pos.y + .1, {color: 'white', font: .5}); 
    	//////////////////////////   Heads Up Display //////////////////////////////////////////

    	// Populations Stats on Top Left Screen Space //
	    var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
	    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
	    var defenders = _.filter(Game.creeps, (creep) => creep.memory.role == 'defender');
	    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
	    var harvesters_0 = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester_0');
	    var harvesters_1 = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester_1');
	    var controllerLevel = Game.spawns['Spawn1'].room.controller.level;
	    var controllerNeeded = Game.spawns['Spawn1'].room.controller.progressTotal;
	    var controllerCurrent = Game.spawns['Spawn1'].room.controller.progress;
	    var containersInRoom = Game.spawns['Spawn1'].room.find(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_CONTAINER}});
	    var numberOfContainers = containersInRoom.length - 1;
	    var thisContainer = containersInRoom[numberOfContainers];
	    var creepSize;
	    /////////////////////////////////////////////////////////////////////////////////////////

	    var energyAvailable = Game.spawns['Spawn1'].room.energyAvailable;
	    var energyCapacity = Game.spawns['Spawn1'].room.energyCapacityAvailable;

	    if(energyAvailable >= 1300){creepSize = "Creep Size: Superior"}
	    else if(energyAvailable >= 800){creepSize = "Creep Size: XXXtra Large"}
	    else if(energyAvailable >= 650){creepSize = "Creep Size: XXtra Large"}
	    else if(energyAvailable >= 550){creepSize = "Creep Size: Xtra Large"}
	    else if(energyAvailable >= 500){creepSize = "Creep Size: Large"}
	    else if(energyAvailable >= 250){creepSize = "Creep Size: Medium"}
	    else{creepSize = "Creep Size: Small"}

	    Game.spawns['Spawn1'].room.visual.text("Repairers: " + repairers.length, 3, 1, {color: 'white', font: .8}); 
	    Game.spawns['Spawn1'].room.visual.text("Defenders: " + defenders.length, 3, 2, {color: 'white', font: .8}); 
	    Game.spawns['Spawn1'].room.visual.text("Upgraders: " + upgraders.length, 3.1, 3, {color: 'white', font: .8}); 
	    Game.spawns['Spawn1'].room.visual.text("Harvesters S0: " + harvesters_0.length, 3.75, 4, {color: 'white', font: .8}); 
	    Game.spawns['Spawn1'].room.visual.text("Harvesters S1: " + harvesters_1.length, 3.75, 5, {color: 'white', font: .8}); 
	    Game.spawns['Spawn1'].room.visual.text('Pop Control: Energy Available: ' + energyAvailable + '/' + energyCapacity + ' - ' + creepSize, 18, 1, {color: 'white', font: .8});
	    Game.spawns['Spawn1'].room.visual.text('Room Controller Progress: ' + controllerCurrent + "/" + controllerNeeded + " - Level: " + controllerLevel, 17, 2, {color: 'white', font: .8});
	    ////////////////////////////////////////////////////////////////////////////////////////

	    ////////////////// Read Out for Containers //////////////////////////
	    for(numberOfContainers; numberOfContainers >= 0; numberOfContainers--) {
	    	
	    	thisContainer = containersInRoom[numberOfContainers];
	    	Game.spawns['Spawn1'].room.visual.text("[" + _.sum(thisContainer.store)  + " / " + thisContainer.storeCapacity + "] ", thisContainer.pos.x+1, thisContainer.pos.y-1, {color: 'yellow', font: .8}); 
	    }
    }
}

module.exports = visuals;