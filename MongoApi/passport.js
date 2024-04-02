const passport=require('passport')
const GoogleStrategy=require("passport-google-oauth20").Strategy


passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.CLIENT_ID,
			clientSecret: process.env.CLIENT_SECRET,
			callbackURL: "http://localhost:7776/auth/google/callback",
			scope: ["profile", "email"],
			// passReqToCallback:true
		},
		function (accessToken, refreshToken, profile, done) {
            // console.log('profile data');
            // console.log(profile);
			 // Vérification de l'utilisateur
			 if (profile) {
				return done(null, profile);
			} else {
				return done(new Error('Erreur lors de la vérification de l\'utilisateur'));
			}


		
		}

		
	)
);

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});




// var GoogleStrategy = require('passport-google-oauth20').Strategy;

// passport.use(new GoogleStrategy({
//     clientID: GOOGLE_CLIENT_ID,
//     clientSecret: GOOGLE_CLIENT_SECRET,
//     callbackURL: "http://www.example.com/auth/google/callback"
//   },
//   function(accessToken, refreshToken, profile, cb) {
//     User.findOrCreate({ googleId: profile.id }, function (err, user) {
//       return cb(err, user);
//     });
//   }
// ));