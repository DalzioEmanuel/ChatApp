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
function testData(req, res){
    let errors = [];
    if(!req.body.username || req.body.username === undefined || req.body.username === null)
        errors.push({text : 'Invalid Username.'});
    if(!req.body.email || req.body.email === undefined || req.body.email === null)
        errors.push({text : 'Invalid Email.'});
    if(!req.body.password || req.body.password === undefined || req.body.password === null)
        errors.push({text : 'Invalid password.'});
    if(req.body.password.length < 8)
        errors.push({text : 'Password to short, can\'t be shortter than 8 characters.'});
    if(req.body.password != req.body.password2) 
        errors.push({text : 'Passwords don\'t match.'});
    if(errors.length > 0) 
        res.render('users/register', {errors: errors});
    else return true;    
}

async function saveUser(req, res){
    if(testData(req, res)){

        const user = {
            username: req.body.username,
            email: req.body.email,
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
                
                req.flash('msg_success', 'Account created successfuly.');
                res.redirect('/');
    
            } catch (error) {
                req.flash('msg_error', 'Internal error, please try again later.');
                console.log('/');
            }
        });
    }
}

module.exports = {saveUser, User};