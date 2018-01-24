const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((userFromDB, done) => {
	error = null;
	done(error, userFromDB.id);
});

passport.deserializeUser((id, done) => [
	User.findById(id).then(userFromDB => {
		done(null, userFromDB);
	})
]);

passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: '/auth/google/callback',
			proxy: true
		},
		async (accessToken, refreshToken, profile, done) => {
			const existingUser = await User.findOne({ googleId: profile.id }); // asynchronus
			if (existingUser) {
				// we already have this user in db
				error = null;
				done(error, existingUser);
			} else {
				const newUserFromDB = await new User({
					googleId: profile.id
				}).save();
				done(null, newUserFromDB);
			}
		}
	)
);
