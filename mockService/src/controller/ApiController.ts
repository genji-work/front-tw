import { Controller, PUT, DELETE, GET } from '../decorators';
import { NextFunction, Request, Response } from 'express';

const cruise = require('../entity/cruise');
const history = require('../entity/history');
const user = require('../entity/user');

@Controller('/mock')
export class ApiController {
  @GET('/cruise')
  public async get_cruise(
    req: Request,
    response: Response,
    next: NextFunction
  ) {
    const res = cruise();
    return Promise.resolve(res);
  }

  @GET('/history')
  public async get_history(
    req: Request,
    response: Response,
    next: NextFunction
  ) {
    const res = history();
    return Promise.resolve(res);
  }

  @GET('/user')
  public async get_user(
    req: Request,
    response: Response,
    next: NextFunction
  ) {
    const res = user();
    return Promise.resolve(res);
  }
}
