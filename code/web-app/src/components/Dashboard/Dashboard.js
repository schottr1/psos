import React, { Component } from 'react';
import './Dashboard.scss'; 
import Settings32 from '@carbon/icons-react/lib/settings/20'; 
import Minimize20 from '@carbon/icons-react/lib/minimize/20';
import RiskServices from '../services/'; 
import NewsAndAlert from '../newsAndAlerts/';
import getTableRowsAndHeaders from './CsvData'
import { Search } from 'carbon-components-react';
import { DataTable } from 'carbon-components-react';
import PreferenceModel from './../preference/preferenceModal'; 
import axios from 'axios';
import HeaderContainer from "carbon-components-react/lib/components/UIShell/HeaderContainer";
import {
  Content,
  Header,
  HeaderMenuButton,
  HeaderName,
  HeaderGlobalBar,
  HeaderGlobalAction,
  HeaderMenu,
  HeaderMenuItem,
  HeaderNavigation,
  HeaderSideNavItems,
  SkipToContent,
  SideNav,
  SideNavItems,
  SideNavLink,
  SideNavMenu,
  SideNavMenuItem
} from "carbon-components-react/lib/components/UIShell";
import Search20 from "@carbon/icons-react/lib/search/20";
import Notification20 from "@carbon/icons-react/lib/notification/20";
import AppSwitcher20 from "@carbon/icons-react/lib/app-switcher/20";

const Fade16 = () => (
  <svg
    width="16"
    height="16"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    aria-hidden="true"
  >
    <path d="M8.24 25.14L7 26.67a14 14 0 0 0 4.18 2.44l.68-1.88a12 12 0 0 1-3.62-2.09zm-4.05-7.07l-2 .35A13.89 13.89 0 0 0 3.86 23l1.73-1a11.9 11.9 0 0 1-1.4-3.93zm7.63-13.31l-.68-1.88A14 14 0 0 0 7 5.33l1.24 1.53a12 12 0 0 1 3.58-2.1zM5.59 10L3.86 9a13.89 13.89 0 0 0-1.64 4.54l2 .35A11.9 11.9 0 0 1 5.59 10zM16 2v2a12 12 0 0 1 0 24v2a14 14 0 0 0 0-28z" />
  </svg>
);

// De-structure `DataTable` directly to get local references
const { Table, TableHead, TableHeader, TableBody, TableCell, TableContainer, TableRow } = DataTable;

class Officer {
	constructor(lastName, firstName, badge, agency) {
	  this.firstName = firstName;
	  this.lastName = lastName;
	  this.badge = badge  || 'N/A';
	  this.agency = agency  || 'N/A';
	}
  } 

class SupressionOrder {
	constructor(id, officer, caseNum, orderDate, ) { 
		this.id = id;
		this.officer = officer;
		this.caseNum = caseNum  || 'N/A';
		this.orderDate = orderDate  || 'N/A';
	}
}
class Dashboard extends Component {
  constructor(props) {
    super(props); 
    const head = [
 		{
 			key: 'officerName',
 			header: 'Officer Name'
 		},
 		{
 			key: 'officerBadge',
 			header: 'Badge #'
 		},
 		{
 			key: 'officerAgency',
 			header: 'Law Enforcement Agency'
 		},
 		{
 			key: 'caseNum',
 			header: 'Case #'
 		},
 		{
 			key: 'orderDate',
 			header: 'Order Date'
 		}
 	] ;
 
    this.state = {
      newsDetails: [], 
      isSideNavOpen: true,
      isMobileView: false,
      layerPreference: false,
      searchFilter: '',
      rows:head,
      header:head,
      rowcount:0
      
    };
  }
  
	  layerPreferenceClick = () => {
	    this.setState({ layerPreference: !this.state.layerPreference });
	  }
	  layerPreferenceCancel = () => {
	    this.setState({ layerPreference: false });
	  }
  // Check default states
  getDefaultState = () => { };

  // Construct URLS
  constructURL = () => { };

  componentDidMount() {
    
    window.addEventListener('resize', this.handleResize);
    const supressionToRow = (supressionOrder) => {
   	 
    	var ret= {
    		id: supressionOrder.id,
    		caseNum: supressionOrder.caseNum,
    		orderDate: supressionOrder.orderDate,
    		officerName: supressionOrder.officer.lastName + ', ' + supressionOrder.officer.firstName,
    		officerBadge: supressionOrder.officer.badge,
    		officerAgency: supressionOrder.officer.agency,
    	}
    	 
    	return ret;
    }
    var orders = []
    var lSearchFilter = this.state.searchFilter.toLowerCase()
    
    
        axios.get(`http://psos-server.us-east.mybluemix.net/api/v1/suppression` ,{ crossDomain: true }  )
        .then(res => {
        console.log(JSON.stringify(res));
       
        var data=res.data;
        const csvData = [];
          //csvData.push('Last Name of Officer/Trooper,First Name of Officer/Trooper,Badge Number,Law Enforcement Agency,State,Case Number,Client/Defendant Race (categories based on 2020 census),Motion to suppress granted?,Is there a written order?,Did the judge expressly find the officer not credible?,Judge Last Name,Date of Order (MM/DD/YYYY),Issues Litigated,Prosecutor,Defense Attorney,Notes,Has this information been verified?,When was this information verified?');
        this.state.rowcount=data.length;
        for (var i=0;i<data.length;i++){ 
        	var lname=data[i]["primaryOfficers"][0]["lastName"]	;
           	var fname=data[i]["primaryOfficers"][0]["firstName"]	;
          	var badge=data[i]["primaryOfficers"][0]["badge"]	;
        	var agency=data[i]["primaryOfficers"][0]["agency"]	;
        	var state=data[i]["state"]	;
        	var casenumber=data[i]["casenumber"]	;
            	var date=data[i]["date"];
           
                if (lname===null || lname===undefined) lname="";
                if (fname===null || fname===undefined) fname="";
                if (badge===null || badge===undefined) badge="";
                if (agency===null || agency===undefined) agency="";
                if (state===null || state===undefined) state="";
                if (casenumber===null || casenumber===undefined) casenumber="";
                if (date===null || date===undefined) date="";
                               
        	var rec=lname+","+fname+","+badge+","+agency+","+state+","+casenumber+","+date;
        	csvData.push(rec);
        	}
      
          	
for (var i=0;i<csvData.length;i++){
	var csvDataRow=csvData[i].split(",");
            // TODO: need to handle partially filled rows
	 if (csvDataRow.length > 5) {
		// Search officer last name, first name, agency, and case number fields
		var cdrSearchables=csvDataRow[0].concat(", ").concat(csvDataRow[1]).concat(csvDataRow[3]).concat(csvDataRow[5]).toLowerCase();
		if ( (lSearchFilter.length == 0) ||
		     (cdrSearchables.indexOf(lSearchFilter) >= 0) ) {
		 	const officer = new Officer(...(csvDataRow.slice(0, 4)))
			const supressionOrder = new SupressionOrder(i, officer, csvDataRow[5], csvDataRow[6])
	 	 	orders.push(supressionOrder)
		}
	}
	 
	 if (i==csvData.length-1){  
		 const rows = orders.map((order) => supressionToRow(order)) 
		  this.setState({rows: rows}) ;
			 	
	 }
}

   	 })
   	 

  }

    handleChange = (event) => {
	this.setState({searchFilter: event.target.value});
    }
    
  handleResize = () => {
    this.setState(
      {
        isSideNavOpen: global.window.innerWidth <= 1024 ? false : true,
        isMobileView: global.window.innerWidth <= 670 ? true : false,
      },
      () => console.log(global.window.innerWidth, this.state.isSideNavOpen)
    );
  };

  handleMapClickHandler = (event) => {
    return Promise((resolve, reject) => {
      resolve();
    });
  };

  
  render() {
    let newsDetailsState = this.state.newsDetails;
    let alertDetailState = this.state.alertDetails;
    let siteDetailsState = this.state.siteDetails;
    let covidMapState = this.state.covidMap;
    let barDetails = this.state.barDetails;

    var [rows,headers] =[this.state.rows,this.state.header]; 
    	
    return (
      <HeaderContainer
        render={({ isSideNavExpanded, onClickSideNavExpand }) => (
          <>
            <Header aria-label="IBM Platform Name">
              <SkipToContent />
              <HeaderMenuButton
                aria-label="Open menu"
                onClick={onClickSideNavExpand}
                isActive={isSideNavExpanded}
              />
              <HeaderName href="#" prefix="IBM">
                [Platform]
              </HeaderName>
              <HeaderNavigation aria-label="IBM [Platform]">
                <HeaderMenuItem href="#">Link 1</HeaderMenuItem>
                <HeaderMenuItem href="#">Link 2</HeaderMenuItem>
                <HeaderMenuItem href="#">Link 3</HeaderMenuItem>
                <HeaderMenu aria-label="Link 4" menuLinkName="Link 4">
                  <HeaderMenuItem href="#one">Sub-link 1</HeaderMenuItem>
                  <HeaderMenuItem href="#two">Sub-link 2</HeaderMenuItem>
                  <HeaderMenuItem href="#three">Sub-link 3</HeaderMenuItem>
                </HeaderMenu>
              </HeaderNavigation>
              <HeaderGlobalBar>
                <HeaderGlobalAction
                  aria-label="Search"
                  onClick={null}>
                  <Search20 />
                </HeaderGlobalAction>
                <HeaderGlobalAction
                  aria-label="Notifications"
                  onClick={null}>
                  <Notification20 />
                </HeaderGlobalAction>
                <HeaderGlobalAction
                  aria-label="App Switcher"
                  onClick={null}>
                  <AppSwitcher20 />
                </HeaderGlobalAction>
              </HeaderGlobalBar>
              <SideNav
                aria-label="Side navigation"
                expanded={isSideNavExpanded}>
                <SideNavItems>
                  <HeaderSideNavItems hasDivider={true}>
                    <HeaderMenuItem href="#">Link 1</HeaderMenuItem>
                    <HeaderMenuItem href="#">Link 2</HeaderMenuItem>
                    <HeaderMenuItem href="#">Link 3</HeaderMenuItem>
                    <HeaderMenu aria-label="Link 4" menuLinkName="Link 4">
                      <HeaderMenuItem href="#">Sub-link 1</HeaderMenuItem>
                      <HeaderMenuItem href="#">Sub-link 2</HeaderMenuItem>
                      <HeaderMenuItem href="#">Sub-link 3</HeaderMenuItem>
                    </HeaderMenu>
                  </HeaderSideNavItems>
                  <SideNavMenu renderIcon={Fade16} title="Category title">
                    <SideNavMenuItem href="javascript:void(0)">
                      Link
                    </SideNavMenuItem>
                    <SideNavMenuItem href="javascript:void(0)">
                      Link
                    </SideNavMenuItem>
                    <SideNavMenuItem href="javascript:void(0)">
                      Link
                    </SideNavMenuItem>
                  </SideNavMenu>
                  <SideNavMenu renderIcon={Fade16} title="Category title">
                    <SideNavMenuItem href="javascript:void(0)">
                      Link
                    </SideNavMenuItem>
                    <SideNavMenuItem href="javascript:void(0)">
                      Link
                    </SideNavMenuItem>
                    <SideNavMenuItem href="javascript:void(0)">
                      Link
                    </SideNavMenuItem>
                  </SideNavMenu>
                  <SideNavMenu
                    renderIcon={Fade16}
                    title="Category title"
                    isActive={true}>
                    <SideNavMenuItem href="javascript:void(0)">
                      Link
                    </SideNavMenuItem>
                    <SideNavMenuItem
                      aria-current="page"
                      href="javascript:void(0)">
                      Link
                    </SideNavMenuItem>
                    <SideNavMenuItem href="javascript:void(0)">
                      Link
                    </SideNavMenuItem>
                  </SideNavMenu>
                  <SideNavLink renderIcon={Fade16} href="javascript:void(0)">
                    Link
                  </SideNavLink>
                  <SideNavLink renderIcon={Fade16} href="javascript:void(0)">
                    Link
                  </SideNavLink>
                </SideNavItems>
              </SideNav>
            </Header>
            {/* <StoryContent /> */}
          </>
        )}
      />
    );
  }
}

export default Dashboard;
