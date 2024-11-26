import { Request, Response } from 'express';
import { ZodError } from 'zod';

import { ClientDeliveryModel, FormDataModel } from "./database";
import { clientDeliverySchema } from './utils/validation';

export const createFormRegistryController = async (req: Request, res: Response) => {
  const body = req.body;
  try {
    const registry = new FormDataModel({ data: { ...body } });
    await registry.save();
    res.status(201).json(registry);
  } catch (error: any) {
    res.status(500).json({ message: error?.message });
  }
}

export const listFormRegistriesController = async (req: Request, res: Response) => {
  try {
    const list = await FormDataModel.find();
    res.status(200).json(list ?? []);
  } catch (err: any) {
    res.status(500).json({ message: err?.message });
  }
}

export const createClientDeliveryController = async (req: Request, res: Response) => {
  try {
    const parsedData = clientDeliverySchema.parse(req.body);
    const result = await ClientDeliveryModel.create(parsedData);
    res.status(201).json(result);
  } catch (err: any) {
    if (err instanceof ZodError) {
      res.status(422).json(err.errors);
      return;
    }
    res.status(400).json({ message: err?.message })
  }
}