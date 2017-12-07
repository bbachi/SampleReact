import {Router, Request, Response, NextFunction} from 'express';
import LoggerUtil from '../logs/log';
import { EsiidLookupHelper } from './../helper/esiid.lookup.helper';
import { ESIID } from '../model/esiid.lookup';

export class EsiidLookupController {


    public lookUpESIIDByAddressFromESI(req: Request, res: Response, next: NextFunction) {
        var esidLookupHelper = new EsiidLookupHelper();
        esidLookupHelper.lookUpESIIDByAddressFromESI(req).then((s) => {
           res.json(s);
        });
    }


  /*  public lookUpESIIDByAddressFromESI(req: Request, res: Response, next: NextFunction) {

        var esiidList = new Array<ESIID>();
        for(var i=0; i<10; i++) {
             var esiid = new ESIID();
             esiid.streetNumber = "streetNumber"+i;
             esiid.streetName = "streetname"+i;
             esiid.unitNumber = "unitnumber"+i;
             esiid.city = "city"+i;
             esiid.state = "state"+i;
             esiid.zipcode = "zipcode"+i;
             esiid.esiid = "esiid"+i;
             esiidList.push(esiid);
        }
        res.json(esiidList);
    }*/
}
