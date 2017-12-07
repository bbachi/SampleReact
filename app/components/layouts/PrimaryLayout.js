import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Header from '../common/header.js'
import Footer from '../common/footer.js'
import OverviewPage from '../overview/OverviewPage'
import AddUserLayout from './AddUserLayout'
import ManageUserLayout from './ManageUserLayout'
import ManageContractLayout from './ManageContractLayout'
import IncentiveOfferPage from '../incentiveoffers/IncentiveOfferPage'
import FormUploadLayout from './FormUploadLayout'
import ESIIDLookupPage from '../esiidlookup/ESIIDLookupPage'
import MrktgAgreementLayout from './MrktgAgrmtLayout'


const PrimaryLayout = ({ match }) => {

    return(
        <div className="pageContainer">
            <Header />
            <Switch>
                <Route path={`${match.path}/overview`} exact component={OverviewPage} />
                <Route path={`${match.path}/adduser`} component={AddUserLayout} />
                <Route path={`${match.path}/manageusers`} component={ManageUserLayout} />
                <Route path={`${match.path}/marketingagreements`} component={MrktgAgreementLayout} />
                <Route path={`${match.path}/managecontract`} component={ManageContractLayout} />
                <Route path={`${match.path}/incentiveoffers/manage`} component={IncentiveOfferPage} />
                <Route path={`${match.path}/formupload`} component={FormUploadLayout} />
                <Route path={`${match.url}/lookup/esiid`} component={ESIIDLookupPage} />
            </Switch>
             <Footer />
        </div>

    )}

export default PrimaryLayout
