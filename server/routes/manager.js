const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { check, validationResult } = require("express-validator");
const { isAuthManagerOrHigher } = require("../util/helper");
const {
  loginManager,
  logoutManager,
  addCrew,
  updateCrew,
  removeCrew,
  getCrew,
} = require("../controllers/manager");
const { ObjectId } = mongoose.Types;

//@route    POST api/manager/login
//@desc     Login an Manager
//@access   Public
router.post(
  "/login",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").not().isEmpty(),
  ],
  loginManager
);

//@route    GET api/manager/logout
//@desc     Logout an Manager
//@access   Public
router.get("/logout", logoutManager);

//@route    POST api/manager/addCrew
//@desc     Add an Crew Member
//@access   Private
router.post(
  "/addCrew",
  [
    check("name", "Full Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("phoneNumber", "phoneNumber is required").not().isEmpty(),
    check("password", "Password is required").not().isEmpty(),
    check("profession", "Profession is required").not().isEmpty(),
  ],
  isAuthManagerOrHigher,
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { profession, name, email, password, phoneNumber } = req.body;
      const userIdStr = req.user._id;
      const userId = new ObjectId(userIdStr);
      const crew = await addCrew({
        userId,
        profession,
        name,
        email,
        password,
        phoneNumber,
      });
      res.json({ crew });
    } catch (error) {
      console.log(error);
      res.status(500).json({ errorMsg: error.message });
    }
  }
);

//@route    POST api/manager/updateCrew
//@desc     Update a Crew Member
//@access   Private
router.post("/updateCrew", isAuthManagerOrHigher, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { crewId, profession, name, email, password, phoneNumber } = req.body;
    const userId = new ObjectId(crewId);
    const crew = await updateCrew({
      userId,
      profession,
      name,
      email,
      password,
      phoneNumber,
    });
    res.json({ crew });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMsg: error.message });
  }
});

//@route    POST api/manager/removeCrew
//@desc     Remove a Crew Member
//@access   Private
router.post("/removeCrew", isAuthManagerOrHigher, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { crewId } = req.body;
    const userIdStr = req.user._id;
    const userId = new ObjectId(userIdStr);
    const crew_Id = new ObjectId(crewId);
    await removeCrew({
      userId,
      crewId: crew_Id,
    });
    res.json({ msg: "Crew was removed Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMsg: error.message });
  }
});

//@route    POST api/manager/removeCrew
//@desc     Remove a Crew Member
//@access   Private
router.post("/crew", isAuthManagerOrHigher, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { buildingId } = req.body;
    const building_Id = new ObjectId(buildingId);
    const crews = await getCrew({
      buildingId: building_Id,
    });
    res.json({ crews });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMsg: error.message });
  }
});

module.exports = router;
