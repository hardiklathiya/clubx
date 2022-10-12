const jwt = require("jsonwebtoken");
const User = require("../models/user");
const auth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      res.status(401).json({ message: "Please try to login with valid token" });
    }
    const VerifiedData = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(VerifiedData.id);
    next();
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const authRoles = (...roles) => {
  return async (req, res, next) => {
    //* suppose we have admin in roles array and also admin mentioned in req.user.role means in database then below if conditions will excute

    //*in short only admin is allowed to access this route
    if (!roles.includes(req.user.role)) {
      res.status(403).json({
        message: `role : ${req.user.role} does not allow to access this resource`,
      });
    } else {
      next();
    }
  };
};
module.exports = { auth, authRoles };
