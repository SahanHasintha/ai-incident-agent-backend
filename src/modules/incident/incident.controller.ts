import { Request, Response } from 'express';

export const getIncident = (_req: Request, _res: Response) => {
    return _res.status(200).json({
        message: 'success'
    })
}