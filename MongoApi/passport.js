const passport=require('passport')
const GoogleStrategy=require("passport-google-oauth20").Strategy


passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.CLIENT_ID,
			clientSecret: process.env.CLIENT_SECRET,
			callbackURL: "http://localhost:7780/auth/google/callback",
			scope: ["profile", "email"],
			// passReqToCallback:true
		},
		function (accessToken, refreshToken, profile, done) {
			 if (profile) {
				return done(null, profile);
			} else {
				return done(new Error('Erreur lors de la vérification de l\'utilisateur'));
			}
		
		}

		
	)
);


const GithubStrategy=require("passport-github2").Strategy
GITHUB_CLIENT_ID="33c2904a2c0efacb2514"
GITHUB_CLIENT_SECRET="4355d7a709e5450ab881c4fc21e315f0968a8034"

passport.use(
	new GithubStrategy(
		{
			clientID: process.env.GITHUB_CLIENT_ID,
			clientSecret: process.env.GITHUB_CLIENT_SECRET,
			callbackURL: "http://localhost:7780/auth/github/callback",
			scope: ["profile", "email"],
			// passReqToCallback:true
		},
		function (accessToken, refreshToken, profile, done) {
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