const User = require("../models/User");
const Building = require("../models/Building");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const { validationResult } = require("express-validator");
const Apartment = require("../models/Apartment");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

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
  buildingId,
  profession,
  name,
  email,
  password,
  phoneNumber,
}) => {
  try {
    let organizer = await User.findOne({ _id: userId });
    const isAdmin = organizer.type === "admin";
    let building_Id = "";
    if (isAdmin) {
      building_Id = buildingId;
    } else {
      building_Id = organizer.buildingId;
    }
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
  crewId,
  buildingId,
  profession,
  name,
  email,
  password,
  phoneNumber,
}) => {
  try {
    let organizer = await User.findById(userId);
    const isAdmin = organizer.type === "admin";

    let user = await User.findOne({ email });
    if (user) {
      throw new Error("Email is already taken");
    }
    let crewFields = {};
    if (isAdmin) {
      if (buildingId) {
        crewFields.buildingId = buildingId;
      }
    }
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
      crewId,
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
    let crew = await User.findById(crewId);
    if (!crew) {
      throw new Error("Crew Member is not found");
    }
    let organizer = await User.findById(userId);
    const isAdmin = organizer.type === "admin";
    if (!isAdmin) {
      const organizersBuildingId = organizer.buildingId;
      const crewBuildingId = crew.buildingId;
      if (organizersBuildingId.toString() !== crewBuildingId) {
        throw new Error("Crew Member is not of your building");
      }
    }
    await User.findByIdAndRemove(crewId);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getCrew = async ({ buildingId, userId }) => {
  try {
    let organizer = await User.findById(userId);
    const isAdmin = organizer.type === "admin";
    let crews = [];
    const type = "crew";
    if (isAdmin) {
      crews = await User.aggregate([
        {
          $match: {
            type,
          },
        },
        {
          $lookup: {
            from: "buildings",
            localField: "buildingId",
            foreignField: "_id",
            as: "building",
          },
        },
        {
          $unwind: "$building",
        },
      ]);
    } else {
      const managersBuildingId = organizer.buildingId;
      crews = await User.aggregate([
        {
          $match: {
            buildingId: managersBuildingId,
            type,
          },
        },
        {
          $lookup: {
            from: "buildings",
            localField: "buildingId",
            foreignField: "_id",
            as: "building",
          },
        },
        {
          $unwind: "$building",
        },
      ]);
    }

    return crews;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const addApartment = async ({
  userId,
  buildingId,
  apartmentTitle,
  numberOfBedrooms,
  numberOfBathrooms,
  floorLevel,
  monthlyRent,
}) => {
  try {
    let user = await User.findOne({ _id: userId });
    if (!user) {
      throw new Error("Manager not found");
    }
    const isAdmin = user.type === "admin";
    let BuildingId = isAdmin ? buildingId : user.buildingId;
    let apartmentFields = {
      buildingId: BuildingId,
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
  buildingId,
  apartmentTitle,
  numberOfBedrooms,
  numberOfBathrooms,
  floorLevel,
  monthlyRent,
}) => {
  try {
    let user = await User.findOne({ _id: userId });
    let apartment = await Apartment.findOne({ _id: apartmentId });
    if (!apartment) {
      throw new Error("Apartment not found");
    }
    const isAdmin = user.type === "admin";
    let apartmentFields = {};
    if (isAdmin) {
      apartmentFields.buildingId = buildingId;
    } else {
      const managersBuildingId = user.buildingId;
      apartmentFields.buildingId = managersBuildingId;
    }

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
    let user = await User.findById(userId);
    const isAdmin = user.type === "admin";
    let apartment = await Apartment.findById(apartmentId);
    if (!apartment) {
      throw new Error("Apartment not found");
    }
    if (!isAdmin) {
      if (user.buildingId.toString() !== apartment.buildingId.toString()) {
        throw new Error("Apartment is not under your management");
      }
    }
    await Apartment.findByIdAndRemove(apartmentId);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getApartments = async ({ userId }) => {
  try {
    let user = await User.findById(userId);
    const isAdmin = user.type === "admin";
    let apartments = [];
    if (isAdmin) {
      apartments = await Apartment.aggregate([
        {
          $lookup: {
            from: "buildings",
            localField: "buildingId",
            foreignField: "_id",
            as: "building",
          },
        },
        {
          $unwind: "$building",
        },
      ]);
    } else {
      const managersBuildingId = user.buildingId;
      apartments = await Apartment.aggregate([
        {
          $match: {
            buildingId: managersBuildingId,
          },
        },
        {
          $lookup: {
            from: "buildings",
            localField: "buildingId",
            foreignField: "_id",
            as: "building",
          },
        },
        {
          $unwind: "$building",
        },
      ]);
    }
    return apartments;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const addTenant = async ({
  userId,
  apartmentId,
  buildingId,
  name,
  email,
  password,
  phoneNumber,
}) => {
  try {
    let organizer = await User.findOne({ _id: userId });
    const isAdmin = organizer.type === "admin";
    let building_Id = "";
    if (isAdmin) {
      building_Id = buildingId;
    } else {
      building_Id = organizer.buildingId;
    }
    let user = await User.findOne({ email });
    if (user) {
      throw new Error("Email is already taken");
    }
    const type = "tenant";
    const apartmentIds = apartmentId.map((item) => new ObjectId(item));
    let tenantFields = {
      buildingId: building_Id,
      apartmentId: apartmentIds,
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
    let tenant = await User.findById(tenantId);
    if (!tenant) {
      throw new Error("Tenant not found");
    }
    let organizer = await User.findById(userId);
    const isAdmin = organizer.type === "admin";
    if (!isAdmin) {
      const organizersBuildingId = organizer.buildingId;
      const tenantsBuildingId = tenant.buildingId;
      if (organizersBuildingId.toString() !== tenantsBuildingId) {
        throw new Error("Tenant is not of your building");
      }
    }
    await User.findByIdAndRemove(tenantId);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getTenants = async ({ userId }) => {
  try {
    let user = await User.findById(userId);
    const isAdmin = user.type === "admin";
    let tenants = [];
    const type = "tenant";
    if (isAdmin) {
      tenants = await User.aggregate([
        {
          $match: {
            type,
          },
        },
        {
          $lookup: {
            from: "buildings",
            localField: "buildingId",
            foreignField: "_id",
            as: "building",
          },
        },
        {
          $unwind: "$building",
        },
        {
          $lookup: {
            from: "apartments",
            localField: "apartmentId",
            foreignField: "_id",
            as: "apartment",
          },
        },
      ]);
    } else {
      const managersBuildingId = user.buildingId;
      tenants = await User.aggregate([
        {
          $match: {
            buildingId: managersBuildingId,
            type,
          },
        },
        {
          $lookup: {
            from: "buildings",
            localField: "buildingId",
            foreignField: "_id",
            as: "building",
          },
        },
        {
          $unwind: "$building",
        },
        {
          $lookup: {
            from: "apartments",
            localField: "apartmentId",
            foreignField: "_id",
            as: "apartment",
          },
        },
      ]);
    }
    return tenants;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getAvailableApartments = async () => {
  try {
    let apartments = [];
    if (apartments) {
      apartments = await Apartment.aggregate([
        {
          $lookup: {
            from: "users",
            localField: "_id",
            foreignField: "apartmentId",
            as: "assignedUsers",
          },
        },
        {
          $match: {
            assignedUsers: { $size: 0 },
          },
        },
      ]);
    }
    return apartments;
  } catch (error) {
    console.error(error);
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
  getAvailableApartments,
};
