const signup = require("../controllers/signup");
const login = require("../controllers/login");
const logout = require("../controllers/logout");
const verifyEmail = require("../controllers/verifyEmail");
const forgotPassword = require("../controllers/forgotPassword");
const resetPassword = require("../controllers/resetPassword");
const checkAuth = require("../controllers/checkAuth");

module.exports = { signup, login, logout, verifyEmail, forgotPassword, resetPassword, checkAuth };
