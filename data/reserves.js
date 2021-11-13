const conn = require('./connection');
//const bcrypt = require("bcryptjs");
//const jwt = require('jsonwebtoken');
const { ObjectId } = require('bson');
require('dotenv').config();
const DATABASE = 'tp2-appcanchas';
const RESERVES = 'reserves';


async function getAllReserves(){
    const connectiondb = await conn.getConnection();
    const reserves = await connectiondb
                        .db(DATABASE)
                        .collection(RESERVES)
                        .find()
                        .toArray();    
    return reserves;
}

async function getReserveById(id){
    const connectiondb = await conn.getConnection();
    const reserves = await connectiondb
                        .db(DATABASE)
                        .collection(RESERVES)
                        .findOne({_id: new ObjectId(id)});
    return reserves;
}

async function getReservesByUser(id){
    const connectiondb = await conn.getConnection();
    const reserves = await connectiondb
                        .db(DATABASE)
                        .collection(RESERVES)
                        .findOne({'user._id': id});
    return reserves;
}

async function addReserve(reserves){
    const connectiondb = await conn.getConnection();
    //reserves.password = await bcrypt.hash(reserves.password, 8);
    const res = await connectiondb
                .db(DATABASE)
                .collection(RESERVES)
                .insertOne(reserves);
    return res;
}

async function deleteReserve(id){
    const connectiondb = await conn.getConnection();
    const res = await connectiondb
                .db(DATABASE)
                .collection(RESERVES)
                .deleteOne({_id: new ObjectId(id)});
    return res;
}

module.exports = {getAllReserves, addReserve, deleteReserve, getReserveById, getReservesByUser}