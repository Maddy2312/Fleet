import { body, validationResult } from "express-validator";


function validateRequest(req, res, next){
    const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  next();
}

export const registerValidator = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Enter a valid email"),

  body("contact")
    .trim()
    .notEmpty()
    .withMessage("Contact is required")
    .isLength({ min: 10, max: 15 })
    .withMessage("Contact number must be between 10 and 15 digits")
    .isNumeric()
    .withMessage("Contact must contain only numbers"),

  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),

  body("fullname")
    .trim()
    .notEmpty()
    .withMessage("Full name is required")
    .isLength({ min: 3 })
    .withMessage("Full name must be at least 3 characters"),

  body("role")
    .optional()
    .isIn(["buyer", "seller"])
    .withMessage("Role must be buyer or seller"),

    validateRequest
];