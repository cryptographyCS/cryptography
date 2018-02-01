require('dotenv').config();
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

const cookieController = {};

cookieController.checkForCookie = (req, res, next) => {
  if (req.cookies.token) {
    const decoded = jwt.verify(req.cookies.token, JWT_SECRET);
    res.locals.sessionUser = decoded.username;
  }
  next();
};

module.exports = cookieController;