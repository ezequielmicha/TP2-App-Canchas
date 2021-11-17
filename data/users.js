const conn = require('./connection');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const { ObjectId } = require('bson');
require('dotenv').config();
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

async function getUserById(id){
    const connectiondb = await conn.getConnection();
    const user = await connectiondb
                        .db(DATABASE)
                        .collection(USERS)
                        .findOne({_id: new ObjectId(id)});
    return user;
}

async function getUserByEmail(email){
    const connectiondb = await conn.getConnection();
    const user = await connectiondb
                        .db(DATABASE)
                        .collection(USERS)
                        .findOne({email: email});
    return user;
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

async function deleteUser(id){
    const connectiondb = await conn.getConnection();
    const res = await connectiondb
                .db(DATABASE)
                .collection(USERS)
                .deleteOne({_id: new ObjectId(id)});
    return res;
}

async function findUserByCredential(email, password){
    const connectiondb = await conn.getConnection();
    const user = await connectiondb
                        .db(DATABASE)
                        .collection(USERS)
                        .findOne({email: email});
    if(!user){
        throw new Error('Credenciales no validas');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        throw new Error('Credenciales no validas');
    }

    return user;
}

async function generateToken(user){
    const token = jwt.sign({_id: user._id}, process.env.SECRET_TOKEN, {expiresIn: '1h'});
    return token;
}

async function updateUser(user){
    const connectiondb = await conn.getConnection();
    const query = {_id: new ObjectId(user._id)};
    const newValues = { $set: {
        userName : user.userName,
    }}   
    const res = await connectiondb
                .db(DATABASE)
                .collection(USERS)
                .updateOne(query,newValues);
    return res;
    
}

module.exports = {getAllUsers, addUser, findUserByCredential, generateToken, getUserByEmail, deleteUser, getUserById, updateUser}