const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { check, validationResult } = require("express-validator");
const { isAuthenticatedAdmin, isAuthTenant } = require("../util/helper");
const {
  loginTenant,
  logoutTenant,
  addRequest,
  updateRequest,
  getRequests,
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
  isAuthTenant,
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { category, description } = req.body;
      const userIdStr = req.user._id;
      const userId = new ObjectId(userIdStr);
      const request = await addRequest({
        userId,
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
router.post("/updateRequest", isAuthTenant, async (req, res) => {
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

//@route    POST api/tenant/requests
//@desc     Get Requests
//@access   Private
router.get("/requests", isAuthTenant, async (req, res) => {
  try {
    const userIdStr = req.user._id;
    const userId = new ObjectId(userIdStr);
    const requests = await getRequests({ userId });
    res.json({ requests });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMsg: error.message });
  }
});

module.exports = router;
