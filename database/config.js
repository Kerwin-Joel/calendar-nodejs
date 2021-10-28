const mongoose = require('mongoose');

const dbConnection = async (db) => {
    try {
        await mongoose.connect(process.env.DB_CONNECTION);
        console.log('Connected ');
    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de conectar con la db')
    }
}

module.exports ={
    dbConnection
}