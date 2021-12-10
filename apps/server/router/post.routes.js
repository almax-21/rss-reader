const Router = require('express');

const PostController = require('../controllers/PostController');

const authMiddleware = require('../middlewares/auth.middleware');

const router = new Router();

router.put('/', authMiddleware, PostController.setPostRead);
router.put('/all', authMiddleware, PostController.setAllActivePostsRead);

module.exports = router;
