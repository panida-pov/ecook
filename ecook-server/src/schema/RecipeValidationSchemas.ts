import { Schema } from "express-validator";

export const validateRecipeIdSchema: Schema = {
  id: {
    isInt: {
      options: {
        min: 1,
      },
      errorMessage: "Recipe id must be a positive integer",
    },
    toInt: true,
  },
};

export const updateFavoriteSchema: Schema = {
  favorite: {
    notEmpty: {
      errorMessage: "Favorite must not be empty",
    },
    isBoolean: {
      errorMessage: "Favorite must be either true or false",
    },
    toBoolean: true,
  },
};

export const createRecipeSchema: Schema = {
  name: {
    exists: {
      errorMessage: "Recipe name must be provided",
    },
    isString: {
      errorMessage: "Recipe name must be a string",
    },
    trim: true,
    notEmpty: {
      errorMessage: "Recipe name cannot be empty",
    },
    isLength: {
      options: {
        max: 50,
      },
      errorMessage: "Recipe name cannot exceed 50 characters",
    },
  },
  favorite: {
    exists: {
      errorMessage: "Favorite field must be provided",
    },
    isBoolean: {
      errorMessage: "Favorite must be either true or false",
    },
    toBoolean: true,
  },
  labels: {
    exists: {
      errorMessage: "Labels field must be provided",
    },
    isArray: {
      errorMessage: "Labels must be an array",
    },
  },
  "labels.*": {
    isString: {
      errorMessage: "Value of labels must be a string",
    },
    trim: true,
    notEmpty: {
      errorMessage: "Value of labels cannot be an empty string",
    },
    isLength: {
      options: {
        max: 50,
      },
      errorMessage: "Label cannot exceed 50 characters",
    },
  },
  servings: {
    exists: {
      errorMessage: "Servings field must be provided",
    },
    isInt: {
      options: {
        min: 1,
      },
      errorMessage: "Servings must be a positive integer ( >=1 )",
    },
    toInt: true,
  },
  ingredients: {
    exists: {
      errorMessage: "Ingredients field must be provided",
    },
    isArray: {
      errorMessage: "Ingredients must be an array",
    },
  },
  "ingredients.*.name": {
    isString: {
      errorMessage: "Ingredient name must be a string",
    },
    trim: true,
    notEmpty: {
      errorMessage: "Ingredient name cannot be empty",
    },
    isLength: {
      options: {
        max: 50,
      },
      errorMessage: "Ingredient name cannot exceed 50 characters",
    },
  },
  "ingredients.*.amount": {
    isFloat: {
      options: {
        min: 0.01,
        max: 99999.99,
      },
      errorMessage:
        "Ingredient amount must be a number ( >=0.01 and <=99,999.99)",
    },
    customSanitizer: {
      options: (value) => Math.round(parseFloat(value) * 100) / 100,
    },
  },
  "ingredients.*.unit": {
    isString: {
      errorMessage: "Ingredient unit must be a string",
    },
    trim: true,
    notEmpty: {
      errorMessage: "Ingredient unit cannot be empty",
    },
    isLength: {
      options: {
        max: 50,
      },
      errorMessage: "Ingredient unit cannot exceed 50 characters",
    },
  },
  methods: {
    exists: {
      errorMessage: "Methods field must be provided",
    },
    isArray: {
      errorMessage: "Methods must be an array",
    },
  },
  "methods.*": {
    isString: {
      errorMessage: "Method must be a string",
    },
    trim: true,
    notEmpty: {
      errorMessage: "Method cannot be an empty string",
    },
    isLength: {
      options: {
        max: 200,
      },
      errorMessage: "Method cannot exceed 200 characters",
    },
  },
};
