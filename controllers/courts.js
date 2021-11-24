const courts = require('../data/courts');

async function getCourts(){    
    return courts.getCourts();
}

async function getCourtById(id){
    return courts.getCourtById(id);
}

async function getCourtsBySize(size){
    return courts.getCourtsBySize(size);
}

async function addCourt(court){
    const myCourts = await courts.getCourtsBySize(court.size);
    const findCourt = await myCourts.find(c => c.size === court.size);
    if(findCourt){
        throw new Error('Cancha ya registrada');
    } 
    return courts.addCourt(court);
}

async function deleteCourt(id){
    const myCourt = await courts.getCourtById(id)
    if(!myCourt){
        throw new Error('Id inexistente');
    } 
    return courts.deleteCourt(id);
}

module.exports = {getCourts, getCourtById, getCourtsBySize, addCourt, deleteCourt}