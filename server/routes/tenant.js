const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { check, validationResult } = require("express-validator");
const {
  isAuthenticatedAdmin,
  isAuthTenantOrHigher,
} = require("../util/helper");
const {
  loginTenant,
  logoutTenant,
  addRequest,
  updateRequest,
  getRequests,
  getApartments,
  updateProfile,
} = require("../controllers/tenant");
const { ObjectId } = mongoose.Types;

//@route    POST api/tenant/login
//@desc     Login a Tenant
//@access   Public
router.post(
  "/login",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").not().isEmpty(),
  ],
  loginTenant
);

//@route    GET api/tenant/logout
//@desc     Logout an Admin
//@access   Public
router.get("/logout", logoutTenant);

//@route    POST api/tenant/addRequest
//@desc     Add a Request
//@access   Private
router.post(
  "/addRequest",
  [
    check("category", "Category is required").not().isEmpty(),
    check("description", "Description is required").not().isEmpty(),
  ],
  isAuthTenantOrHigher,
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { apartmentId, category, description } = req.body;
      const userIdStr = req.user._id;
      const userId = new ObjectId(userIdStr);
      const apartment_Id = new ObjectId(apartmentId);
      const request = await addRequest({
        userId,
        apartmentId: apartment_Id,
        category,
        description,
      });
      res.json({ request });
    } catch (error) {
      console.log(error);
      res.status(500).json({ errorMsg: error.message });
    }
  }
);

//@route    POST api/tenant/updateRequest
//@desc     Update a Request
//@access   Private
router.post("/updateRequest", isAuthTenantOrHigher, async (req, res) => {
  try {
    const { requestId, category, description, handymenId, status } = req.body;
    const userIdStr = req.user._id;
    const userId = new ObjectId(userIdStr);
    const request = await updateRequest({
      requestId,
      userId,
      category,
      description,
      handymenId,
      status,
    });
    res.json({ request });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMsg: error.message });
  }
});

//@route    POST api/tenant/updateProfile
//@desc     Update a Request
//@access   Private
router.post("/updateProfile", isAuthTenantOrHigher, async (req, res) => {
  try {
    const { name, phoneNumber } = req.body;
    const userIdStr = req.user._id;
    const userId = new ObjectId(userIdStr);
    const user = await updateProfile({
      userId,
      name,
      phoneNumber,
    });
    res.json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMsg: error.message });
  }
});

//@route    POST api/tenant/requests
//@desc     Get Requests
//@access   Private
router.get("/requests", isAuthTenantOrHigher, async (req, res) => {
  try {
    const userIdStr = req.user._id;
    const userId = new ObjectId(userIdStr);
    const requests = await getRequests({ userId });
    console.log(requests);
    res.json({ requests });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMsg: error.message });
  }
});

//@route    POST api/tenant/apartments
//@desc     Get Apartments
//@access   Private
router.get("/apartments", isAuthTenantOrHigher, async (req, res) => {
  try {
    const userIdStr = req.user._id;
    const userId = new ObjectId(userIdStr);
    const apartments = await getApartments({ userId });
    res.json({ apartments });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMsg: error.message });
  }
});

module.exports = router;
