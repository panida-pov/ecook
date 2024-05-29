import { Request, Response, NextFunction } from "express-serve-static-core";
import { CreateLabelDto } from "../dto/labels/CreateLabel.dto";
import { myDataSource } from "../data-source";
import { LabelEntity } from "../entity/label.entity";
import { CustomError } from "../utils/CustomError";
import { LabelResponse } from "../dto/labels/LabelResponse.dto";

// GET: /api/labels
export async function getLabels(
  req: Request,
  res: Response<Array<LabelResponse>>,
  next: NextFunction
) {
  try {
    const labels = await myDataSource
      .getRepository(LabelEntity)
      .find({ order: { id: "ASC" } });
    res.status(200).send(labels);
  } catch (e) {
    next(e);
  }
}

// POST: /api/labels
export async function createLabel(
  req: Request<Record<string, never>, Record<string, never>, CreateLabelDto>,
  res: Response<LabelResponse>,
  next: NextFunction
) {
  try {
    const newLabel = await myDataSource
      .getRepository(LabelEntity)
      .save({ name: req.body.name });
    res.status(201).send({ id: newLabel.id, name: newLabel.name });
  } catch (e) {
    next(e);
  }
}

// GET: /api/labels/:id
export async function getLabelById(
  req: Request<{ id: number }>,
  res: Response<LabelResponse>,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const label = await myDataSource
      .getRepository(LabelEntity)
      .findOneBy({ id: id });
    if (!label) {
      return next(new CustomError(`Label with id = ${id} doesn't exist!`, 404));
    }
    res.status(200).send(label);
  } catch (e) {
    next(e);
  }
}

// PUT: /api/labels/:id
export async function updateLabel(
  req: Request<{ id: number }, Record<string, never>, CreateLabelDto>,
  res: Response<LabelResponse>,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const label = await myDataSource
      .getRepository(LabelEntity)
      .findOneBy({ id: id });
    if (!label) {
      return next(new CustomError(`Label with id = ${id} doesn't exist!`, 404));
    }

    if (label.name !== req.body.name) {
      await myDataSource
        .getRepository(LabelEntity)
        .save({ ...label, name: req.body.name });
    }

    res.status(202).send();
  } catch (e) {
    next(e);
  }
}

// DELETE: /api/labels/:id
export async function deleteLabel(
  req: Request<{ id: number }>,
  res: Response,
  next: NextFunction
) {
  try {
    const { affected } = await myDataSource
      .getRepository(LabelEntity)
      .delete(req.params.id);
    if (!affected) {
      return next(new CustomError("No label to delete!", 404));
    }

    res.status(204).send();
  } catch (e) {
    next(e);
  }
}
