const califications = require('../data/califications');
const courts = require('../data/courts');

async function getCalificationsByCourtId(id){
    return califications.getCalificationsByCourtId(id);
}

async function getCalificationsBySize(size){
    return califications.getCalificationsBySize(size);
}

async function addCalification(court){
    const myCourts = await courts.getCourtsBySize(court.size)
    const findCourt = await myCourts.find(c => c.size === court.size);
    if(!findCourt){
        throw new Error('Cancha inexistente');
    } 

    if(court.calification < 1 || court.calification > 5){
        throw new Error('Error. La calificacion debe ser entre 1 y 5');
    }
    
    return califications.addCalification(court);
}

module.exports = { getCalificationsBySize, getCalificationsByCourtId, addCalification }