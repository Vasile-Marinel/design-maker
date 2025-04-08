const router = require("express").Router();
const authController = require('../controllers/authController')
const auth = require("../middlewares/middleware");

// router.get("/user-profile", auth, get_user_profile);

router.get('/user-profile', auth, authController.get_user_profile);
router.put('/update-user-profile', auth, authController.update_user_profile);
router.put('/update-password', auth, authController.update_password);

module.exports = router;
