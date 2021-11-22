const conn = require('./connection');
const { ObjectId } = require('bson');
require('dotenv').config();
const DATABASE = 'tp2-appcanchas';
const USERS = 'users';
const allUsers = require('../data/users');

async function addReserve(user){
    const connectiondb = await conn.getConnection();
    const query = {_id: new ObjectId(user._id)};
    const newValues = { $push: {
        reserves:  user.reserve,
    
    }}   
    const res = await connectiondb
                .db(DATABASE)
                .collection(USERS)
                .update(query, newValues);
    return res;
    
}

async function addReserveByEmail(user){
    const connectiondb = await conn.getConnection();
    const myUser = await allUsers.getUserByEmail(user.email)
    const query = {_id: new ObjectId(myUser._id)};
    const newValues = { $push: {
        reserves:  user.reserve,
    
    }}   
    const res = await connectiondb
                .db(DATABASE)
                .collection(USERS)
                .update(query, newValues);
    return res;
    
}

async function getReservesByUser(id){
    const connectiondb = await conn.getConnection();
    const user = await connectiondb
                        .db(DATABASE)
                        .collection(USERS)
                        .findOne({_id: new ObjectId(id)});
    return user.reserves;
}

async function getAllReserves(){
    const users = await allUsers.getAllUsers();
    const reserves = [];
    users.forEach(user => {
        user.reserves.forEach(reserve => {
            reserves.push(reserve);
        });
    });
    return reserves;
}

async function deleteReserve(user){
    const connectiondb = await conn.getConnection();
    const query = {_id: new ObjectId(user._id)};
    const newValues = {$pullAll: {
        reserves: [user.reserve] } }
    const res = await connectiondb
                .db(DATABASE)
                .collection(USERS)
                .update(query, newValues);
    return res;
}

module.exports = {addReserve, getReservesByUser, getAllReserves, deleteReserve}