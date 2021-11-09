const users = require('../data/users');

async function getUsers(){    
    return users.getAllUsers();
}

module.exports = {getUsers}