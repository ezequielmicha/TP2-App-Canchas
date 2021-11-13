const reserves = require('../data/reserves');

async function getReserves(){    
    return reserves.getAllReserves();
}

async function getReserveById(id){
    return reserves.getReserveById(id);
}

async function getReservesByUser(id){
    return reserves.getReservesByUser(id);
}

async function addReserve(reserve){
    //const myUser = await reserves.getUserByEmail(user.email);
    if(myUser){
        throw new Error('Email ya registrado');
    } 
    return reserves.addUser(user);
}

async function deleteReserve(id){
    const myReserve = await reserves.getReserveById(id)
    if(!myReserve){
        throw new Error('Id inexistente');
    } 
    return reserves.deleteReserve(id);
}

async function addReserve(reserve){
    return reserves.addReserve(reserve);
}

module.exports = {getReserves, addReserve, deleteReserve, getReserveById, getReservesByUser}