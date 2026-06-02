import { body, validationResult } from "express-validator";

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

export const createProductValidator = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 3 })
    .withMessage("Title must be at least 3 characters"),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ min: 10 })
    .withMessage("Description must be at least 10 characters"),

  body("priceAmount")
    .notEmpty()
    .withMessage("Price amount is required")
    .isFloat({ min: 0.01 })
    .withMessage("Price amount must be greater than 0"),

  body("priceCurrency")
    .notEmpty()
    .withMessage("Currency is required")
    .isIn(["USD", "EUR", "GBP"])
    .withMessage("Currency must be USD, EUR or GBP"),

  body("stock")
    .notEmpty()
    .withMessage("Stock is required")
    .isInt({ min: 0 })
    .withMessage("Stock must be 0 or greater"),

  body("attributes")
    .notEmpty()
    .withMessage("Attributes are required")
    .isObject()
    .withMessage("Attributes must be an object"),

  validate,
];

export const createProductVariantValidator = [
  body("priceAmount")
    .notEmpty()
    .withMessage("Price amount is required")
    .isFloat({ min: 0.01 })
    .withMessage("Price amount must be greater than 0"),

  body("priceCurrency")
    .notEmpty()
    .withMessage("Currency is required")
    .isIn(["USD", "EUR", "GBP"])
    .withMessage("Currency must be USD, EUR or GBP"),

  body("stock")
    .notEmpty()
    .withMessage("Stock is required")
    .isInt({ min: 0 })
    .withMessage("Stock must be 0 or greater"),

  body("attributes")
    .notEmpty()
    .withMessage("Attributes are required")
    .custom((value) => {
      const attributes = JSON.parse(value);

      if (!attributes.color?.trim()) {
        throw new Error("Color is required");
      }

      if (!attributes.size?.trim()) {
        throw new Error("Size is required");
      }

      return true;
    }),

  validate,
];