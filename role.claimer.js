var roleClaimer = {

    /** @param {Creep} creep **/
    run: function (creep, expansionFlag) {
        roomController = creep.room.find(FIND_STRUCTURES, { filter: { structureType: STRUCTURE_CONTROLLER }});
        if(creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller);
        }

        // creep.moveTo(expansionFlag);
        creep.claimController(roomController);
        // console.log(roomController);
    }
}
module.exports = roleClaimer;