const conn = require('./connection');
const { ObjectId } = require('bson');
const DATABASE = 'tp2-appcanchas';
const COURTS = 'courts';
const allCourts = require('./courts');

async function getCalificationsByCourtId(id){
    const connectiondb = await conn.getConnection();
    const court = await connectiondb
                        .db(DATABASE)
                        .collection(COURTS)
                        .findOne({_id: new ObjectId(id)});
    return court.califications;
}

async function getCalificationsBySize(size){
    const connectiondb = await conn.getConnection();
    const court = await connectiondb
                        .db(DATABASE)
                        .collection(COURTS)
                        .findOne({size: parseInt(size)});
    return court.califications;
}

async function addCalification(court){
    const connectiondb = await conn.getConnection();
    const query = {size: parseInt(court.size)};
    const newValues = { $push: {
        califications:  court.calification,
    
    }}   
    const res = await connectiondb
                .db(DATABASE)
                .collection(COURTS)
                .update(query, newValues);
    return res;
    
}

module.exports = { getCalificationsBySize, getCalificationsByCourtId, addCalification}