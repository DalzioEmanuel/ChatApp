const localstrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const {User} = require('../models/users');

module.exports = (passport) => {
    passport.use(new localstrategy({usernameField: 'username', passwordField: 'password'}, async (username, password, done) =>{
        try {
            const user = await User.findOne({wher: {username}});
            if(!user) return done(null, false);

            const equal = await bcrypt.compare(password, user.password);

            if(equal) done(null, user.get());
            else done(null, false);

        } catch (error) {
            console.log('Error : ' + error);
            return done(error);
        }
    }));

    passport.serializeUser((user, done) =>{
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) =>{
        try {
            const user = await User.findByPk(id);
            if(!user) return done(null, false);

            done(null, user.get());
        } catch (error) {
            done(error, null);
        }
    });
}