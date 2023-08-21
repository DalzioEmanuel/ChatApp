const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');

const {saveUser, User} = require('../models/users');


router.get('/', (req, res)=>{
    res.send('Users page');
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