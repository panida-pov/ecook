import { Schema } from "express-validator";

export const validateLabelIdSchema: Schema = {
  id: {
    isInt: {
      options: {
        min: 1,
      },
      errorMessage: "Label id must be a positive integer",
    },
    toInt: true,
  },
};

export const createLabelSchema: Schema = {
  name: {
    exists: {
      errorMessage: "Label name must be provided",
    },
    isString: {
      errorMessage: "Label name must be a string",
    },
    trim: true,
    notEmpty: {
      errorMessage: "Label name cannot be empty",
    },
    isLength: {
      options: {
        max: 50,
      },
      errorMessage: "Label name cannot exceed 50 characters",
    },
  },
};
