const User = require("../models/User");
const bcrypt = require("bcryptjs");
const passport = require("passport");

const { validationResult } = require("express-validator");
const Building = require("../models/Building");
const Request = require("../models/Request");
const Apartment = require("../models/Apartment");

const loginTenant = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    passport.authenticate("tenant", (err, user, info) => {
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

const logoutTenant = async (req, res) => {
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

const addRequest = async ({ userId, apartmentId, category, description }) => {
  try {
    let user = await User.findById(userId);
    const buildingId = user.buildingId;
    let requestFields = {
      userId,
      buildingId,
      apartmentId,
      category,
      description,
    };
    let request = new Request(requestFields);
    request = await request.save();
    return request;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getRequests = async ({ userId }) => {
  try {
    let user = await User.findById(userId);

    const userType = user.type;
    const isAdmin = userType === "admin";
    const isManager = userType === "manager";
    const isCrew = userType === "crew";

    let requests = [];
    if (isAdmin) {
      requests = await Request.aggregate([
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "user",
          },
        },
        {
          $unwind: "$user",
        },
        {
          $lookup: {
            from: "users",
            localField: "handymenId",
            foreignField: "_id",
            as: "handymen",
          },
        },
        {
          $lookup: {
            from: "buildings",
            localField: "user.buildingId",
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
        {
          $unwind: "$apartment",
        },
      ]);
    } else if (isManager) {
      const buildingId = user.buildingId;
      requests = await Request.aggregate([
        {
          $match: {
            buildingId,
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "user",
          },
        },
        {
          $unwind: "$user",
        },
        {
          $lookup: {
            from: "users",
            localField: "handymenId",
            foreignField: "_id",
            as: "handymen",
          },
        },
        {
          $lookup: {
            from: "buildings",
            localField: "user.buildingId",
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
        {
          $unwind: "$apartment",
        },
      ]);
    } else if (isCrew) {
      requests = await Request.aggregate([
        {
          $match: {
            handymenId: userId, // Match based on the userId passed
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "user",
          },
        },
        {
          $unwind: "$user",
        },
        {
          $lookup: {
            from: "buildings",
            localField: "user.buildingId",
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
        {
          $unwind: "$apartment",
        },
      ]);
    } else {
      requests = await Request.aggregate([
        {
          $match: {
            userId: userId, // Match based on the userId passed
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "user",
          },
        },
        {
          $unwind: "$user",
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
        {
          $unwind: "$apartment",
        },
      ]);
    }

    console.log(requests);
    return requests;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const updateRequest = async ({
  requestId,
  userId,
  category,
  description,
  handymenId,
  status,
}) => {
  try {
    let request = await Request.findById(requestId);
    if (!request) {
      throw new Error("Maintainence Request not found");
    }
    let requestUser = request.userId;
    const user = await User.findById(userId);
    const userType = user.type;
    const isTenant = userType === "tenant";
    if (isTenant) {
      if (userId.toString() !== requestUser.toString()) {
        throw new Error("Maintainence Request is not yours");
      }
    }
    let requestFields = {};
    if (description) requestFields.description = description;
    if (!isTenant) {
      if (category) requestFields.category = category;
      if (handymenId) {
        const type = "crew";
        const handymen = await User.findOne({ handymenId, type });
        if (handymen) {
          throw new Error("Handyman not found");
        }
        requestFields.handymenId = handymenId;
      }
      if (status) requestFields.status = status;
    }
    request = await Request.findByIdAndUpdate(
      requestId,
      {
        $set: requestFields,
      },
      {
        new: true,
      }
    );
    return request;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const updateProfile = async ({ userId, name, phoneNumber }) => {
  try {
    let user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    let userFields = {};
    if (name) userFields.name = name;
    if (phoneNumber) userFields.phoneNumber = phoneNumber;

    user = await User.findByIdAndUpdate(
      userId,
      {
        $set: userFields,
      },
      {
        new: true,
      }
    );
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getApartments = async ({ userId }) => {
  try {
    const user = await User.findById(userId);
    const apartmentIds = user.apartmentId;
    let apartments = [];
    if (apartmentIds) {
      apartments = await Apartment.find({
        _id: { $in: apartmentIds },
      });
    }
    return apartments;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  loginTenant,
  logoutTenant,
  addRequest,
  updateRequest,
  getRequests,
  getApartments,
  updateProfile,
};
