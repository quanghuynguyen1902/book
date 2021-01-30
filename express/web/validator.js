const { body, validationResult } = require("express-validator");
const userValidationRules = () => {
  return [
    // username must be an email
    body("email").isEmail().withMessage("Email không hợp lệ"),
    // password must be at least 5 chars longệ
    body("password").isLength({ min: 6 }).withMessage("Mật khẩu phải có ít nhất 6 ký tụ"),
  ];
};
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(400).json({
    errors: extractedErrors,
  });
};

module.exports = {
  userValidationRules,
  validate,
};
