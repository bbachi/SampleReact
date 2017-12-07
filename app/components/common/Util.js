import * as consts from './constants'
import * as _ from 'lodash'

class CommonUtil {

    static isUserHasAssociations(userType) {
        let isUserHasAssc = [];
        consts.noAssociationUsers.map(type => {
            if(type == userType){
                isUserHasAssc.push(type);
            }
        });
        return isUserHasAssc.length == 0;
    }

    static isAssociatesAdding(userType) {
        let isUserHasAssc = [];
        consts.associates.map(type => {
            if(type == userType){
                isUserHasAssc.push(type);
            }
        });
        return isUserHasAssc.length != 0;
    }

    static ableToAccessPriv(userType) {
        let ableToAccessPriv = [];
        consts.notAbleToAccessPriv.map(type => {
            if(type == userType){
                ableToAccessPriv.push(type);
            }
        });
        return ableToAccessPriv.length == 0;
    }


    static disabledAccessPriv(userType) {
        let disabledAccesspriv = [];
        consts.accessPrivDisabled.map(type => {
            if(type == userType){
                disabledAccesspriv.push(type);
            }
        });
        return disabledAccesspriv.length != 0;
    }

    static getUserCategory(securityRole) {
        let category = '';
        let first3 = securityRole.substring(0,3)
        console.log("securityRole:::"+securityRole+"::::first3:::"+first3)
        if(first3 == 'INT') return 'Internal';
        if(first3 == 'EXT') return 'External';
    }

    static getSecurityRoleDisplayName(securityRole) {

        switch(securityRole){
            case 'INT_ADMIN': return "Admin";
            case 'INT_AGT_EMA': return "Agent"
            case 'INT_AGT_EMM': return "Agent"
            case 'EXT_BROKER': return "Broker"
            case 'EXT_CA_PO': return "Customer Admin"
            case 'EXT_CA_PM': return "Customer Admin"
            case 'INT_READ_ONLY': return "Read-Only"
            case 'INT_AGT_OPREP': return "Agent"
            case 'EXT_READ_ONLY': return "External Read-Only"
            case 'EXT_CUS_ASC': return "Customer Associate"
            case 'EXT_BRK_ASC': return "Broker Associate"
            default: ""
        }
    }

    static getUserTypeDisplayName(securityRole) {

        switch(securityRole){
            case 'INT_AGT_EMA': return "Account Executive"
            case 'INT_AGT_EMM': return "Sales Executive"
            case 'EXT_CA_PO': return "Property Owner"
            case 'EXT_CA_PM': return "Property Manager"
            case 'INT_AGT_OPREP': return "Operations Representative"
            default: ""
        }
    }

    static showInternal(securityRole){
      console.log("----"+securityRole)
      switch(securityRole){
          case 'INT_ADMIN': return true
          case 'I_Admin_OPS_MGR': return true
          default: return false;
      }
    }

    static isAdmin(securityRole) {

      switch(securityRole){
          case 'INT_ADMIN': return true
          case 'I_Admin_OPS_MGR': return true
          default: return false;
      }
    }

    static isAgentAMMorEMA(securityRole) {

      switch(securityRole){
          case 'I_Agent_EMM': return true
          case 'I_Agent_EMA': return true
          default: return false;
      }
    }

    static dontShowExtReadOnly(securityRole){

      switch(securityRole){
          case 'INT_AGT_EMA': return true
          case 'INT_AGT_EMM': return true
          case 'INT_AGT_OPREP': return true
          case 'I_Agent_EMM': return true
          case 'I_Agent_EMA': return true
          case 'I_Agent_OPS_REP': return true
          default: return false;
      }
    }

    static showAssociatesLink(securityRole) {
        console.log("dsfdf:::::::::"+securityRole)
        let secRoleAry = ['EXT_CA_PM','EXT_CA_PO','E_Customer Admin_PO','E_Customer Admin_PM','E_Broker_BRK_ADM','EXT_BROKER']
        let foundAry = [];
        secRoleAry.map(secRole => {
            if(secRole == securityRole) foundAry.push(secRole);
        })
        return foundAry.length > 0;
    }

    static showAssociateAdmin(securityRole) {

        if(securityRole == 'EXT_BRK_ASC' || securityRole == 'EXT_CUS_ASC') {
            return true;
        }
        return false;
    }

    static isBroker(securityRole) {

        if(securityRole == 'EXT_BRK_ASC' || securityRole == 'EXT_CUS_ASC') {
            return true;
        }
        return false;
    }

    static isUserBroker(securityRole) {

        if(securityRole == 'E_Broker_BRK_ADM' || securityRole == 'EXT_BROKER'
            || securityRole == 'EXT_BRK_ASC' || securityRole == 'E_Broker Associate_BRK_ASC' ||
          securityRole == 'E_Broker_Associate_BRK_ASC') {
            return true;
        }
        return false;
    }

    static isUserCustomerAdmin(securityRole) {

        let secRoleAry = ['EXT_CA_PM','EXT_CA_PO','E_Customer Admin_PO','E_Customer Admin_PM']
        let selected = [];
        secRoleAry.map(secRole => {
            if(secRole == securityRole){
              selected.push(secRole)
            }
        })
        return selected.length >0;
    }

    static showUserType(securityRole) {

        let secRoleAry = ['EXT_CA_PM','EXT_CA_PO','INT_AGT_EMA','INT_AGT_EMM','INT_AGT_OPREP']
        let selected = [];
        secRoleAry.map(secRole => {
            if(secRole == securityRole){
              selected.push(secRole)
            }
        })
        return selected.length >0;
    }

    static showSapId(securityRole) {

        if(this.isNotBlank(securityRole)){
            let substr = securityRole.substring(0,3)
            if(securityRole == 'INT_READ_ONLY'){return false}
            if(substr == 'INT') return true
        }
        return false;
    }

    static showSapIdOnUpdatePage(securityRole){

        if(this.isNotBlank(securityRole)){
            if(securityRole == 'I_Admin_OPS_MGR') return true;
        }
        return false;
    }

    static showAccessPrivOnUpdatePage(securityRole) {

        let secRoleAry = ['EXT_CA_PM','EXT_CA_PO','EXT_CUS_ASC','E_Customer Admin_PO','E_Customer Admin_PM','E_Customer Associate_PS']
        secRoleAry.map(secRole => {
            if(secRole == securityRole)return true;
        })
        return false;
    }

    static showNoAssociations(securityRole) {

      let secRoleAry = ['INT_ADMIN','INT_READ_ONLY','INT_AGT_OPREP']
      secRoleAry.map(secRole => {
          if(secRole == securityRole)return true;
      })
      return false;
    }

    static checkFileType(fileName, fileType){
        console.log("filename::"+fileName)
				if(undefined != fileName){
						let fileAry = fileName.split(".")
						if(undefined != fileAry && undefined != fileAry.length){
								if(fileType != fileAry[1]){
									return false;
								}
						}
				}
				return true;
		}

    static isNotBlank(val: string): boolean {

        if(undefined != val && val.trim().length > 0){
            return true;
        }
        return false;
    }

    static getPaymentAddress(paymentInfo){

        if(undefined != paymentInfo && undefined != paymentInfo.streetNumber){
            return paymentInfo.streetNumber+" "+paymentInfo.streetName+" "+paymentInfo.city+", "+paymentInfo.state+" "+paymentInfo.zipcode
        }else{
          return "Not Provided"
        }
    }

    static getPaymentPhoneNum(val, extn){

        if(this.isNotBlank(val)){
            return val+(CommonUtil.isNotBlank(extn)?' Extn '+extn:'')
        }else{
          return "Not Provided"
        }
    }

    static getBillingAddress(agreement){

        if(undefined != agreement && undefined != agreement.contactStreetNum){
            return agreement.contactStreetNum+" "+agreement.contactStreetName+" "+agreement.contactCity+", "+agreement.contactState+" "+agreement.contactZipcode
        }else{
          return "Not Provided"
        }
    }

    static getPaymentAddressFromAgrm(agreement){

        if(undefined != agreement && undefined != agreement.paymentStreetNum){
            return agreement.paymentStreetNum+" "+agreement.paymentStreetName+" "+agreement.paymentCity+", "+agreement.paymentState+" "+agreement.paymentZipcode
        }else{
          return "Not Provided"
        }
    }

    static getPhoneDisplay(phoneNumber, extn){
      return this.isNotBlank(phoneNumber)?(this.isNotBlank(extn)?phoneNumber+' ext '+extn:phoneNumber):'Not Provided'
    }

    static onManagementCBox(custList: any[], selectedValue: string){

        if(undefined != custList && custList.length > 0){
            custList.forEach(mngt => {
                if(mngt.bpNumber == selectedValue){mngt.selected = !mngt.selected}
                    mngt.regionList.forEach(rgn => {rgn.selected = mngt.selected
                        rgn.propertyList.forEach(prop => {prop.selected = mngt.selected
                        })
                    })
                  })
         }
         return custList
    }

    static onRegionCBox(custList: any[], selectedValue: string){

        custList.forEach(mngt => {
            let regLength = mngt.regionList.length
            let selLength = 0
            mngt.regionList.forEach(rgn => {
                if(rgn.bpNumber == selectedValue){rgn.selected = !rgn.selected}
                if(rgn.selected) selLength++
                rgn.propertyList.forEach(prop => {prop.selected = rgn.selected})
            })
            mngt.selected = (selLength == mngt.regionList.length)
        })
        return custList
    }

    static onPropertyCBox(custList: any[], selectedValue: string, securityRole: string){

        if(securityRole == 'INT_AGT_EMM'){
            custList.forEach(mngt => {
                let regLength = mngt.regionList.length
                let selRgnLength = 0
                mngt.regionList.forEach(rgn => {
                    let propLength = mngt.regionList.length
                    let selPropLength = 0
                    rgn.propertyList.forEach(prop => {
                        if(prop.bpNumber == selectedValue){prop.selected = !prop.selected}
                        if(prop.selected) selPropLength++
                    });
                    rgn.selected = (selPropLength == rgn.propertyList.length)
                    if(rgn.selected) selRgnLength++
                });
                mngt.selected = (selRgnLength == mngt.regionList.length)
            });
        }else if(securityRole == 'INT_AGT_EMA'){
            custList.forEach(mngt => {
                mngt.regionList.forEach(rgn => {
                    rgn.propertyList.forEach(prop => {
                        if(prop.bpNumber == selectedValue){prop.selected = !prop.selected}
                    });
                });
            });
        }else{
          custList.forEach(mngt => {
              let regLength = mngt.regionList.length
              let selRgnLength = 0
              mngt.regionList.forEach(rgn => {
                  let propLength = mngt.regionList.length
                  let selPropLength = 0
                  rgn.propertyList.forEach(prop => {
                      if(prop.bpNumber == selectedValue){prop.selected = !prop.selected}
                      if(prop.selected) selPropLength++
                  });
                  rgn.selected = (selPropLength == rgn.propertyList.length)
                  if(rgn.selected) selRgnLength++
              });
              mngt.selected = (selRgnLength == mngt.regionList.length)
          });
        }
        return custList
    }

    static onManagementCBoxOnVerify(custList: any[], selectedValue: string){

        custList.forEach(mngt => {
            if(mngt.bpNumber == selectedValue){mngt.verifySelected = !mngt.verifySelected}
                mngt.regionList.forEach(rgn => {rgn.verifySelected = mngt.verifySelected
                    rgn.propertyList.forEach(prop => {prop.verifySelected = mngt.verifySelected})
                })
              })
         return custList
    }

    static onRegionCBoxOnVerify(custList: any[], selectedValue: string){

        custList.forEach(mngt => {
            let regLength = mngt.regionList.length
            let selLength = 0
            let selVerifyLength = 0
            mngt.regionList.forEach(rgn => {
                if(rgn.bpNumber == selectedValue){rgn.verifySelected = !rgn.verifySelected}
                if(rgn.verifySelected) selVerifyLength++
                rgn.propertyList.forEach(prop => {prop.verifySelected = rgn.verifySelected})
            })
            mngt.verifySelected = (selVerifyLength == mngt.regionList.length)
        })
        return custList
    }

    static onPropertyCBoxOnVerify(custList: any[], selectedValue: string, securityRole: string){

        if(securityRole == 'INT_AGT_EMM'){
            custList.forEach(mngt => {
                let regLength = mngt.regionList.length
                let selRgnLength = 0
                let selRegVerifyLength = 0
                mngt.regionList.forEach(rgn => {
                    let propLength = mngt.regionList.length
                    let selPropLength = 0
                    let selpropVerifyLength = 0
                    rgn.propertyList.forEach(prop => {
                        if(prop.bpNumber == selectedValue){prop.verifySelected = !prop.verifySelected}
                        if(prop.verifySelected) selpropVerifyLength++
                    });
                    rgn.verifySelected = (selpropVerifyLength == rgn.propertyList.length)
                    if(rgn.verifySelected) selRegVerifyLength++
                });
                mngt.verifySelected = (selRegVerifyLength == mngt.regionList.length)
            });
        }else if(securityRole == 'INT_AGT_EMA'){
            custList.forEach(mngt => {
                mngt.regionList.forEach(rgn => {
                    rgn.propertyList.forEach(prop => {
                        if(prop.bpNumber == selectedValue){prop.verifySelected = !prop.verifySelected}
                    });
                });
            });
        }else{
            custList.forEach(mngt => {
                let regLength = mngt.regionList.length
                let selRgnLength = 0
                let selRegVerifyLength = 0
                mngt.regionList.forEach(rgn => {
                    let propLength = mngt.regionList.length
                    let selPropLength = 0
                    let selpropVerifyLength = 0
                    rgn.propertyList.forEach(prop => {
                        if(prop.bpNumber == selectedValue){prop.verifySelected = !prop.verifySelected}
                        if(prop.verifySelected) selpropVerifyLength++
                    });
                    rgn.verifySelected = (selpropVerifyLength == rgn.propertyList.length)
                    if(rgn.verifySelected) selRegVerifyLength++
                });
                mngt.verifySelected = (selRegVerifyLength == mngt.regionList.length)
            });
        }
        return custList
    }


    static onMngmtCBoxOnUpdatePage(custList: any[], selectedValue: string){

        custList.forEach(mngt => {
            if(mngt.bpNumber == selectedValue) {
                mngt.selectedOnUpdatePage = !mngt.selectedOnUpdatePage}
                mngt.regionList.forEach(rgn => {
                  rgn.selectedOnUpdatePage = mngt.selectedOnUpdatePage
                    rgn.propertyList.forEach(prop => {
                      prop.selectedOnUpdatePage = mngt.selectedOnUpdatePage
                    })
                })
              })
         return custList
    }

    static onRegionCBoxOnUpdatePage(custList: any[], selectedValue: string){

        custList.forEach(mngt => {
            let regLength = mngt.regionList.length
            let selLength = 0
            mngt.regionList.forEach(rgn => {
                if(rgn.bpNumber == selectedValue){rgn.selectedOnUpdatePage = !rgn.selectedOnUpdatePage}
                if(rgn.selectedOnUpdatePage) selLength++
                rgn.propertyList.forEach(prop => {prop.selectedOnUpdatePage = rgn.selectedOnUpdatePage})
            })
            mngt.selectedOnUpdatePage = (selLength == mngt.regionList.length)
        })
        return custList
    }

    static onPropCBoxOnUpdatePage(custList: any[], selectedValue: string, securityRole: string){

        custList.forEach(mngt => {
              let regLength = mngt.regionList.length
              let selRgnLength = 0
              mngt.regionList.forEach(rgn => {
                  let propLength = mngt.regionList.length
                  let selPropLength = 0
                  rgn.propertyList.forEach(prop => {
                      if(prop.bpNumber == selectedValue){
                          prop.selectedOnUpdatePage = !prop.selectedOnUpdatePage
                      }
                      if(prop.selectedOnUpdatePage) selPropLength++
                  });
                  rgn.selectedOnUpdatePage = (selPropLength == rgn.propertyList.length)
                  if(rgn.selectedOnUpdatePage) selRgnLength++
              });
              mngt.selectedOnUpdatePage = (selRgnLength == mngt.regionList.length)
            });
        return custList
    }

    static isCustomerSelected(custList: any[], securityRole){
        if(securityRole == 'EXT_BROKER') return true;
        let selected = []
        custList.forEach(mngt => {
            if(mngt.selected){selected.push(mngt)}
                mngt.regionList.forEach(rgn => {if(rgn.selected){selected.push(rgn)}
                    rgn.propertyList.forEach(prop => {if(prop.selected){selected.push(prop)}})
                })
            })
      return selected.length >0
    }

    static getUserCategory(userCategory: string){

        return userCategory == "I"?"Internal":"External"
    }

    static convertCSVDataToArray(csvFileData): any {

        let headers = [];
        let dataArray = [];
        try{
          if(undefined != csvFileData){
              let lineAry = csvFileData.split('\r\n');
              headers = lineAry[0].split(",");
              lineAry.forEach((line,index) => {
                  if(index != 0){
                      dataArray.push(line.split(","));
                  }
              })
          }
        }catch(err){
            console.log('ERROR=====convertCSVDataToArray===>'+err.message)
        }
        return {headers, data: dataArray};
    }

    static mergeCustomers(actualList, assMoreList) {
        console.log("in util")
        console.log(actualList)
        console.log(assMoreList)
        if(actualList.length == 0){
          return assMoreList;
        }else if(actualList.length > 0){
            return [].concat(actualList, assMoreList)
        }

    }

    static getUserTypeDisplayNameStr(securityRoleDisplayName):string {


        if(securityRoleDisplayName == 'EMA'){
          return 'Account Executive';
        }else if(securityRoleDisplayName == 'EMM'){
          return 'Sales Executive';
        }else{
          return securityRoleDisplayName;
        }

    }

}

export default CommonUtil;
