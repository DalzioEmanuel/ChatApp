const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
//Requiring mongoose
    const mongoose = require('mongoose');
    mongoose.Promise = global.Promise;
//User Models (Sequelize)
    const {saveUser, User} = require('../models/users');
//Messages Model (mongoDB)
    require('../models/messages');
    const Message = mongoose.model('Message');


function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/users/login'); // Redirect to login page if not authenticated
}

router.get('/', (req, res)=>{
    res.send('Users page');
});

router.post('/send-message', ensureAuthenticated, async (req, res)=>{
    try {
        const data = {
            senderUserId: res.locals.user.id,
            senderName: res.locals.user.username,
            content: req.body.content
        }
        //Save message to the database
        await new Message(data).save();
        req.flash('msg_success', 'Message sent successfully');
        res.redirect('/');

    } catch (error) {
        req.flash('msg_error', 'There was an error, please try again.');
        res.redirect('/');
    }
});

router.get('/login', (req, res)=>{
    res.render('users/login');
});

router.post('/login', async (req, res, next)=>{
    
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next)
    
});

router.get('/register', (req, res)=>{
    res.render('users/register');
});

router.post('/register', (req, res) =>{
    saveUser(req, res);
});

router.get('/logout', (req, res)=>{
    req.logout((err)=>{
        if(err){
            req.flash('msg_error', 'Error during logout');
            res.redirect('/');
        }else{
            req.flash('msg_success', 'Logged Out.');
            res.redirect('/');
        }
    });
});

module.exports = router;