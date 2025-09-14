import { Request, Response, NextFunction } from 'express';
import { getProvider } from '../providers/provider.factory';

export async function selectOffer(req: Request, res: Response, next: NextFunction) {
  try {
    const provider: any = getProvider();
    
    if (!provider.selectOffer) {
      return res.status(400).json({ 
        success: false, 
        message: 'Offer selection not supported by current provider' 
      });
    }
    
    const data = await provider.selectOffer(req.body.offerId);
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
}

export async function createOrder(req: Request, res: Response, next: NextFunction) {
  try {
    const provider: any = getProvider();
    
    if (!provider.createOrder) {
      return res.status(400).json({ 
        success: false, 
        message: 'Order creation not supported by current provider' 
      });
    }
    
    const order = await provider.createOrder(req.body);
    res.json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
}
