var roleLinker = {
    run: function (creep) {
        var storage = creep.room.storage;
        var links = creep.room.find(FIND_STRUCTURES, { filter: (s) => s.structureType == STRUCTURE_LINK});
        var sourceLink = links[0];
        var targetLink = links[1];

        // Link Exchanges
        if(links.length >= 1) {
            sourceLink.transferEnergy(targetLink, sourceLink.energy);
            // console.log('Link 0 to 1');
        }

        if(links) {
            link = links[1];
            // Move To Withdraw From Link
            creep.withdraw(links[1], RESOURCE_ENERGY, links[1].energy);
            if (creep.withdraw(links[1], RESOURCE_ENERGY, creep.carryCapacity - creep.carry.energy) == ERR_NOT_IN_RANGE && creep.energy != creep.carryCapacity) {
                creep.moveTo(links[1]);
            }
            // Move to Deposit in Storage
            else if (creep.transfer(storage, RESOURCE_ENERGY, creep.energy) == ERR_NOT_IN_RANGE) {
                creep.moveTo(storage);
                creep.transfer(storage, RESOURCE_ENERGY, creep.carry.energy);
            }

        }


    }
}
module.exports = roleLinker;