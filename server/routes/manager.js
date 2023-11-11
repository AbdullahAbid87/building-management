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
  addApartment,
  updateApartment,
  removeApartment,
  getApartments,
  addTenant,
  updateTenant,
  removeTenant,
  getTenants,
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

//@route    POST api/manager/addApartment
//@desc     Add an Apartment
//@access   Private
router.post(
  "/addApartment",
  [
    check("apartmentTitle", "Apartment Title is required").not().isEmpty(),
    check("numberOfBedrooms", "Number of Bedrooms is required")
      .not()
      .isEmpty()
      .isNumeric(),
    check("numberOfBathrooms", "Number of Bathrooms is required")
      .not()
      .isEmpty()
      .isNumeric(),
    check("floorLevel", "Floor Level is required").not().isEmpty().isNumeric(),
    check("monthlyRent", "Monthly Rent is required")
      .not()
      .isEmpty()
      .isNumeric(),
  ],
  isAuthManagerOrHigher,
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const {
        apartmentTitle,
        numberOfBedrooms,
        numberOfBathrooms,
        floorLevel,
        monthlyRent,
      } = req.body;
      const userIdStr = req.user._id;
      const userId = new ObjectId(userIdStr);
      const apartment = await addApartment({
        userId,
        apartmentTitle,
        numberOfBedrooms,
        numberOfBathrooms,
        floorLevel,
        monthlyRent,
      });
      res.json({ apartment });
    } catch (error) {
      console.log(error);
      res.status(500).json({ errorMsg: error.message });
    }
  }
);

//@route    POST api/manager/updateApartment
//@desc     Update an Apartment
//@access   Private
router.post("/updateApartment", isAuthManagerOrHigher, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      apartmentId,
      apartmentTitle,
      numberOfBedrooms,
      numberOfBathrooms,
      floorLevel,
      monthlyRent,
    } = req.body;
    const userIdStr = req.user._id;
    const userId = new ObjectId(userIdStr);
    const apartment_id = new ObjectId(apartmentId);
    const apartment = await updateApartment({
      userId,
      apartmentId: apartment_id,
      apartmentTitle,
      numberOfBedrooms,
      numberOfBathrooms,
      floorLevel,
      monthlyRent,
    });
    res.json({ apartment });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMsg: error.message });
  }
});

//@route    POST api/manager/removeApartment
//@desc     Remove an Apartment
//@access   Private
router.post("/removeApartment", isAuthManagerOrHigher, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { apartmentId } = req.body;
    const userIdStr = req.user._id;
    const userId = new ObjectId(userIdStr);
    const apartment_Id = new ObjectId(apartmentId);
    await removeApartment({
      userId,
      apartmentId: apartment_Id,
    });
    res.json({ msg: "Apartment was removed Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMsg: error.message });
  }
});

//@route    POST api/manager/removeCrew
//@desc     Remove a Crew Member
//@access   Private
router.get("/apartments", isAuthManagerOrHigher, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const userIdStr = req.user._id;
    const userId = new ObjectId(userIdStr);
    const apartments = await getApartments({
      userId,
    });
    res.json({ apartments });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMsg: error.message });
  }
});

//@route    POST api/manager/addTenant
//@desc     Add a Tenant
//@access   Private
router.post(
  "/addTenant",
  [
    check("name", "Full Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("phoneNumber", "phoneNumber is required").not().isEmpty(),
    check("password", "Password is required").not().isEmpty(),
    check("apartmentId", "Apartment Id is required").not().isEmpty(),
  ],
  isAuthManagerOrHigher,
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { apartmentId, name, email, password, phoneNumber } = req.body;
      const userIdStr = req.user._id;
      const userId = new ObjectId(userIdStr);
      const apartment_id = new ObjectId(apartmentId);
      const tenant = await addTenant({
        userId,
        apartmentId: apartment_id,
        name,
        email,
        password,
        phoneNumber,
      });
      res.json({ tenant });
    } catch (error) {
      console.log(error);
      res.status(500).json({ errorMsg: error.message });
    }
  }
);

//@route    POST api/manager/updateTenant
//@desc     Update a Tenant
//@access   Private
router.post("/updateTenant", isAuthManagerOrHigher, async (req, res) => {
  try {
    const { tenantId, apartmentId, name, email, password, phoneNumber } =
      req.body;
    const userId = new ObjectId(tenantId);
    const tenant = await updateTenant({
      userId,
      apartmentId,
      name,
      email,
      password,
      phoneNumber,
    });
    res.json({ tenant });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMsg: error.message });
  }
});

//@route    POST api/manager/removeTenant
//@desc     Remove Tenant
//@access   Private
router.post("/removeTenant", isAuthManagerOrHigher, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { tenantId } = req.body;
    const userIdStr = req.user._id;
    const userId = new ObjectId(userIdStr);
    const tenant_Id = new ObjectId(tenantId);
    await removeTenant({
      userId,
      tenantId: tenant_Id,
    });
    res.json({ msg: "Tenant was removed Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMsg: error.message });
  }
});

//@route    POST api/manager/tenants
//@desc     Get Tenants
//@access   Private
router.get("/tenants", isAuthManagerOrHigher, async (req, res) => {
  try {
    const userIdStr = req.user._id;
    const userId = new ObjectId(userIdStr);
    const tenants = await getTenants({
      userId,
    });
    res.json({ tenants });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMsg: error.message });
  }
});

module.exports = router;
