const express = require("express");
const router = express.Router();
const { hasDescription } = require('../validations/validators');
const uploadImage = require("../middlewares/multer");
const postController = require("../controllers/postController");

router.get('/', postController.index);
router.post('/', uploadImage('posts').single('image'), hasDescription, postController.store);
router.get('/:id', postController.show);
router.patch('/:id', hasDescription, postController.update);
router.delete('/:id', postController.delete);

module.exports = router;