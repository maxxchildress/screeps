// TODO Create Movers to refil extensions from mining containers


//////////////////Main/////////////////////
// To expand to another room set expand = 1
//
// To Set Desired Populations Use The Below Function In The Console
// Game.spawns['Spawn1'].memory.harvesters_1 = 4;
// with builders,upgraders,defenders,harvesters_0,harvesters_eR1_0 and repairers being other options

// Import all requires and modules //
var init = require('init');
var pop = require('pop');

var roleMover = require('role.mover');
var roleClaimer = require('role.claimer');
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleDefender = require('role.defender');
var roleLinker = require('role.linker');
var roleTower = require('role.tower');
var rolesatHarvester = require('role.satharvester');
var visuals = require('visuals');
var architect = require('architect');
var roleContainerHarvester = require('role.container.harvester');

///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////

// Define Variables //

var spawn1 = Game.spawns['Spawn1'];
var room1 = spawn1.room;
var energyAvailable1 = room1.energyAvailable;
var sources = room1.find(FIND_SOURCES);

if(sources[0]){var sourceOne = sources[0];}
if(sources[1]){var sourceTwo = sources[1];}


// Structures //
var storage1 = room1.storage;
var links = room1.find(FIND_STRUCTURES, { filter: (s) => s.structureType == STRUCTURE_LINK});
var sourceLink = links[0];
var targetLink = links[1];
var towers1 = room1.find(FIND_STRUCTURES, { filter: (s) => s.structureType == STRUCTURE_TOWER});
var needsSomeRepair = room1.find(FIND_STRUCTURES, { filter: object => object.hits < object.hitsMax });

// For introducing second spawns and expansions //
var spawn2 = Game.spawns['Spawn2'];
    if(spawn2){var room2 = spawn2.room;}
    if(Game.flags['expand1']) {var expansionFlag1 = Game.flags['expand1'];}
    if(Game.flags['expand2']) {var expansionFlag2 = Game.flags['expand2'];}
    if(Game.flags['expand3']) {var expansionFlag3 = Game.flags['expand3'];}

// For Automatic Populations  //
var constructSites = spawn1.room.find(FIND_CONSTRUCTION_SITES);
var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');

var containerMining = Game.spawns['Spawn1'].memory.containerMining;

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

console.log('THIS IS A GLOBAL TICK');

// This is the primary loop for the AI //
module.exports.loop = function () {
    console.log('##################################################');
    init.run();
    console.log('Expansion Flag 1: ' + expansionFlag1);

    // Clear Memory of Dead Creeps //
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            // console.log('Clearing non-existing creep memory:', name);
        }
    }



    /////////////////////////////////////////////////////////////////////////////////////////
    // Set some automatic populations.                                                     //
    // If there is a contruction site build a builder. If there are five or more build 2   //
    if(constructSites.length >= 1) { spawn1.memory.builders = 1; }
    if(constructSites.length >= 5) { spawn1.memory.builders = 2; }
    if(constructSites.length < 1) { spawn1.memory.builders = 0; }
    // If there are towers set repairers to zero                                           //
    if(towers1.length) { spawn1.memory.repairers = 0; }
    else if(spawn1.memory.repairers <= 0 && needsSomeRepair.length > 0) { spawn1.memory.repairers = 1; }
    // Always keep two upgraders for now.                                                  //
    if(spawn1.memory.upgraders <= 1) { spawn1.memory.upgraders = 2; }
    // always have atleast two harvester going.                                            //
    if(spawn1.memory.harvesters_0 <= 0 && sources[0].energy >= 0 && containerMining != 1) { spawn1.memory.harvesters_0 = 2; }
    if(spawn1.memory.harvesters_1 <= 0 && sources[1].energy >= 0 && containerMining != 1) { spawn1.memory.harvesters_1 = 2; }
    /////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////

    // Refresh availableEnergy //
    energyAvailable1 = room1.energyAvailable;

    // Run Creep Population Control
    if(spawn2){var energyAvailable2 = room2.energyAvailable;}
    if(spawn2){pop.run(spawn2, room2);console.log('Running Room 2');}
    pop.run(spawn1, room1, energyAvailable1);

    /////////////////////////////////////////////////////////////////////////////////////////
    // Execute the Architect                                                               //
    //                                                                                     //
    architect.run(spawn1, room1, energyAvailable1);

    // Run Creep modules
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];

        if(creep.memory.role == 'harvester_0' || creep.memory.role == 'harvester_1' || creep.memory.role == 'harvester_2' || creep.memory.role == 'harvester_3') {
            roleHarvester.run(creep, expansionFlag1);
            visuals.run(creep, "🚚");
        }
        if(creep.memory.role == 'containerHarvester_0' || creep.memory.role == 'containerHarvester_1') {
            roleContainerHarvester.run(creep, expansionFlag1, sourceOne, sourceTwo);
            visuals.run(creep, "🚚C");
        }
        if(creep.memory.role == "harvester_eR1_0") {
            rolesatHarvester.run(creep, expansionFlag1);
            visuals.run(creep, "🚚+1");
        }
        if(creep.memory.role == "harvester_eR2_0") {
            rolesatHarvester.run(creep, expansionFlag2);
            visuals.run(creep, "🚚+2");
        }
        if(creep.memory.role == "harvester_eR3_0") {
            rolesatHarvester.run(creep, expansionFlag3);
            visuals.run(creep, "🚚+3");
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
            visuals.run(creep, "🔅");
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
            visuals.run(creep, "🔨");
        }
        if(creep.memory.role == 'expansionBuilder') {
            roleBuilder.run(creep, expansionFlag1);
            visuals.run(creep, "🔨+");
        }
        if(creep.memory.role == 'repairer') {
            roleRepairer.run(creep);
            visuals.run(creep, "🔧");
        }
        if(creep.memory.role == 'defender') {
            roleDefender.run(creep);
            visuals.run(creep, "🚀");
        }
        if(creep.memory.role == 'claimer') {
            roleClaimer.run(creep, expansionFlag1);
            visuals.run(creep, "Cl");
        }
        if(creep.memory.role == 'linker') {
            roleLinker.run(creep);
            visuals.run(creep, "Lr");
        }
        if(creep.memory.role == 'containerMovers_0' || creep.memory.role == 'containerMovers_1') {
            roleMover.run(creep, sourceOne, sourceTwo);
            visuals.run(creep, "Mvr");
        }

    }
    // Run Tower Code
    if(towers1.length) {
        roleTower.run();
        console.log('Towers: ' + towers1.length);
    }
}
