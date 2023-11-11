const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { check, validationResult } = require("express-validator");
const { loginCrew, logoutCrew } = require("../controllers/crew");

const { ObjectId } = mongoose.Types;

//@route    POST api/tenant/login
//@desc     Login a Crew Member
//@access   Public
router.post(
  "/login",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").not().isEmpty(),
  ],
  loginCrew
);

//@route    GET api/tenant/logout
//@desc     Logout a Crew Member
//@access   Public
router.get("/logout", logoutCrew);


module.exports = router;
