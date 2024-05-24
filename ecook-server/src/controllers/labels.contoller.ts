import { Request, Response, NextFunction } from "express-serve-static-core";
import { LabelResponse } from "../dto/labels/LabelResponse.dto";
import { CreateLabelDto } from "../dto/labels/CreateLabel.dto";

// GET: /api/labels
export function getLabels(
  req: Request,
  res: Response<Array<LabelResponse>>,
  next: NextFunction
) {
  try {
    res.status(200).send([
      { id: 1, name: "thai" },
      { id: 2, name: "western" },
      { id: 3, name: "dessert" },
    ]);
  } catch (e) {
    next(e);
  }
}

// POST: /api/labels
export function createLabel(
  req: Request<Record<string, never>, Record<string, never>, CreateLabelDto>,
  res: Response<LabelResponse>,
  next: NextFunction
) {
  try {
    res.status(201).send({ id: 1, name: req.body.name });
  } catch (e) {
    next(e);
  }
}

// GET: /api/labels/:id
export function getLabelById(
  req: Request<{ id: number }>,
  res: Response<LabelResponse>,
  next: NextFunction
) {
  try {
    res.status(200).send({ id: req.params.id, name: "get" });
  } catch (e) {
    next(e);
  }
}

// PUT: /api/labels/:id
export function updateLabel(
  req: Request<{ id: number }, Record<string, never>, CreateLabelDto>,
  res: Response<LabelResponse>,
  next: NextFunction
) {
  try {
    res.status(202).send({ id: req.params.id, name: req.body.name });
  } catch (e) {
    next(e);
  }
}

// DELETE: /api/labels/:id
export function deleteLabel(
  req: Request<{ id: number }>,
  res: Response,
  next: NextFunction
) {
  try {
    res.status(204).send();
  } catch (e) {
    next(e);
  }
}
