import {Router, Request, Response, NextFunction} from 'express';
import LoggerUtil from '../logs/log';
import { ManageUserHelper } from './../helper/manage.user.helper';

export class ManageUserController {

    public searchUsersForUpdate(req: Request, res: Response, next: NextFunction) {

        var manageUserHelper = new ManageUserHelper();
        LoggerUtil.info('searching users for update::::'+req.body);
        manageUserHelper.searchUsersForUpdate(req).then((s) => {
           res.json(s);
        });
    }


    public getUserDetailsForUpdate(req: Request, res: Response, next: NextFunction) {

        var manageUserHelper = new ManageUserHelper();
        LoggerUtil.info('getting user details for update userName::::'+req.body.userName);
        manageUserHelper.getUserDetailsForUpdate(req).then(s => {
          //LoggerUtil.info("sending response::::"+JSON.stringify(s));
          res.json(s);
        })
    }


    public updateUser(req: Request, res: Response, next: NextFunction) {

        var manageUserHelper = new ManageUserHelper();
        LoggerUtil.info('updating user for the info::::'+req.body.user);
        manageUserHelper.updateUser(req).then(s => {
          //LoggerUtil.info("sending response::::"+JSON.stringify(s));
          res.json(s);
        })
    }


    public passwordReset(req: Request, res: Response, next: NextFunction) {
        var manageUserHelper = new ManageUserHelper();
        manageUserHelper.resetPassword(req).then(s => {
            res.json(s)
        })
    }

    public removeUser(req: Request, res: Response, next: NextFunction) {
        var manageUserHelper = new ManageUserHelper();
        manageUserHelper.removeUser(req).then(s => {
            res.json(s)
        })
    }

    public disassociateUsersToCutomer(req: Request, res: Response, next: NextFunction) {
        var manageUserHelper = new ManageUserHelper();
        manageUserHelper.disassociateUsersToCutomer(req).then(s => {
            res.json(s)
        })
    }

}
