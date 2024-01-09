const passport=require('passport');
const User=require('../model')
const crypto = require('crypto');
var GoogleStrategy = require('passport-google-oauth20').Strategy;


//google strategy  

passport.use(new GoogleStrategy({
    clientID: "448865853931-vjv8ureo8qg1qiipo1s07ldvdta360a9.apps.googleusercontent.com",
    clientSecret:"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",
    callbackURL: "http://localhost:8000/auth/google/callback"
  },
  async function(accessToken, refreshToken, profile, cb) {

  
        try {
            const user = await User.findOne({ email: profile.emails[0].value });
            if (user) {
                return cb(null, user);
            }
            if (!user) {
                // if not found, creat user and set it as req.user
                const newUser = await User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                    
                })
                if (newUser) {
                    return cb(null, newUser);
                }
            }
        } catch (error) {
            console.log('error ', error);
        }
    }

      ));
module.exports=passport;