import { Request } from 'express';

export interface AutenticacaoRequest extends Request {
  user: {
    id: string;
    email: string;
  };
}
