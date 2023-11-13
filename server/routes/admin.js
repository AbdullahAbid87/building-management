const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const {
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
} = require("../controllers/admin");
const { check, validationResult } = require("express-validator");
const { isAuthenticatedAdmin } = require("../util/helper");
const { ObjectId } = mongoose.Types;

//@route    POST api/admin/register
//@desc     Register Admin
//@access   Public
router.post(
  "/register",
  [
    check("name", "Full Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("phoneNumber", "phoneNumber is required").not().isEmpty(),
    check("password", "Password is required").not().isEmpty(),
  ],
  registerAdmin
);

//@route    POST api/admin/login
//@desc     Login an Admin
//@access   Public
router.post(
  "/login",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").not().isEmpty(),
  ],
  loginAdmin
);

//@route    GET api/admin/logout
//@desc     Logout an Admin
//@access   Public
router.get("/logout", logoutAdmin);

//@route    POST api/admin/addBuilding
//@desc     Add a Building
//@access   Private
router.post(
  "/addBuilding",
  [
    check("title", "Title is required").not().isEmpty(),
    check("address", "Address is required").not().isEmpty(),
    check("numberOfFloors", "Number of floors is required")
      .not()
      .isEmpty()
      .isNumeric(),
    check("type", "Type is required").not().isEmpty(),
    check("parkingAvailability", "Parking availability is required")
      .not()
      .isEmpty()
      .isBoolean(),
  ],
  isAuthenticatedAdmin,
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { title, address, numberOfFloors, type, parkingAvailability } =
        req.body;
      const userIdStr = req.user._id;
      const userId = new ObjectId(userIdStr);
      const building = await addBuilding({
        userId,
        title,
        address,
        numberOfFloors,
        type,
        parkingAvailability,
      });
      res.json({ building });
    } catch (error) {
      console.log(error);
      res.status(500).json({ errorMsg: error.message });
    }
  }
);

//@route    POST api/admin/updateBuilding
//@desc     Update Building
//@access   Private
router.post("/updateBuilding", isAuthenticatedAdmin, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      buildingId,
      title,
      address,
      numberOfFloors,
      type,
      parkingAvailability,
    } = req.body;
    const userIdStr = req.user._id;
    const userId = new ObjectId(userIdStr);
    const building_Id = new ObjectId(buildingId);
    const building = await updateBuilding({
      userId,
      buildingId: building_Id,
      title,
      address,
      numberOfFloors,
      type,
      parkingAvailability,
    });
    res.json({ building });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMsg: error.message });
  }
});

//@route    POST api/admin/removeBuilding
//@desc     Remove Building
//@access   Private
router.post("/removeBuilding", isAuthenticatedAdmin, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { buildingId } = req.body;
    const userIdStr = req.user._id;
    const userId = new ObjectId(userIdStr);
    const building_Id = new ObjectId(buildingId);
    await removeBuilding({
      userId,
      buildingId: building_Id,
    });
    res.json({ msg: "Building was removed Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMsg: error.message });
  }
});

//@route    GET api/admin/getBuildings
//@desc     Get all buildings of an admin
//@access   Private
router.get("/getBuildings", isAuthenticatedAdmin, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const userIdStr = req.user._id;
    const userId = new ObjectId(userIdStr);
    const buildings = await getBuildings({
      userId,
    });
    res.json({ buildings });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMsg: error.message });
  }
});

//@route    POST api/admin/addManager
//@desc     Add an Manager
//@access   Private
router.post(
  "/addManager",
  [
    check("buildingId", "Building Id is required").not().isEmpty(),
    check("name", "Full Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("phoneNumber", "phoneNumber is required").not().isEmpty(),
    check("password", "Password is required").not().isEmpty(),
  ],
  isAuthenticatedAdmin,
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { buildingId, name, email, password, phoneNumber } = req.body;
      const building_Id = new ObjectId(buildingId);
      const manager = await addManager({
        buildingId: building_Id,
        name,
        email,
        password,
        phoneNumber,
      });
      res.json({ manager });
    } catch (error) {
      console.log(error);
      res.status(500).json({ errorMsg: error.message });
    }
  }
);

//@route    POST api/admin/updateManager
//@desc     Update Manager
//@access   Private
router.post("/updateManager", isAuthenticatedAdmin, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { managerId, buildingId, name, email, password, phoneNumber } =
      req.body;
    const userId = new ObjectId(managerId);
    const building_Id = new ObjectId(buildingId);
    const manager = await updateManager({
      buildingId: building_Id,
      userId,
      name,
      email,
      password,
      phoneNumber,
    });
    res.json({ manager });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMsg: error.message });
  }
});

//@route    POST api/admin/removeManager
//@desc     Remove Manager
//@access   Private
router.post("/removeManager", isAuthenticatedAdmin, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { managerId } = req.body;
    const userId = new ObjectId(managerId);
    await removeManager({
      userId,
    });
    res.json({ msg: "Manager was removed Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMsg: error.message });
  }
});

//@route    POST api/admin/getManagers
//@desc     Get all Managers
//@access   Private
router.get("/managers", isAuthenticatedAdmin, async (req, res) => {
  try {
    const managers = await getManagers();
    res.json({ managers });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMsg: error.message });
  }
});

module.exports = router;
