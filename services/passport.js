const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const LinkedInStrategy = require("passport-linkedin-oauth2").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

const UserCollection = mongoose.model("users");

passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: "/auth/google/callback",
			proxy: true
		},
		async (accessToken, refreshToken, profile, done) => {
			const biggerImageUrl = profile.photos[0].value.slice(0, -2) + "150";
			const existingUser = await UserCollection.findOne({
				auth: { googleId: profile.id }
			}); // asynchronus
			if (existingUser) {
				// we already have this user in db

				// update their name & email if they don't have one
				if (
					existingUser.profile.name === undefined ||
					existingUser.profile.emailInformation.email === undefined ||
					existingUser.profile.imageUrl === undefined
				) {
					await UserCollection.updateOne(
						{
							"auth.googleId": profile.id
						},
						{
							$set: {
								"profile.name": profile.displayName,
								"profile.emailInformation.email": profile.emails[0].value,
								"profile.imageUrl": biggerImageUrl
							}
						}
					);
				}
				error = null;
				done(error, existingUser);
			} else {
				const newUserFromDB = await new UserCollection({
					auth: {
						googleId: profile.id
					},
					profile: {
						name: profile.displayName,
						'emailInformation.email': profile.emails[0].value,
						imageUrl: biggerImageUrl
					}
				}).save();
				done(null, newUserFromDB);
			}
		}
	)
);

passport.use(
	new LinkedInStrategy(
		{
			clientID: keys.linkedInClientID,
			clientSecret: keys.linkedInClientSecret,
			callbackURL: "/auth/linkedIn/callback",
			scope: ["r_emailaddress", "r_basicprofile"],
			state: true, // used to prevent CSRF attacks
			proxy: true
		},
		async (accessToken, refreshToken, profile, done) => {
			const existingUser = await UserCollection.findOne({
				"auth.linkedInId": profile.id
			}); // asynchronus
			if (existingUser) {
				// we already have this user in db

				// update their name, email, linkedInPublicProfileUrl if they don't have one
				if (
					existingUser.profile.name === undefined ||
					existingUser.profile.emailInformation.email === undefined ||
					existingUser.profile.linkedInPublicProfileUrl === undefined ||
					existingUser.profile.imageUrl === undefined
				) {
					await UserCollection.updateOne(
						{
							"auth.linkedInId": profile.id
						},
						{
							$set: {
								"profile.name": profile.displayName,
								"profile.emailInformation.email": profile.emails[0].value,
								"profile.linkedInPublicProfileUrl":
									profile._json.publicProfileUrl,
								"profile.imageUrl": profile.photos[0].value
							}
						}
					);
				}

				error = null;
				done(error, existingUser);
			} else {
				const newUserFromDB = await new UserCollection({
					auth: {
						linkedInId: profile.id,
						location: profile._json.location.name
					},
					profile: {
						name: profile.displayName,
						'emailInformation.email': profile.emails[0].value,
						linkedInPublicProfileUrl: profile._json.publicProfileUrl,
						imageUrl: profile.photos[0].value
					}
				}).save();
				done(null, newUserFromDB);
			}
		}
	)
);

// serializeUser generates the user token which the user sends back to the
// server on every request
// passport automatically stuffs token into cookie
// userFromDB.id is really the mongoDBUserId
passport.serializeUser((userFromDB, done) => {
	done(null, userFromDB.id);
});

// user makes request; browser automatically sends cookie
// passport looks into request.session to pull the id out
// and turns it back into the user
passport.deserializeUser((id, done) => {
	UserCollection.findById(id).then(userFromDB => {
		done(null, userFromDB);
	});
});
