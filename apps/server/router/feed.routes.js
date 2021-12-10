const Router = require('express');

const FeedController = require('../controllers/FeedController');

const authMiddleware = require('../middlewares/auth.middleware');

const router = new Router();

router.get('/', authMiddleware, FeedController.getAllContent);
router.post('/upload', authMiddleware, FeedController.uploadFeed);
router.delete('/', authMiddleware, FeedController.deleteFeed);

module.exports = router;
