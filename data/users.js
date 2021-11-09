//const { ObjectId } = require('bson');
const conn = require('./connection');
const bcrypt = require("bcryptjs");
const DATABASE = 'tp2-appcanchas';
const USERS = 'users';


async function getAllUsers(){
    const connectiondb = await conn.getConnection();
    const users = await connectiondb
                        .db(DATABASE)
                        .collection(USERS)
                        .find()
                        .toArray();    
    return users;
}

async function addUser(user){
    const connectiondb = await conn.getConnection();
    user.password = await bcrypt.hash(user.password, 8);
    const res = await connectiondb
                .db(DATABASE)
                .collection(USERS)
                .insertOne(user);
    return res;
}

module.exports = {getAllUsers, addUser}