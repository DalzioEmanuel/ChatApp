const {sequelize, Sequelize, DataTypes, Model} = require('./db');
const bcrypt = require('bcrypt');

const User = sequelize.define('User', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username:{
        type: DataTypes.STRING(55),
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING(150),
        allowNull: false,
        validate:{
            notEmpty: true
        }
    }
});

//User.sync({force: true});

async function saveUser(req, res){
    const user = {
        username: req.body.username,
        email: req.body.emil,
        password: req.body.password
    };

    bcrypt.genSalt(10, async (error, salt)=>{
        try {
            const hash = await bcrypt.hash(user.password, salt);
            user.password = hash;

            await User.create({
                username: user.username,
                email: user.email,
                password: user.password
            });

            res.redirect('/');
        } catch (error) {
            console.log('/');
        }
    });
}

module.exports = {saveUser, User};