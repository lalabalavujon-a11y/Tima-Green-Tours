declare global {
  namespace Express {
    interface Request {
      user?: {
        roles: string[];
        id?: string;
        email?: string;
      };
    }
  }
}

export {};
