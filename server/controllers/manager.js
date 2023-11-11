const User = require("../models/User");
const Building = require("../models/Building");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const { validationResult } = require("express-validator");
const Apartment = require("../models/Apartment");

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

const addApartment = async ({
  userId,
  apartmentTitle,
  numberOfBedrooms,
  numberOfBathrooms,
  floorLevel,
  monthlyRent,
}) => {
  try {
    let manager = await User.findOne({ _id: userId });
    if (!manager) {
      throw new Error("Manager not found");
    }
    const managersBuildingId = manager.buildingId;
    let apartmentFields = {
      buildingId: managersBuildingId,
      apartmentTitle,
      numberOfBedrooms,
      numberOfBathrooms,
      floorLevel,
      monthlyRent,
    };
    let apartment = new Apartment(apartmentFields);
    apartment = await apartment.save();
    return apartment;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const updateApartment = async ({
  userId,
  apartmentId,
  apartmentTitle,
  numberOfBedrooms,
  numberOfBathrooms,
  floorLevel,
  monthlyRent,
}) => {
  try {
    let manager = await User.findOne({ _id: userId });
    if (!manager) {
      throw new Error("Manager not found");
    }
    let apartment = await Apartment.findOne({ _id: apartmentId });
    if (!apartment) {
      throw new Error("Apartment not found");
    }
    const managersBuildingId = manager.buildingId;
    let apartmentFields = {};
    apartmentFields.buildingId = managersBuildingId;
    if (apartmentTitle) apartmentFields.apartmentTitle = apartmentTitle;
    if (numberOfBedrooms) apartmentFields.numberOfBedrooms = numberOfBedrooms;
    if (numberOfBathrooms)
      apartmentFields.numberOfBathrooms = numberOfBathrooms;
    if (floorLevel) apartmentFields.floorLevel = floorLevel;
    if (monthlyRent) apartmentFields.monthlyRent = monthlyRent;
    apartment = await Apartment.findByIdAndUpdate(
      apartmentId,
      {
        $set: apartmentFields,
      },
      {
        new: true,
      }
    );
    return apartment;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const removeApartment = async ({ userId, apartmentId }) => {
  try {
    let manager = await User.findById(userId);
    if (!manager) {
      throw new Error("Manager not found");
    }
    let apartment = await Apartment.findById(apartmentId);
    if (!apartment) {
      throw new Error("Apartment not found");
    }
    if (manager.buildingId.toString() !== apartment.buildingId.toString()) {
      throw new Error("Apartment is not under your management");
    }
    await Apartment.findByIdAndRemove(apartmentId);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getApartments = async ({ userId }) => {
  try {
    let manager = await User.findById(userId);
    if (!manager) {
      throw new Error("Manager not found");
    }
    const managersBuildingId = manager.buildingId;
    const apartments = await Apartment.find({ buildingId: managersBuildingId });
    return apartments;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const addTenant = async ({
  userId,
  apartmentId,
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
    const type = "tenant";
    let tenantFields = {
      buildingId,
      apartmentId,
      name,
      email,
      password,
      phoneNumber,
      type,
    };
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);
    tenantFields.password = encryptedPassword;
    user = new User(tenantFields);
    user = await user.save();
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const updateTenant = async ({
  userId,
  apartmentId,
  name,
  email,
  password,
  phoneNumber,
}) => {
  try {
    let user = await User.findById(userId);
    let userType = user.type;
    if (userType !== "tenant") {
      throw new Error("Passed User Id is not of a Tenant");
    }
    user = await User.findOne({ email });
    if (user) {
      throw new Error("Email is already taken");
    }
    let tenantFields = {};
    if (name) tenantFields.name = name;
    if (email) tenantFields.email = email;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const encryptedPassword = await bcrypt.hash(password, salt);
      tenantFields.password = encryptedPassword;
    }
    if (apartmentId) {
      const apartment = await Apartment.findById(apartmentId);
      if (!apartment) {
        throw new Error("Apartment Not found");
      }
      tenantFields.apartmentId = apartmentId;
    }
    if (phoneNumber) tenantFields.phoneNumber = phoneNumber;
    const tenant = await User.findByIdAndUpdate(
      userId,
      {
        $set: tenantFields,
      },
      {
        new: true,
      }
    );
    return tenant;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const removeTenant = async ({ userId, tenantId }) => {
  try {
    let manager = await User.findById(userId);
    if (!manager) {
      throw new Error("Manager not found");
    }
    let tenant = await User.findById(tenantId);
    if (!tenant) {
      throw new Error("Tenant not found");
    }
    const managersBuildingId = manager.buildingId;
    const tenantsBuildingId = tenant.buildingId;
    if (managersBuildingId.toString() !== tenantsBuildingId) {
      throw new Error("Tenant is not of your building");
    }
    await User.findByIdAndRemove(tenantId);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getTenants = async ({ userId }) => {
  try {
    let manager = await User.findById(userId);
    if (!manager) {
      throw new Error("Manager not found");
    }
    const managersBuildingId = manager.buildingId;
    const type = "tenant";
    const tenants = await User.find({
      buildingId: managersBuildingId,
      type,
    });
    return tenants;
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
  addApartment,
  updateApartment,
  removeApartment,
  getApartments,
  addTenant,
  updateTenant,
  removeTenant,
  getTenants,
};
