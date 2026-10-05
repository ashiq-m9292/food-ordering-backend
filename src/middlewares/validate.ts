import { Request, Response, NextFunction } from "express";
import { z } from "zod";

const validate = (schema: z.ZodType, source: "body" | "params" = "body") => {
  return (req: Request, res: Response, next: NextFunction) => {
    schema.parse(req[source]);
    next();
  };
};

export default validate;
