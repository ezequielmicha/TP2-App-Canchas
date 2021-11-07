//const { ObjectId } = require('bson');
const conn = require('./connection');
const DATABASE = 'tp2-appcanchas';
const USERS = 'users';


async function getAllUsers(){
    const connectiondb = await conn.getConnection();
    const supplies = await connectiondb
                        .db(DATABASE)
                        .collection(USERS)
                        .find()
                        .toArray();    
    return supplies;
}

module.exports = {getAllUsers}