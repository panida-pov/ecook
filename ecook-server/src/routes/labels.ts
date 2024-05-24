import { Router } from "express";
import {
  getLabels,
  createLabel,
  getLabelById,
  updateLabel,
  deleteLabel,
} from "../controllers/labels.contoller";
import { checkSchema } from "express-validator";
import {
  createLabelSchema,
  validateLabelIdSchema,
} from "../schema/LabelValidationSchema";
import { validationHandler } from "../middlewares/validationHandler";

export const labelsRouter = Router();

labelsRouter.get("/", getLabels);

labelsRouter.post(
  "/",
  checkSchema(createLabelSchema),
  validationHandler,
  createLabel
);

labelsRouter.get(
  "/:id",
  checkSchema(validateLabelIdSchema),
  validationHandler,
  getLabelById
);

labelsRouter.put(
  "/:id",
  checkSchema(validateLabelIdSchema),
  checkSchema(createLabelSchema),
  validationHandler,
  updateLabel
);

labelsRouter.delete("/:id", checkSchema(validateLabelIdSchema), deleteLabel);
