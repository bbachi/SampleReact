import * as request from 'request';
import LoggerUtil from './../logs/log';
import Promise = require('tspromise');
import * as cst from './../util/constant';
import { CommonUtil } from './../util/common.util';
import { EmailService } from './../services/email.service';
import {EmailRequest } from './../request/email.request';
import {AddUserRequest } from './../request/user.request';
import {EmailDO } from './../model/emaildo';
import * as emailcst from './../util/emailconstants';
import * as _ from "lodash";

export class EmailHelper {

  private emailService: EmailService;

  constructor() {
        this.emailService = new EmailService();
  }

    public sendEmail(req: any): Promise<any> {
      LoggerUtil.info('Calling sendEmail service with the request::::'+JSON.stringify(req));
      let emailReq = new EmailRequest();
      let emailResp = new EmailDO();
      emailReq.companyCode = cst.GMESS_CC_0270;
      emailReq.externalId = req.externalId;
      emailReq.toEmailList = req.toEmailList;
      emailReq.subject = "";
      emailReq.propertyList = req.propertyList;
      emailReq.templateType = req.templateType;
      emailReq.languageCode = "EN";
      emailReq.brandName = cst.GME_BRAND_NAME;
        var p = new Promise((resolve, reject) => {

            this.emailService.sendEmail(emailReq).then(t =>{
                  if(undefined != t && (t.resultcode == 0 || t.resultdescription == "Success")){
                      emailResp.resultcode = t.resultcode;
                      emailResp.resultdescription = t.resultdescription;
                      emailResp.errorcode = t.resultcode;
                      emailResp.errordescription =t.errordescription;
                  }else{
                    LoggerUtil.error("Error sending email");
                  }
            });
             resolve(emailResp);
        });

        return p;
    }

    public addUserConfirmEmail(addUserVO:AddUserRequest, req:any) {
    LoggerUtil.info("Sending Email for :::ADD_USER_CONFIRMATION::::::::");
		let status = false;
		let subject:string;
		let emailAddress = req.body.userInfo.email;
    let emailReq = new EmailRequest();

		let logonLink = cst.BMF_FIRST_TIME_SET_PASSWORD+"/"+addUserVO.linkTxnId;
    LoggerUtil.info("The Login Link === ::::::::"+logonLink);
    LoggerUtil.info("Sending Email to :::emailAddress ::::::::"+emailAddress);
    try {
      emailReq.externalId = emailcst.ADD_USER_CONFIRMATION_EXTERNAL_ID;
      emailReq.templateType = emailcst.TEMPLATE_HTML;
      emailReq.toEmailList.push(emailAddress);
      emailReq.propertyList.push("LOGIN_LINK:"+logonLink);

    } catch (e) {
      LoggerUtil.error("Failed to send addUserConfirmEmail::::::: with exception + "+ e.message);
    }

      this.sendEmail(emailReq).then(t =>{
        if(undefined != t)
           LoggerUtil.info("Email Sending response is == " +t);
      });

	}


  public addUserConfirmAdminEmail(addUserVO:any, req:any) {

    let status = false;
		let subject:string = "";
		let emailAddress: string;
    let emailReq = new EmailRequest();
		if(null != req.session.bmfAdminSession){
			emailAddress = req.session.bmfAdminSession.loggedInSapEmailId;
		}
    emailReq.externalId = emailcst.ADD_USER_CONFIRMATION_ADMIN_EXTERNAL_ID;
    emailReq.templateType = emailcst.TEMPLATE_HTML;
    emailReq.toEmailList.push(emailAddress);
    emailReq.propertyList.push(emailcst.PM_CUSTOMER_NAME+":"+addUserVO.firstName,emailcst.PM_CUSTOMER_FULLNAME+":"+addUserVO.firstName + " " + addUserVO.lastName);

    try {
      this.sendEmail(emailReq).then(t =>{
        if(undefined != t)
           LoggerUtil.info("Email Sending response is == " +t);
      });
		} catch (e) {
			LoggerUtil.error("Failed to send addUserConfirmAdminEmail::::::: with exception + "+ e.message);
		}

	}

	public updateUserConfirmEmail(updateuservo:any) {

    let status = false;
    let subject:string = "";
    let emailAddress=  updateuservo.emailID;
    let emailReq = new EmailRequest();

		let name = updateuservo.firstName+" "+updateuservo.lastName;
		let phNumberExt = updateuservo.phoneExtn.replace("extn", "");
		let altNumberExt = updateuservo.phoneExtnAlt.replace("extn", "");
		let phNumber = CommonUtil.isNotBlank(updateuservo.phoneExtn)?(updateuservo.phoneNum+" ext "+phNumberExt):updateuservo.phoneNum;
		let altPhoneNumber = CommonUtil.isNotBlank(updateuservo.phoneExtnAlt)?(updateuservo.altPhoneNum+" ext "+altNumberExt):updateuservo.altPhoneNum;
		let faxNumber = updateuservo.faxNum;
		let emailId = updateuservo.emailID;
		let sapId = updateuservo.sapId;

		if(_.isEqual(updateuservo.fieldIndex,("1")))
			name = "<b>"+name+"</b>";
		else if(_.isEqual(updateuservo.fieldIndex,("5")))
			emailId= "<b>"+emailId+"</b>";
		else if(_.isEqual(updateuservo.fieldIndex,("2")))
			phNumber = "<b>"+(CommonUtil.isNotBlank(phNumber)?phNumber:cst.NOT_PROVIDED)+"</b>";
		else if(_.isEqual(updateuservo.fieldIndex,("3")))
			altPhoneNumber = "<b>"+(CommonUtil.isNotBlank(altPhoneNumber)?altPhoneNumber:cst.NOT_PROVIDED)+"</b>";
		else if(_.isEqual(updateuservo.fieldIndex,("4")))
			faxNumber =  "<b>"+(CommonUtil.isNotBlank(faxNumber)?faxNumber:cst.NOT_PROVIDED)+"</b>";
		else if(_.isEqual(updateuservo.fieldIndex,("7"))){
		    sapId =  "<b>"+(CommonUtil.isNotBlank(sapId)?sapId:cst.NOT_APPLICABLE)+"</b>";
		}else if(_.isEqual(updateuservo.fieldIndex,("6"))){

		}
    let sapIdClass= "hide";

    if(null !=updateuservo.sapId && _.isEqual(cst.USERTYPE_INTERNAL,updateuservo.userCategory) &&
				_.isEqual(updateuservo.getWebSecurityRole(), cst.USERTYPE_SP_INT_ADMIN)){
          sapIdClass = "show";
      }else{
          sapIdClass = "hide";
      }
      let accessPrivStr = "";
      if(null !=updateuservo.userCategory && _.isEqual(cst.USERTYPE_EXTERNAL,(updateuservo.userCategory)) &&
  				!_.isEqual(updateuservo.webSecurityRole, cst.USERTYPE_SP_EXT_READ_ONLY)){
            accessPrivStr= this.getAccessPrivInfo(updateuservo);
  		}
    emailReq.externalId = emailcst.UPDATE_USER_CONFIRMATION_EXTERNAL_ID;
    emailReq.templateType = emailcst.TEMPLATE_HTML;
    emailReq.toEmailList.push(emailAddress);
    emailReq.propertyList.push(emailcst.PM_CUSTOMER_NAME+":"+updateuservo.userName,
                               emailcst.PM_UPDATE_NAME+":"+name ,
                               emailcst.PM_UPDATE_PHNUM+":"+CommonUtil.isNotBlank(phNumber)?phNumber:cst.NOT_PROVIDED,
                               emailcst.PM_UPDATE_ALTPHNUM+":"+CommonUtil.isNotBlank(altPhoneNumber)?altPhoneNumber:cst.NOT_PROVIDED,
                               emailcst.PM_UPDATE_FAXNUM+":"+CommonUtil.isNotBlank(faxNumber)?faxNumber:cst.NOT_PROVIDED,
                               emailcst.PM_UPDATE_EMAIL+":"+emailId,
                               emailcst.PM_UPDATE_USERNAME+":"+updateuservo.userName,
                               emailcst.PM_SAPID_CLASS+":"+sapIdClass,
                               emailcst.PM_UPDATE_SAPID+":"+ sapId,
                               emailcst.PM_ACCESSPRIV_INFO+":"+ accessPrivStr);

    try {
      this.sendEmail(emailReq).then(t =>{
        if(undefined != t)
           LoggerUtil.info("Email Sending response is == " +t);
      });
		} catch (e) {
			LoggerUtil.error("Failed to send updateUserConfirmEmail::::::: with exception + "+ e.message);
		}

	}

  private getAccessPrivInfo(manageUserVO:any):string {
		LoggerUtil.info("WEB SECURITY ROLE:::::::"+manageUserVO.webSecurityRole);
     var StringBuffer = require("stringbuffer");
		 let accessPrivInfo = new StringBuffer();
		 let webSecurityRole = manageUserVO.webSecurityRole;
		accessPrivInfo.append("<tr><td valign='top' width='15%'>Access privilages:</td><td width='60%'><table><tr><td>");
		if(_.isEqual(webSecurityRole, cst.USERTYPE_SP_EXT_CA_PO) || _.isEqual(webSecurityRole, cst.USERTYPE_SP_EXT_CA_PM)){
			accessPrivInfo.append("transactional access"
					+ "</td></tr><tr><td>");
			accessPrivInfo.append("&nbsp;&nbsp;"+"-able to request start and stop"
					+ "</td></tr><tr><td>");
			accessPrivInfo.append("&nbsp;&nbsp;"+"-able to pay bills"
					+ "</td></tr></table></td></tr>");
		}else if(_.isEqual(webSecurityRole, cst.USERTYPE_SP_EXT_CUS_ASC)){
			accessPrivInfo.append("transactional access"
					+ "</td></tr><tr><td>");
			accessPrivInfo.append("&nbsp;&nbsp;"+"-Can start/stop: <b>"+(_.isEqual(manageUserVO.getStartStopAce(), cst.YES)?cst.YES_TXT:cst.NO_TXT)
						+ "</b></td></tr><tr><td>");
			accessPrivInfo.append("&nbsp;&nbsp;"+"-Can pay bills: <b>"+(_.isEqual(manageUserVO.getBillingAce(), cst.YES)?cst.YES_TXT:cst.NO_TXT)
							+ "</b></td></tr></table></td></tr>");
		}else if(_.isEqual(webSecurityRole, cst.USERTYPE_SP_EXT_BROKER) || _.isEqual(webSecurityRole, cst.USERTYPE_SP_EXT_BRK_ASC)){
			let logonLink = cst.GMESS_HOST_INFO;
			LoggerUtil.info("getting the link::::::"+logonLink);
			accessPrivInfo.append("<a href='"+logonLink+"'>Log in</a>"+" to SimpleSource to view permissions for each property."
					+ "</td></tr><tr><td>");
		}else{
			accessPrivInfo.append("Administrative Access"
					+ "</b></td></tr><tr><td> <b>");
		}
		return accessPrivInfo.toString();

	}


  public  updatePasswordEmail(req:any, userName:string){


    let subject:string = "";
    let emailReq = new EmailRequest();
    let emailAddress ="";
    try {
        if(null != req.session.bmfAdminSession){
    			emailAddress = req.session.bmfAdminSession.loggedInSapEmailId;
    		}
        emailReq.externalId = emailcst.UPDATE_PASSWORD_CONFIRMATION_EXTERNAL_ID;
        emailReq.templateType = emailcst.TEMPLATE_HTML;
        emailReq.toEmailList.push(emailAddress);
        emailReq.propertyList.push(emailcst.PM_CONFIRMATION_NUM+":"+"",
                                   emailcst.PM_EMAIL_ADDRESS+":"+"",
                                   emailcst.PM_GREETING_NAME+":"+"",
                                   emailcst.PM_USER_NAME+":"+userName,
                                   emailcst.PM_TELEPHONE_NUM+":"+"");
     } catch (e) {
 			LoggerUtil.error("Error in updatePasswordEmail()::: + "+ e.message);
 		 }

        this.sendEmail(emailReq).then(t =>{
          if(undefined != t){
             LoggerUtil.info("Email Sending response is == " +t);
           }else{
             LoggerUtil.error("Failed to send updatePasswordEmail::::::: with exception + ");
           }
        });

  	}


  	public sendPasswordResetLinkEmail(emailAddress:string, txnId:string) {

      let status = false;
      let subject:string = "";
      let emailReq = new EmailRequest();
  		let logonLink = cst.BMF_FIRST_TIME_SET_PASSWORD+"?txnId="+txnId;

      emailReq.externalId = emailcst.RESET_PASSWORD_EXTERNAL_ID;
      emailReq.templateType = emailcst.TEMPLATE_HTML;
      emailReq.toEmailList.push(emailAddress);
      emailReq.propertyList.push(emailcst.PM_LOGIN_LINK, "<p><a href='"+logonLink+"'>"+logonLink+"</a></p>");

      try {
        this.sendEmail(emailReq).then(t =>{
          if(undefined != t)
             LoggerUtil.info("Email Sending response is == " +t);
        });
      } catch (e) {
        LoggerUtil.error("Failed to send Reset Password:::::::  with exception + "+ e.message);
      }

  	}


}
