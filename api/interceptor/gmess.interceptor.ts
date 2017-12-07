import {Request, Response, NextFunction} from 'express';
import LoggerUtil from './../logs/log';

export class GMESSInterceptor {

    public beforeEachRequest(req: Request, res: Response, next: NextFunction){

        var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
        LoggerUtil.info('GMESSInterceptor::request URL:::'+fullUrl+":::::with body::::"+JSON.stringify(req.body));
        if(fullUrl.indexOf("adminAPI") != -1){
            if(fullUrl.indexOf("sapid") != -1){
                LoggerUtil.info("THIS IS LOGIN URL:::::SETTING SESSION UNDEFINED::::::");
                req.session.bmfAdminSession = undefined;
            }else{
              if(undefined == req.session.bmfAdminSession){
                  LoggerUtil.info("ADMIN SESSION IS UNDEFINED:::::ADDING USER LOGIN DETAILS FROM CLIENT:::");
                  req.session.bmfAdminSession = req.body.userDetails;
              }else{
                  LoggerUtil.info("ADMIN SESSION IS NOT NULL:::::SKIPPING ADDING USER LOGIN DETAILS FROM CLIENT:::");
              }
            }
        }
        next();
    }

}
