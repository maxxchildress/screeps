var init = {

    run: function() {

        var firstSpawn = Game.spawns['Spawn1'];

        if(!firstSpawn.memory.init) {
            console.log('Initializing...');
            console.log("Begining Spawn Variable Routine");
            Game.spawns['Spawn1'].memory.defenders = 0;
            Game.spawns['Spawn1'].memory.upgraders = 0;
            Game.spawns['Spawn1'].memory.builders = 0;
            Game.spawns['Spawn1'].memory.claimers = 0;
            Game.spawns['Spawn1'].memory.repairers = 0;
            Game.spawns['Spawn1'].memory.harvesters_0 = 0;
            Game.spawns['Spawn1'].memory.harvesters_1 = 0;
            Game.spawns['Spawn1'].memory.harvesters_2 = 0;
            Game.spawns['Spawn1'].memory.harvesters_3 = 0;
            Game.spawns['Spawn1'].memory.expand = 0;
            Game.spawns['Spawn1'].memory.desiredMovers_0 = firstSpawn.room.find(FIND_SOURCES).length / 2;
            Game.spawns['Spawn1'].memory.desiredMovers_1 = firstSpawn.room.find(FIND_SOURCES).length / 2;
            Game.spawns['Spawn1'].memory.desiredContainerHarvesters = firstSpawn.room.find(FIND_SOURCES).length;
            Game.spawns['Spawn1'].memory.harvesters_eR1_0 =0;
            Game.spawns['Spawn1'].memory.harvesters_eR2_0 =0;
            Game.spawns['Spawn1'].memory.harvesters_eR3_0 =0;
            Game.spawns['Spawn1'].memory.creepName = 0;
            Game.spawns['Spawn1'].memory.upgradeContainer = 0;
            Game.spawns['Spawn1'].memory.mySign = 0;

            // Insert Initialization Code Here
            // Insert Initialization Code Here
            // Insert Initialization Code Here
            Game.spawns['Spawn1'].memory.init = true;
        }
        else {console.log('Initialization Completed')}

    }
};

module.exports = init;
