const Router = require('express');

const UserController = require('../controllers/UserController');

const validateUser = require('../middlewares/validators/userValidator');
const authMiddleware = require('../middlewares/auth.middleware');

const router = new Router();

router.post('/registration', validateUser, UserController.createUser);
router.post('/login', UserController.loginUser);
router.get('/auth', authMiddleware, UserController.authUser);
router.put('/update', authMiddleware, UserController.setIsAutoUpdateEnabled);
router.put('/lang', authMiddleware, UserController.switchLang);

module.exports = router;
