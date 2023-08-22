const {Sequelize, Model, DataTypes} = require('sequelize');
const mongoose = require('mongoose');

async function connectoMongo(){
    try {
        await mongoose.connect('mongodb://localhost/chatApp');
        console.log('Connected to mongo!');
    } catch (error) {
        console.log('Error ' + error);
    }
}

connectoMongo();
try {
    const sequelize = new Sequelize('chatroom', 'root', 'Emanuel2001$', {
        host: 'localhost',
        dialect: 'mysql'
    });
    console.log('Connected to Mysql');
    module.exports = {sequelize, Sequelize, Model, DataTypes};
} catch (error) {
    console.log('Error ' + error);
}

