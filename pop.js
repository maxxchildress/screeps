/////////// Population Control //////////////
// To Do:
//        Add defenders
//
//
//
// To Set Desired Populations Use In The Console
//
// Game.spawns['Spawn1'].memory.harvesters_1 = 4;
// with builders,upgraders,defenders,harvesters_0,harvesters_eR1_0 and repairers being other options

var pop = {




    run: function(spawn, targetRoom, energyAvailable) {
        var controllerLevel = Game.spawns['Spawn1'].room.controller.level;
	    var controllerNeeded = Game.spawns['Spawn1'].room.controller.progressTotal;
	    var controllerCurrent = Game.spawns['Spawn1'].room.controller.progress;

        console.log('**************| ' + spawn.name + ' /  Room Controller Progress: ' + controllerCurrent + ' / ' + controllerNeeded + ' - Level: ' + controllerLevel + ' |***************');

        // VARIABLES //

        // create unique numbered names for creeps //
        var creepName = spawn.memory.creepName + 1;
        console.log('CreepName = ' + creepName);
        if(creepName >= 9999){spawn.memory.creepName = 0;}
        /////////////////////////////////////////////





        var numberOfSources = targetRoom.find(FIND_SOURCES).length;

        var desiredClaimers = 0;
        var desiredExpansionBuilders = 0;

        var containerMining = Game.spawns['Spawn1'].memory.containerMining;

        var desiredeR1harvesters_0 = spawn.memory.harvesters_eR1_0;
        var desiredeR2harvesters_0 = spawn.memory.harvesters_eR2_0;
        var desiredeR3harvesters_0 = spawn.memory.harvesters_eR3_0;
        var desiredharvesters_3 = spawn.memory.harvesters_3;
        var desiredharvesters_2 = spawn.memory.harvesters_2;
        var desiredharvesters_1 = spawn.memory.harvesters_1;
        var desiredharvesters_0 = spawn.memory.harvesters_0;

        var desiredLinkers = spawn.memory.linkers;
        var desiredBuilders = spawn.memory.builders;
        var desiredRepairers = spawn.memory.repairers;
        var desiredUpgraders = spawn.memory.upgraders;
        var desiredDefenders = spawn.memory.defenders;

        var harvesters_eR1_0 = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester_eR1_0');
        var harvesters_eR2_0 = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester_eR2_0');
        var harvesters_eR3_0 = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester_eR3_0');
        var harvesters_3 = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester_3');
        var harvesters_2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester_2');
        var harvesters_1 = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester_1');
        var harvesters_0 = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester_0');

        var linkers = _.filter(Game.creeps, (creep) => creep.memory.role == 'linker');
        var defenders = _.filter(Game.creeps, (creep) => creep.memory.role == 'defender');
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        var ext = upgraders.length - 1;

        console.log(spawn.name + ' and ' + targetRoom);

        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
        var claimers = _.filter(Game.creeps, (creep) => creep.memory.role == 'claimer');
        var expansionBuilders = _.filter(Game.creeps, (creep) => creep.memory.role == 'expansionBuilder');

        var harvestersFirst = false;
        if(harvesters_0.length !=  desiredharvesters_0 && harvesters_1.length !=  desiredharvesters_1){var harvestersFirst = true; console.log('Harvesters First!');}
        //////////////////////

        // Worker Loadouts //
        var containerMiner = [WORK,WORK,WORK,WORK,WORK,MOVE,MOVE];
        var linkerLoadout = [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE];
        var smallCreep = [WORK,CARRY,MOVE];
        var mediumCreep = [WORK,CARRY,MOVE,MOVE];
        var largeCreep = [WORK,WORK,CARRY,MOVE,MOVE,MOVE];
        var xlargeCreep = [WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE];
        var xxlargeCreep = [WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE];
        var xxxlargeCreep = [WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE];
        var superiorCreep = [WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE];
        var earlyDefender = [ATTACK,ATTACK,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE]; // 310 Energy Cost //
        var meleeDefender = [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,
                            TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,
                            MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,];
        var claimerBody = [MOVE,MOVE,MOVE,MOVE,CLAIM];
        ///////////////////////

        // VARIABLE FOR REPLACABLE CREEP //
        for(var name in Game.creeps) {
            var c = Game.creeps[name];
            if(c.body.length <= 3 && energyAvailable >= 550) {
                console.log(name + ' is replaceable.');
                console.log('Suicide Attemp on ' + c);
                c.suicide();
            }
         }
        /// Establishing Creep Loadout Variables ///
        if(energyAvailable >= 1300) {
            var loadOut = superiorCreep;
            console.log('Pop Control: Energy Available: ' + energyAvailable + ': Making superiorCreeps');
        }
        else if(energyAvailable >= 800) {
            var loadOut = xxxlargeCreep;
            console.log('Pop Control: Energy Available: ' + energyAvailable + ': Making xxxlargeCreeps');
        }
        else if(energyAvailable >= 650) {
            var loadOut = xxlargeCreep;
            console.log('Pop Control: Energy Available: ' + energyAvailable + ': Making xxlargeCreeps');
        }
        else if(energyAvailable >= 600) {
            var loadOut = xlargeCreep;
            console.log('Pop Control: Energy Available: ' + energyAvailable + ': Making xlargeCreeps');
        }
        else if(energyAvailable >= 550) {
            var loadOut = largeCreep;
            console.log('Pop Control: Energy Available: ' + energyAvailable + ': Making largeCreeps');
        }
        else if(energyAvailable >= 300) {
            var loadOut = mediumCreep;
            console.log('Pop Control: Energy Available: ' + energyAvailable + ': Making mediumCreeps');
        }
        else {
            var loadOut = smallCreep;
            console.log('Pop Control: Energy Available: ' + energyAvailable + ': Making smallCreeps');
        }
        /////////////////////////////////////////////

        // Keep Container Harvesters Alive
        if(harvesters_0.length < desiredharvesters_0 && containerMining == 1) {
            var newName = spawn.spawnCreep(loadOut, creepName, {memory: {role: 'containerHarvester_0', building: false, fullLoad: 0}});
            console.log('Spawning new Source 0 container harvester: ' + newName);
            spawn.memory.creepName = creepName;
        }
        if(harvesters_1.length < desiredharvesters_1 && containerMining == 1) {
            var newName = spawn.spawnCreep(loadOut, creepName, {memory: {role: 'containerHarvester_1', building: false, fullLoad: 0}});
            console.log('Spawning new Source 0 container harvester: ' + newName);
            spawn.memory.creepName = creepName;
        }
        /////////////////////////////////////////////


        // Keep a certain amount of harvesters
        if(harvesters_0.length < desiredharvesters_0 && containerMining != 1) {
            var newName = spawn.spawnCreep(loadOut, creepName, {memory: {role: 'harvester_0', building: false, fullLoad: 0}});
            console.log('Spawning new Source 0 harvester: ' + newName);
            spawn.memory.creepName = creepName;
        }
        if(harvesters_1.length < desiredharvesters_1 && containerMining != 1) {
            var newName = spawn.spawnCreep(loadOut, creepName, {memory: {role: 'harvester_1', building: false, fullLoad: 0}});
            console.log('Spawning new Source 1 harvester: ' + newName);
            spawn.memory.creepName = creepName;
        }
        if(harvesters_2.length < desiredharvesters_2 && containerMining != 1) {
            var newName = spawn.spawnCreep(loadOut, creepName, {memory: {role: 'harvester_2', building: false, fullLoad: 0}});
            console.log('Spawning new Source 2 harvester: ' + newName);
            spawn.memory.creepName = creepName;
        }
        if(harvesters_3.length < desiredharvesters_3 && containerMining != 1) {
            var newName = spawn.spawnCreep(loadOut, creepName, {memory: {role: 'harvester_3', building: false, fullLoad: 0}});
            console.log('Spawning new Source 3 harvester: ' + newName);
            spawn.memory.creepName = creepName;
        }
        // Keep a certain amount of repairers
        if(repairers.length < desiredRepairers) {
            var newName = spawn.spawnCreep(loadOut, creepName, {memory: {role: 'repairer', repairing: false}});
            console.log('Spawning new repairer: ' + newName);
            spawn.memory.creepName = creepName;
        }
        // Expansion builders
        if(Game.spawns['Spawn1'].memory.expand >= 1) {
            if(energyAvailable >= 800) {
                if(expansionBuilders.length < desiredExpansionBuilders) {
                    var loadOut = xxlargeCreep;
                    var newName = Game.spawns['Spawn1'].createCreep(loadOut, creepName, {memory:  {
                        role: 'expansionBuilder', building: false
                    }});
            spawn.memory.creepName = creepName;
                }
            }
        }
        // Expansion room harvesters
        if(spawn.memory.expand >= 1) {
            //if(energyAvailable >= 800) {

                if(harvesters_eR1_0.length < desiredeR1harvesters_0) {
                    console.log('Trying to build an expansion harvester' + harvesters_eR1_0.length + '/' + desiredeR1harvesters_0);
                    var newName = spawn.spawnCreep(loadOut, creepName, {memory: {role: 'harvester_eR1_0', building: false, fullLoad: 0
                    }});
                    spawn.memory.creepName = creepName;
                }
                if(harvesters_eR2_0.length < desiredeR2harvesters_0) {
                    console.log('Trying to build an expansion harvester' + harvesters_eR2_0.length + '/' + desiredeR2harvesters_0);
                    var newName = spawn.spawnCreep(loadOut, creepName, {memory: {role: 'harvester_eR2_0', building: false, fullLoad: 0
                    }});
                    spawn.memory.creepName = creepName;
                }
                if(harvesters_eR3_0.length < desiredeR3harvesters_0) {
                    console.log('Trying to build an expansion harvester' + harvesters_eR3_0.length + '/' + desiredeR3harvesters_0);
                    var newName = spawn.spawnCreep(loadOut, creepName, {memory: {role: 'harvester_eR3_0', building: false, fullLoad: 0
                    }});
                    spawn.memory.creepName = creepName;
                }
            //}
        }
        // Keep a certain amount of defenders
        if(defenders.length < desiredDefenders && !harvestersFirst) {

           var newName = spawn.spawnCreep(earlyDefender,  {memory: {role: 'defender', building: false}});

            spawn.memory.creepName = creepName;
        }
        // Keep a certain amount of linkers
        if(linkers.length < desiredLinkers && !harvestersFirst) {
            var newName = spawn.spawnCreep(linkerLoadOut, creepName, {memory: {role: 'linker'}});

            spawn.memory.creepName = creepName;
        }
        // Keep Expansion 1 Claimers
        if(Game.spawns['Spawn1'].memory.expand >= 1) {
            if(energyAvailable >= 800) {
                if(claimers.length < desiredClaimers) {
                    var newName = spawn.spawnCreep(claimerBody,  {memory: {role: 'claimer' }});

            spawn.memory.creepName = creepName;
                }
            }
        }
        // Keep a certain amount of upgraders
        if(upgraders.length < desiredUpgraders && !harvestersFirst) {
            var newName = spawn.spawnCreep(loadOut, creepName, {memory: {role: 'upgrader'}});

            console.log('Spawning new upgrader: ' + newName);

            spawn.memory.creepName = creepName;
        }
        // Keep a certain amount of builders
        if(builders.length < desiredBuilders && !harvestersFirst) {
            var newName = spawn.spawnCreep(loadOut, creepName, {memory: {role: 'builder', building: false}});
            console.log('Spawning new builder: ' + newName);

            spawn.memory.creepName = creepName;
        }

        ///////////// COUNTING CREEPS /////////////////
        console.log('ER:1 Source 0 Harvesters: ' + harvesters_eR1_0.length + '/' + desiredeR1harvesters_0);
        console.log('Source 0 Harvesters: ' + harvesters_0.length + '/' + desiredharvesters_0 + ' | Source 1 Harvesters: ' + harvesters_1.length + '/' + desiredharvesters_1);
        console.log('Source 2 Harvesters: ' + harvesters_2.length + '/' + desiredharvesters_2 + ' | Source 3 Harvesters: ' + harvesters_3.length + '/' + desiredharvesters_3);
        console.log('Defenders: ' + defenders.length + '/' + desiredDefenders + ' | Repairers: ' + repairers.length + '/' + desiredRepairers + ' | Builders: ' + builders.length + '/' + desiredBuilders + ' | Upgraders: ' + upgraders.length + '/' + desiredUpgraders + ' | Claimers: ' + claimers.length + '/' + desiredClaimers + ' | Linkers: ' + linkers.length + '/' + desiredLinkers + ' | Expansion Builders: ' + expansionBuilders.length + '/' + desiredExpansionBuilders);
    }
};


module.exports = pop;
