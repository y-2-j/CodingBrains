const CONFIG =require('./config');
const mongoose =require('mongoose');

mongoose.connect(`mongodb://${CONFIG.DB.USERNAME}:${CONFIG.DB.PASSWORD}@${CONFIG.DB.HOST}:${CONFIG.DB.PORT}/${CONFIG.DB.NAME}`)
    .then(() => {
        console.log("Successfully connected to DB");
    }).catch(err => {
        console.error("Error in connecting to DB");
    });

module.exports=mongoose;