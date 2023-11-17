const User = require("../models/User");
const bcrypt = require("bcryptjs");
const localStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const CustomStrategy = require("passport-custom").Strategy;

const IntializePassport = function (passport) {
  passport.use(
    "google",
    new GoogleStrategy(
      {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "/api/tenant/google/callback",
        scope: ["profile", "email"],
      },
      async (accessToken, refreshToken, profile, done) => {
        const email = profile.emails[0].value;
        const user = await User.findOne({ email: email });
        if (!user) {
          return done(null, false, "Account not found");
        }
        done(null, user);
      }
    )
  );

  // Local strategy for Admin
  passport.use(
    "admin",
    new localStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        try {
          const user = await User.findOne({ email: email });
          if (!user) {
            return done(null, false, "No user found with this email address");
          }
          if (user.type !== "admin") {
            return done(null, false, "Account is not an Admin");
          }
          const isMatch = await bcrypt.compare(password, user.password);
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, "Incorrect password");
          }
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    "google-admin",
    new CustomStrategy(async (req, done) => {
      const email = req.body.email; // Assuming the email is sent from the frontend

      try {
        const user = await User.findOne({ email: email });
        if (!user) {
          return done(null, false, "No user found with this email address");
        }
        if (user.type !== "admin") {
          return done(null, false, "Account is not an Admin");
        }
        return done(null, user);
      } catch (error) {
        console.log(error);
        return done(error);
      }
    })
  );
  // Local strategy for Manager
  passport.use(
    "manager",
    new localStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        try {
          const user = await User.findOne({ email: email });
          if (!user) {
            return done(null, false, "No user found with this email address");
          }
          if (user.type !== "manager") {
            return done(null, false, "Account is not a Manager");
          }
          const isMatch = await bcrypt.compare(password, user.password);
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, "Incorrect password");
          }
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    "google-manager",
    new CustomStrategy(async (req, done) => {
      const email = req.body.email;
      try {
        const user = await User.findOne({ email: email });
        if (!user) {
          return done(null, false, "No user found with this email address");
        }
        if (user.type !== "manager") {
          return done(null, false, "Account is not a Manager");
        }
        return done(null, user);
      } catch (error) {
        console.log(error);
        return done(error);
      }
    })
  );

  passport.use(
    "tenant",
    new localStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        try {
          const user = await User.findOne({ email: email });
          if (!user) {
            return done(null, false, "No user found with this email address");
          }
          if (user.type !== "tenant") {
            return done(null, false, "Account is not a Tenant");
          }
          const isMatch = await bcrypt.compare(password, user.password);
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, "Incorrect password");
          }
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    "google-tenant",
    new CustomStrategy(async (req, done) => {
      const email = req.body.email;
      try {
        const user = await User.findOne({ email: email });
        if (!user) {
          return done(null, false, "No user found with this email address");
        }
        if (user.type !== "tenant") {
          return done(null, false, "Account is not a Tenant");
        }
        return done(null, user);
      } catch (error) {
        console.log(error);
        return done(error);
      }
    })
  );

  passport.use(
    "crew",
    new localStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        try {
          const user = await User.findOne({ email: email });
          if (!user) {
            return done(null, false, "No user found with this email address");
          }
          if (user.type !== "crew") {
            return done(null, false, "Account is not a Crew Member");
          }
          const isMatch = await bcrypt.compare(password, user.password);
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, "Incorrect password");
          }
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    "google-crew",
    new CustomStrategy(async (req, done) => {
      const email = req.body.email;
      try {
        const user = await User.findOne({ email: email });
        if (!user) {
          return done(null, false, "No user found with this email address");
        }
        if (user.type !== "crew") {
          return done(null, false, "Account is not a Crew Member");
        }
        return done(null, user);
      } catch (error) {
        console.log(error);
        return done(error);
      }
    })
  );


  // Serialize and deserialize user functions remain the same
  passport.serializeUser((user, cb) => {
    cb(null, user.id);
  });

  passport.deserializeUser(async (id, cb) => {
    try {
      const user = await User.findOne({ _id: id }, { password: 0 });
      return cb(null, user);
    } catch (error) {
      return cb(error);
    }
  });
};

module.exports = IntializePassport;
