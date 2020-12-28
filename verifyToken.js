const jwt = require("jsonwebtoken");
const HttpError = require("./modals/http-error");
const verifyToken = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return next(new HttpError("Access Denied", 401));
  }
  try {
    //verifying the token
    const verified = jwt.verify(token, process.env.SECRET_TOKEN);
    req.user = { userId: verified._id };
    next();
  } catch (error) {
    return next(new HttpError("Access Denied", 401));
  }
};

module.exports = verifyToken;
