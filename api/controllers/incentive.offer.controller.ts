import { Router, Request, Response, NextFunction } from 'express';
import LoggerUtil from '../logs/log';
import { IncentiveOfferHelper } from './../helper/incentive.offer.helper';
import { Offer } from '../model/incentive.offer';

export class IncentiveOfferController {

    private incOffrHelper: IncentiveOfferHelper;
    constructor(){
        this.incOffrHelper = new IncentiveOfferHelper();
    }

    public createOffer(req: Request, res: Response, next: NextFunction) {

        LoggerUtil.info("request body::::::"+JSON.stringify(req.body));
        var incOffrHelper = new IncentiveOfferHelper();
        incOffrHelper.createOffer(req).then(s => {
            let status = incOffrHelper.getStatusForCreateOffer(s);
            LoggerUtil.info("status for the create offer call::::"+status)
            res.json({status});
        });
    }

    public listOffers(req: Request, res: Response, next: NextFunction) {

        var incOffrHelper = new IncentiveOfferHelper();
        incOffrHelper.getOffer(req).then(s => {
             res.json(incOffrHelper.getOfferListFromResponse(s));
         });
   }

   public deleteOffer(req: Request, res: Response, next: NextFunction) {

        var incOffrHelper = new IncentiveOfferHelper();
        incOffrHelper.deleteOffer(req).then(s => {
           res.json(s);
        });
   }
/*




     public updateOffer(req: Request, res: Response, next: NextFunction) {

        this.incOffrHelper.updateOffer(req).then(s => {
            res.json((null != s && s.dataAvailForInput));
        });
    }
*/

    /*  mock data start */




     public updateOffer(req: Request, res: Response, next: NextFunction) {

        this.incOffrHelper.updateOffer(req).then(s => {
           res.json((null != s && s.dataAvailForInput));
        });
      //  res.json(null);
    }

     /*  mock data end */

}
