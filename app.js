//Loading modules 
    const express = require('express');
    const app = express();
    const {engine} = require('express-handlebars');
    const mongoose = require('mongoose');
    mongoose.Promise = global.Promise;
    const session = require('express-session');
    //Connect flash for displaying flash messages to the users
        const flash = require('connect-flash');
        const path = require('path');
    //Passport for the authentication process
        const Passport = require('passport'); 
const passport = require('passport');
//Setting the express-session middleware to enable and manage sessions for storing user related information in the sessions.
    app.use(session({
        secret: '1z2x3c4v5b6n7m8#W##dtrT$E',
        resave: true,
        saveUninitialized: true
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(flash());
//Middleware
    /*app.use((req, res, next)=>{
        res.locals.msg_success = req.flash('msg_success');
        res.locals.msg_error = req.flash('msg_error');
        res.locals.error = req.flash('error');
        res.locals.user = req.user || null;
    });*/
//body-Parser
    app.use(express.urlencoded({extended: true}));
    app.use(express.json());
//Handlebars
    app.engine('handlebars', engine({
        defaultLayout: 'main',
        runtimeOptions:{
            allowProtoPropertiesByDefault: true,
            allowProtoMethodsByDefault: true
        }
    }));
    app.set('view engine', 'handlebars');
//Public
    app.use(express.static(path.join(__dirname, 'public')));
//Routing
    app.get('/', (req, res)=>{
        res.render('index');
    });

//Others
    app.set('port', process.env.PORT || 8081);
    app.listen(app.get('port'), ()=> console.log('Server Running'));