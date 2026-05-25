import { body } from "express-validator";
import { validationResult } from "express-validator";

const validate = (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array(),
        });
    }

    next();
};

export const registerValidator = [
    body("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Invalid email format"),

    body("name")
        .notEmpty()
        .withMessage("Name is required")
        .isLength({ min: 3 })
        .withMessage("Name must be at least 3 characters"),

    body("password")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters"),

    body("contact")
        .notEmpty()
        .withMessage("Contact is required")
        .isMobilePhone()
        .withMessage("Invalid contact number"),

    body("role")
        .optional()
        .isIn(["buyer", "seller"])
        .withMessage("Role must be buyer or seller"),
        validate
];