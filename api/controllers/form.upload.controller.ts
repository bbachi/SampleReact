import { Router, Request, Response, NextFunction } from 'express';
import LoggerUtil from '../logs/log';
import { FormUploadHelper } from '../helper/form.upload.helper';

export class UploadFormController {


    public formUpload(req: Request, res: Response, next: NextFunction) {

        var formUploadHelper = new FormUploadHelper();
        formUploadHelper.uploadForm(req).then(s => {
            res.json(s);
        })
    }

   /*
    public createOffer(req: Request, res: Response, next: NextFunction) {

        LoggerUtil.info("request body::::::"+JSON.stringify(req.body));
        this.incOffrHelper.createOffer(req).then(s => {
            res.json(this.incOffrHelper.getStatusForCreateOffer(s));
        });
    }

    public deleteOffer(req: Request, res: Response, next: NextFunction) {

        this.incOffrHelper.deleteOffer(req).then(s => {
            res.json((null != s && s.dataAvailForInput));
        });
    }

     public getOffer(req: Request, res: Response, next: NextFunction) {

        this.incOffrHelper.getOffer(req).then(s => {
            res.json(this.incOffrHelper.getOfferListFromResponse(s));
        });
    }

     public updateOffer(req: Request, res: Response, next: NextFunction) {

        this.incOffrHelper.updateOffer(req).then(s => {
            res.json((null != s && s.dataAvailForInput));
        });
    }
*/



     /*  mock data end */

}
