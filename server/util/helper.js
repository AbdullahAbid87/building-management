const isAuthenticatedAdmin = (req, res, next) => {
  if (req.isAuthenticated("admin")) {
    return next();
  } else {
    return res
      .status(401)
      .json({ errorMsg: "Unauthorized Access: Admin Access Only" });
  }
};

const isAuthManagerOrHigher = (req, res, next) => {
  if (req.isAuthenticated("admin") || req.isAuthenticated("manager")) {
    return next();
  } else {
    return res.status(401).json({ errorMsg: "Unauthorized Access" });
  }
};

module.exports = {
  isAuthenticatedAdmin,
  isAuthManagerOrHigher,
};
