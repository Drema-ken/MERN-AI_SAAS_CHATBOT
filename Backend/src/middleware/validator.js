import { body, validationResult } from "express-validator";

export const validate = (validations) => {
  return async (req, res, next) => {
    for (let validation of validations) {
      const result = await validation.run(req);
      if (result.error) break;
    }
    const error = validationResult(req);
    if (error.isEmpty()) return next();
    return res.status(422).json({ error: error.array() });
  };
};

export const loginValidator = [
  body("email").trim().isEmail().withMessage("Input a valid email"),
  body("password")
    .trim()
    .isLength({ min: 8 })
    .withMessage("Password must be between 8-16 characters"),
];

export const signupValidator = [
  body("name").notEmpty().withMessage("name is required"),
  ...loginValidator,
];
