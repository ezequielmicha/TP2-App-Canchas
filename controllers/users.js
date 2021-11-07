const sales = require('../data/users');

async function getUsers(){    
    return sales.getAllUsers();
}

module.exports = {getUsers}