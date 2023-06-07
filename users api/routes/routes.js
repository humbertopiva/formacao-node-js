var express = require("express")
var app = express();
var router = express.Router();
var HomeController = require("../controllers/HomeController");
var UserController = require("../controllers/UserController");
var AdminAuth = require("../middlewares/AdminAuth");

router.get('/', HomeController.index);
router.post('/user', UserController.create);
router.put('/user', AdminAuth, UserController.edit);
router.get('/user', AdminAuth, UserController.all);
router.get('/user/:id', AdminAuth, UserController.findById);
router.delete('/user/:id', AdminAuth, UserController.destroy);
router.post('/user/recovery-password', UserController.recoverPassword);
router.post('/user/change-password', UserController.changePassword);
router.post('/login', UserController.login);

module.exports = router;