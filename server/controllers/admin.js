const User = require("../models/User");
const bcrypt = require("bcryptjs");
const passport = require("passport");

const { validationResult } = require("express-validator");
const Building = require("../models/Building");

const loginAdmin = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    passport.authenticate("admin", (err, user, info) => {
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

const logoutAdmin = async (req, res) => {
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

const registerAdmin = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const type = "admin";
    const { name, email, password, phoneNumber } = req.body;
    const userFound = await User.findOne({ email });
    if (userFound) {
      return res.status(409).json({ errorMsg: "Admin Already Exists" });
    }
    let userObj = {
      name,
      email,
      password,
      phoneNumber,
      type,
    };
    let user = new User(userObj);
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);
    user.password = encryptedPassword;
    user = await user.save();
    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMsg: "Server Error" });
  }
};

const getBuildings = async ({ userId }) => {
  try {
    const buildings = await Building.find({ userId });
    return buildings;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const addBuilding = async ({
  userId,
  title,
  address,
  numberOfFloors,
  type,
  parkingAvailability,
}) => {
  try {
    let buildingFields = {
      userId,
      title,
      address,
      numberOfFloors,
      type,
      parkingAvailability,
    };
    let building = new Building(buildingFields);
    building = await building.save();
    return building;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const updateBuilding = async ({
  userId,
  buildingId,
  title,
  address,
  numberOfFloors,
  type,
  parkingAvailability,
}) => {
  try {
    let building = await Building.findById(buildingId);
    if (!building) {
      throw new Error("Building not found");
    }
    if (building.userId.toString() !== userId.toString()) {
      throw new Error("Building is not of the User");
    }
    let buildingFields = {};
    if (title) buildingFields.title = title;
    if (address) buildingFields.address = address;
    if (numberOfFloors) buildingFields.numberOfFloors = numberOfFloors;
    if (type) buildingFields.type = type;
    if (parkingAvailability !== undefined)
      buildingFields.parkingAvailability = parkingAvailability;

    building = await Building.findByIdAndUpdate(
      buildingId,
      {
        $set: buildingFields,
      },
      {
        new: true,
      }
    );
    return building;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const removeBuilding = async ({ userId, buildingId }) => {
  try {
    let building = await Building.findById(buildingId);
    if (!building) {
      throw new Error("Building not found");
    }
    if (building.userId.toString() !== userId.toString()) {
      throw new Error("Building is not of the User");
    }
    await Building.findByIdAndRemove(buildingId);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const addManager = async ({
  buildingId,
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
    const type = "manager";
    let managerFields = {
      buildingId,
      name,
      email,
      password,
      phoneNumber,
      type,
    };
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);
    managerFields.password = encryptedPassword;
    user = new User(managerFields);
    user = await user.save();
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const updateManager = async ({
  buildingId,
  userId,
  name,
  email,
  password,
  phoneNumber,
}) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("Manager not found");
    }
    let managerFieldsFields = {};
    if (buildingId) managerFieldsFields.buildingId = buildingId;
    if (name) managerFieldsFields.name = name;
    if (email) managerFieldsFields.email = email;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const encryptedPassword = await bcrypt.hash(password, salt);
      managerFieldsFields.password = encryptedPassword;
    }
    if (phoneNumber) managerFieldsFields.phoneNumber = phoneNumber;
    const manager = await User.findByIdAndUpdate(
      userId,
      {
        $set: managerFieldsFields,
      },
      {
        new: true,
      }
    );
    return manager;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const removeManager = async ({ userId }) => {
  try {
    let user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    await User.findByIdAndRemove(userId);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getManagers = async ({ buildingId }) => {
  try {
    const type = "manager";
    const managers = await User.find({ buildingId, type });
    return managers;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  registerAdmin,
  loginAdmin,
  logoutAdmin,
  addBuilding,
  updateBuilding,
  removeBuilding,
  getBuildings,
  addManager,
  updateManager,
  removeManager,
  getManagers,
};
