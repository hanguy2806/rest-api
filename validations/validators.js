const { body } = require('express-validator/check');

exports.hasDescription = body('description')
    .isLength({ min: 5 })
    .withMessage("Description is required. Min length is 5 letters");
exports.isEmail = body("email")
    .isEmail()
    .withMessage("Email must be correct")
exports.hasPassword = body('password')
    .exists()
    .withMessage('Password cannot be empty');
exports.hasName = body('name')
    .isLength({ min: 5 })
    .withMessage("Name is required. Min length is 5 characters")