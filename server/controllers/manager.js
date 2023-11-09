const User = require("../models/User");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const { validationResult } = require("express-validator");

const loginManager = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    passport.authenticate("manager", (err, user, info) => {
      if (err) {
        throw err;
      }
      if (!user) {
        return res.status(409).json({ errorMsg: info });
      } else {
        req.logIn(user, async (err) => {
          if (err) {
            throw err;
          }
          res.json({ user });
        });
      }
    })(req, res, next);
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMsg: "Server Error" });
  }
};

const logoutManager = async (req, res) => {
  try {
    req.logout(function (err) {
      if (err) {
        console.error(err);
        return res.status(500).json({ errorMsg: "Logout failed" });
      }
      res.json({ msg: "Logged out successfully" });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMsg: "Server Error" });
  }
};

const addCrew = async ({
  userId,
  profession,
  name,
  email,
  password,
  phoneNumber,
}) => {
  try {
    let manager = await User.findOne({ _id: userId });
    if (!manager) {
      throw new Error("Manager not found");
    }
    const buildingId = manager.buildingId;
    let user = await User.findOne({ email });
    if (user) {
      throw new Error("Email is already taken");
    }
    const type = "crew";
    let crewFields = {
      buildingId,
      profession,
      name,
      email,
      password,
      phoneNumber,
      type,
    };
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);
    crewFields.password = encryptedPassword;
    user = new User(crewFields);
    user = await user.save();
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const updateCrew = async ({
  userId,
  profession,
  name,
  email,
  password,
  phoneNumber,
}) => {
  try {
    let user = await User.findOne({ email });
    if (user) {
      throw new Error("Email is already taken");
    }
    let crewFields = {};
    if (name) crewFields.name = name;
    if (email) crewFields.email = email;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const encryptedPassword = await bcrypt.hash(password, salt);
      crewFields.password = encryptedPassword;
    }
    if (profession) crewFields.profession = profession;
    if (phoneNumber) crewFields.phoneNumber = phoneNumber;
    const crew = await User.findByIdAndUpdate(
      userId,
      {
        $set: crewFields,
      },
      {
        new: true,
      }
    );
    return crew;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const removeCrew = async ({ userId, crewId }) => {
  try {
    let manager = await User.findById(userId);
    if (!manager) {
      throw new Error("Manager not found");
    }
    let crew = await User.findById(crewId);
    if (!crew) {
      throw new Error("Manager not found");
    }
    if (manager.buildingId.toString() !== crew.buildingId.toString()) {
      throw new Error("Crew Member is not of your building");
    }
    await User.findByIdAndRemove(crewId);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getCrew = async ({ buildingId }) => {
  try {
    const type = "crew";
    const crews = await User.find({ buildingId, type });
    return crews;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  loginManager,
  logoutManager,
  addCrew,
  updateCrew,
  removeCrew,
  getCrew,
};
