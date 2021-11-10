const users = require('../data/users');

async function getUsers(){    
    return users.getAllUsers();
}

async function getUserById(id){
    return users.getUserById(id);
}

async function getUserByEmail(email){
    return users.getUserByEmail(email);
}

async function addUser(user){
    const myUser = await users.getUserByEmail(user.email);
    if(myUser){
        throw new Error('Email ya registrado');
    } 
    return users.addUser(user);
}

async function deleteUser(id){
    const myUser = await users.getUserById(id)
    if(!myUser){
        throw new Error('Id inexistente');
    } 
    return users.deleteUser(id);
}

async function findUserByCredential(email, password){
    return users.findUserByCredential(email, password);
}

async function generateToken(user){
    return users.generateToken(user);
}

module.exports = {getUsers, addUser, findUserByCredential, generateToken, getUserByEmail, deleteUser, getUserById}