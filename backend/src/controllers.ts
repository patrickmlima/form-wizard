import { Request, Response } from 'express';

import { FormDataModel } from "./database";

export const createFormRegistryController = async (req: Request, res: Response) => {
  const body = req.body;
  try {
    const registry = new FormDataModel({ data: { ...body}});
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