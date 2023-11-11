const User = require("../models/User");
const bcrypt = require("bcryptjs");
const localStrategy = require("passport-local").Strategy;

const IntializePassport = function (passport) {
  // Local strategy for regular users
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
