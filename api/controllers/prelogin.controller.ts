import {Router, Request, Response, NextFunction} from 'express';
import LoggerUtil from '../logs/log';
import { PreloginHelper } from './../helper/prelogin.helper';
import { LoggedInUserDtls } from './../model/loggedinuser.details';

export class PreLoginController {

    preloginHelper: PreloginHelper;
    constructor(){
        this.preloginHelper = new PreloginHelper();
    }

    public getUserDetailsForSapId(req: Request, res: Response, next: NextFunction) {

        var sapId: string = req.body.sapId;
        let preloginHelper = new PreloginHelper();
        LoggerUtil.info('sap id for the user login:::::::'+sapId);
        let loggedInUserDtls: LoggedInUserDtls = new LoggedInUserDtls();
        if(req.session && null != req.session.bmfAdminSession){
          LoggerUtil.info('FOUND SESSION::::::GETTING DETAILS FROM SESSION::');
          loggedInUserDtls = {...req.session.bmfAdminSession};
          loggedInUserDtls.isUserValid = (loggedInUserDtls.loggedInSapUserName != undefined);
          res.json(loggedInUserDtls);
        }else{
          LoggerUtil.info('NO SESSION FOUND::::::GETTING DETAILS FROM SERVICE::');
          preloginHelper.getUserDetailsFromSapId(sapId).then(s => {
              if(null != s && s.dataAvailForInput){
                  LoggerUtil.info("FOUND SAP USER DETAILS FOR::"+sapId);
                  req.session.bmfAdminSession = preloginHelper.getBMFAdminSession(s,sapId);
                  loggedInUserDtls = {...req.session.bmfAdminSession};
                  loggedInUserDtls.isUserValid = (loggedInUserDtls.loggedInSapUserName != undefined);
              }else{
                  LoggerUtil.info("GETTING SAP USER DETAILS FAILED::::FOUND NULL OBJECT:::FOR::"+sapId);
              }
              res.json(loggedInUserDtls);
          });
        }
    }

    /*Mock data start
    public getUserDetailsForSapId(req: Request, res: Response, next: NextFunction) {

        var loggedInUserDtls: LoggedInUserDtls = new LoggedInUserDtls();
        loggedInUserDtls.bpNumber = req.body.bpNumber;
        loggedInUserDtls.empSapId = req.body.empSapId;
        loggedInUserDtls.userName = "Bhargav Bachina";
        res.json(loggedInUserDtls);
    }

    /* Mock data end */


}
