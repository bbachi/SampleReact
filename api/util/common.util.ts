import * as _ from "lodash";
import { LoggedInUserDtls } from './../model/loggedinuser.details';
import LoggerUtil from './../logs/log';
import { Address } from '../model/common';
import { isString, trim, replace } from 'lodash';
import * as cst from './constant';

export class CommonUtil {

    public static isJSONString(val: string): boolean{
        try{
        console.log(val);
            JSON.parse(val);
            return true;
        }catch(err){
            return false;
        }
    }

    public static isNotBlank(val: string): boolean {

        if(_.isString(val) && _.trim(val).length > 0){
            return true;
        }
        return false;
    }

    public static getLoggedInUserName(s:any):any{

        let loggedInUserDtls = new LoggedInUserDtls();
        var username:string="";
        if(s.session && null != s.session.bmfAdminSession){
          loggedInUserDtls = {...s.session.bmfAdminSession};
          username = loggedInUserDtls.loggedInSapUserName;
        }
        LoggerUtil.info("s.session===="+JSON.stringify(s.session.bmfAdminSession)+"::::returning username:::"+username);
        return username;
  }

  public static getAgentType(securityRole: string): string{

    switch(securityRole){
        case 'INT_AGT_EMA': return "EMA"
        case 'INT_AGT_EMM': return "EMM"
        case 'EXT_CA_PO': return "Property Owner"
        case 'EXT_CA_PM': return "Property Manager"
        case 'INT_AGT_OPREP': return "Operations Representative"
        default: ""
    }
  }

  public static getCallType(securityRole: string): string {

      if(this.equalsIgnoreCase(securityRole, 'EXT_BROKER')){
        return "BRKR"
      }else{
        return "NON_BRKR"
      }
  }

  public static isAgent(securityRole: string): boolean {

      if(securityRole == 'INT_AGT_EMA' || securityRole == 'INT_AGT_EMM') return true;
      return false;
  }

  public static substringBefore(val:string, delimiter:string):string {
       var str :string;
       if(isString(val) && trim(val).length > 0){
          str = val.split(delimiter)[0];
       }
       return str;
   }



   public static substringAfter(val:string, delimiter:string):string {
       var str :string;
       if(isString(val) && trim(val).length > 0){
          str = val.split(delimiter)[1];
       }
   return str;

   }


   public static toUpperCase(val: string): string {
        return val.toUpperCase();
    }

    public static isArrayContains(arry:any[], val: string): boolean {
        return (arry.indexOf(val) > -1);
    }


   public static mapAddressFromServiceLayerToAddressInFE(address:any):Address{


       if(null != address){
           var city= (null != address.city?(address.city).toUpperCase():cst.EMPTY_STR);
           var POBox=(null != address.poBox?address.poBox:cst.EMPTY_STR);
           var state=(null != address.state?address.state:cst.EMPTY_STR);
           var streetName= (null != address.streetName?(address.streetName).toUpperCase():cst.EMPTY_STR);
           var streetNum= (null != address.streetNumber?address.streetNumber:cst.EMPTY_STR);
           var zipcode= (null != address.zipCode?address.zipCode:cst.EMPTY_STR);
       }
       return new Address(streetNum,streetName,city,state,zipcode);
  }

    public static createBpAddressStrFromObj(address: any): string {

  		 if(null != address && this.isNotBlank(address.streetNumber) && this.isNotBlank(address.streetName)){
  			   return address.streetNumber+cst.EMPTY_SPACE+this.toUpperCase(address.streetName)+cst.EMPTY_SPACE+this.toUpperCase(address.city)
  					   +cst.EMPTY_SPACE+address.state+","+cst.EMPTY_SPACE+address.zipCode;
  		   }else{
  			   return cst.NOT_PROVIDED;
  		   }
    }


    public static equalsIgnoreCase(val1: string, val2:string): boolean {

        if(isString(val1) && isString(val2) && trim(val1).length > 0 && trim(val2).length > 0){
            if(val1.toUpperCase() === val2.toUpperCase()){
                return true;
            }else{
                return false;
            }

        }
        return false;
    }

    public static getFormattedPhoneNumber(phone: string): string {

      if(this.isNotBlank(phone) && phone.length == 10){
          return phone.substring(0,3)+"-"+phone.substring(3,6)+"-"+phone.substring(6)
      }
    }

    public static isBrokerOrBrokerAssociate(webSecurityRole: string){

       if(CommonUtil.equalsIgnoreCase(webSecurityRole, 'E_Broker_BRK_ADM') ||
           CommonUtil.equalsIgnoreCase(webSecurityRole, 'E_Broker Associate_BRK_ASC')){
         return true;
       }
       return false;
    }

    public static hasAssociations(webSecurityRole: string) {

      if(CommonUtil.equalsIgnoreCase(webSecurityRole, 'I_Admin_OPS_MGR') ||
          CommonUtil.equalsIgnoreCase(webSecurityRole, 'I_Read-Only_IT') ||
            CommonUtil.equalsIgnoreCase(webSecurityRole, 'I_Agent_OPS_REP')){
        return false;
      }
      return true;
    }

}
