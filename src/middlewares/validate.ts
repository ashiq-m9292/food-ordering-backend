import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import AppError from "../errors/AppError";

const validate = (schema: z.ZodType, source: "body" | "params" = "body") => {
  return (req: Request, res: Response, next: NextFunction) => {
    // convert sizes string to array
    try {
      const data = req[source];
      //  only parse sizes when the schema expects sizes as an array
      if (source === "body" && typeof req.body.sizes === "string" && schema instanceof z.ZodObject) {
        req.body.sizes = JSON.parse(req.body.sizes);
      };
      // validate request data
      const result = schema.parse(data);
      // store validated
      req[source] = result;
      next();
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        // console.log("ZodError", error.issues);
        // console.log("body", req.body);
        next(new AppError(error.issues[0].message, 400));
      } else {
        next(error);
      }
    }
  };
};

export default validate;
