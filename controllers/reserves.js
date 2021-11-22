const reserves = require('../data/reserves');
const users = require('../data/users');

async function getAllReserves(){    
    return reserves.getAllReserves();
}

async function getReservesByUser(id){
    const myUser = await users.getUserById(id);
    if(!myUser){
        throw new Error('Usuario no encontrado');
    } 
    return reserves.getReservesByUser(id);
}

async function getReservesByEmail(email){
    const myUser = await users.getUserByEmail(email);
    if(!myUser){
        throw new Error('Usuario no encontrado');
    } 
    return reserves.getReservesByEmail(email);
}



async function addReserve(user){
    const myUser = await users.getUserById(user._id);
    const myReserves = await reserves.getAllReserves();
    const findReserve = await myReserves.find(reserve => reserve.date === user.reserve.date && reserve.hour === user.reserve.hour && reserve.courtSize === user.reserve.courtSize);
    
    const userReserves = await reserves.getReservesByUser(user._id);
    const findUserReserve = await userReserves.find(reserve => reserve.date === user.reserve.date && reserve.hour === user.reserve.hour);

    if(findReserve){
        throw new Error('Turno no disponible');
    }

    if(findUserReserve){
        throw new Error('Usted ya tiene una reserva en este dia y horario');
    }

    if(!myUser){
        throw new Error('Usuario no encontrado');
    } 


    return reserves.addReserve(user);
}

// async function addReserveByEmail(user){
//     const myUser = await users.getUserByEmail(user.email);
//     const myReserves = await reserves.getAllReserves();
//     const findReserve = await myReserves.find(reserve => reserve.date === user.reserve.date && reserve.hour === user.reserve.hour && reserve.courtSize === user.reserve.courtSize);
    
//     const userReserves = await reserves.getReservesByUser(myUser._id);
//     const findUserReserve = await userReserves.find(reserve => reserve.date === user.reserve.date && reserve.hour === user.reserve.hour);

//     if(findReserve){
//         throw new Error('Turno no disponible');
//     }

//     if(findUserReserve){
//         throw new Error('Usted ya tiene una reserva en este dia y horario');
//     }

//     if(!myUser){
//         throw new Error('Usuario no encontrado');
//     } 


//     return reserves.addReserveByEmail(user);
// }

async function deleteReserve(user){
    const myUser = await users.getUserById(user._id);
    const userReserves = await reserves.getReservesByUser(user._id);
    const findUserReserve = await userReserves.find(reserve => reserve.date === user.reserve.date && reserve.hour === user.reserve.hour && reserve.courtSize === user.reserve.courtSize);

    if(!findUserReserve){
        throw new Error('Reserva no encontrada');
    }

    if(!myUser){
        throw new Error('Usuario no encontrado');
    } 

    return reserves.deleteReserve(user);
}

module.exports = {addReserve, getReservesByUser, getAllReserves, deleteReserve}