const User = require("../models/User");
const bcrypt = require("bcryptjs");
const passport = require("passport");

const { validationResult } = require("express-validator");
const Building = require("../models/Building");
const Request = require("../models/Request");

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

const addRequest = async ({ userId, category, description }) => {
  try {
    let requestFields = {
      userId,
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
    if (userType === "tenant") {
      if (userId.toString() !== requestUser.toString()) {
        throw new Error("Maintainence Request is not yours");
      }
    }
    let requestFields = {};
    if (category) requestFields.category = category;
    if (description) requestFields.description = description;
    if (handymenId) {
      const handymen = await User.findById(handymenId);
      if (handymen) {
        throw new Error("Handyman not found");
      }
      requestFields.handymenId = handymenId;
    }
    if (status) requestFields.status = status;

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

const getRequests = async ({ userId }) => {
  try {
    const requests = await Request.find({ userId });
    return requests;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  loginTenant,
  logoutTenant,
  addRequest,
  updateRequest,
  getRequests,
};
