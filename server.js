// app name = portal2-okta
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const OktaStrategy = require("passport-okta-oauth").Strategy;
const path = require("path");
require("dotenv").config();

const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
const PORT = process.env.PORT || 3000;

//this below info is collected from creating an application on the okta dashboard
const OKTA_CLIENT_ID = process.env.OKTA_CLIENT_ID;
const OKTA_CLIENT_SECRET = process.env.OKTA_CLIENT_SECRET;
const OKTA_DOMAIN = process.env.OKTA_DOMAIN;
const OKTA_CALLBACK_URL = `http://localhost:3000/${process.env.OKTA_CALLBACK_URL}/`;

// Passport session setup
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

// Use the OktaStrategy within Passport
passport.use(
  new OktaStrategy(
    {
      audience: `https://${OKTA_DOMAIN}`,
      clientID: OKTA_CLIENT_ID,
      clientSecret: OKTA_CLIENT_SECRET,
      callbackURL: OKTA_CALLBACK_URL,
      scope: ["openid", "profile", "email"],
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);

// Express session setup
app.use(
  session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Route to initiate login
app.get("/login", passport.authenticate("okta"));

// Route to handle the OAuth2 callback
app.get(
  "/callback",
  passport.authenticate("okta", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("/");
  }
);

// Home route
app.get("/", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("index", { userName: req.user.displayName });
  } else {
    res.send('Please <a href="/login">login</a>');
  }
});

// // Logout route
// app.get("/logout", (req, res) => {
//   console.log("logging out now");
//   req.logout(); // Logs the user out of the local session
//   req.session.destroy(() => {
//     const oktaLogoutUrl = `https://${OKTA_DOMAIN}/oauth2/default/v1/logout?id_token_hint=${req.user.idToken}&post_logout_redirect_uri=http://localhost:3000`;
//     res.redirect(oktaLogoutUrl);
//   });
// });
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
