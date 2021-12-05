const conn = require('./connection');
const { ObjectId } = require('bson');
// require('dotenv').config();
const DATABASE = 'tp2-appcanchas';
const COURTS = 'courts';


async function getCourts(){
    const connectiondb = await conn.getConnection();
    const courts = await connectiondb
                        .db(DATABASE)
                        .collection(COURTS)
                        .find()
                        .toArray();    
    return courts;
}

async function getCourtById(id){
    const connectiondb = await conn.getConnection();
    const court = await connectiondb
                        .db(DATABASE)
                        .collection(COURTS)
                        .findOne({_id: new ObjectId(id)});
    return court;
}

// El método getCourtsBySize está en plural y busca un array de canchas pensando en el futuro que podria ser escalable y tener varias canchas del mismo tamaño. En ese caso le podriamos agregar la propiedad "number" a cada cancha para que tenga identificado el tamaño y el numero de cancha de ese tamaño (por ejemplo: cancha de 11 número 1, cancha de 11 número 2, cancha de 11 número 3, etc)
async function getCourtsBySize(size){
    const connectiondb = await conn.getConnection();
    const courts = await connectiondb
                        .db(DATABASE)
                        .collection(COURTS)
                        .find({size: parseInt(size)})
                        .toArray();    
    return courts;
}

async function addCourt(court){
    const connectiondb = await conn.getConnection();
    const res = await connectiondb
                .db(DATABASE)
                .collection(COURTS)
                .insertOne(court);
    return res;
}

async function deleteCourt(id){
    const connectiondb = await conn.getConnection();
    const res = await connectiondb
                .db(DATABASE)
                .collection(COURTS)
                .deleteOne({_id: new ObjectId(id)});
    return res;
}

module.exports = { getCourts, getCourtById, getCourtsBySize, addCourt, deleteCourt }