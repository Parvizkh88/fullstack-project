import { Response } from "express";

const errorResponse = (res: Response, statusCode: number, message: string) => {
  return res.status(statusCode).json({
    ok: false,
    message: message,
  });
};

const successResponse = (
  res: Response,
  statusCode: number,
  message: string,
  data: any
) => {
  return res.status(statusCode).json({
    ok: true,
    message: message,
    data: data,
  });
};

export { errorResponse, successResponse };
