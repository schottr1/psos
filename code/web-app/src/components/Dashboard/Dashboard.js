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
      <div
        className={
          this.state.isSideNavOpen === false
            ? 'smallView_Dashboard'
            : 'DashboardContainer'
        }
      > 
        <div className="bx--grid fullContainerGrid">
          <div className="bx--row padding-0">
            <div className="bx--col-xlg-16 bx--col-lg-16 bx--col-md-8">
              <div className="bx--row padding-0">
                <div
                  className="bx--col-xlg-11 bx--col-lg-11 bx--col-md-5 bx--col-sm-4"
                  id={
                    this.state.isMobileView === true
                      ? 'leftContainerWraper_mobile'
                      : 'leftContainerWraper'
                  }
                >
                  <div className="mapContainer">
                    <span className="minimize">
                      <span className="mimizeIcon">
                        <Minimize20 />
                      </span>
                      <Settings32 />
                    </span>
                   <> <h3>Welcome Back, Jane</h3></>
                   <><div style={{"padding":"10px"}}>Since Your Last Login: 
                  <h4><span style={{"color":"yellow"}}>{this.state.rowcount}</span>  Filed orders&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style={{"color":"yellow"}}>0</span> Verified orders</h4></div></>
                   	   <div className='Form-module--buttonRow'>
                   	  <div className="orderSearch"> 
                        <Search
                           className="some-class"
                           closeButtonLabelText="Clear search input"
                           defaultValue=""
                           id="search-1"
                           labelText="Search"
                           name=""
                           onChange={this.handleChange}
                           placeHolderText="Search officer name, agency, or case #"
                           size="xl"
                           type="text"
                         /> </div>
                        <div className="ordernew"> 
                           <button className='Form-module--button bx--btn bx--btn--primary' type='button' onClick={this.layerPreferenceClick} >New +</button>
                           <div className={!this.state.layerPreference ? 'hide' : ''}>
                           <PreferenceModel layerPrefCancel={this.layerPreferenceCancel} />
                         </div>
                           </div>
                          </div>
                          </div>
                          <div className="datatab">
                    <>
                      <DataTable isSortable
	//        rows={rows.filter((row) => row.cells[0].value.startsWith(this.state.searchFilter))}
                	rows={rows}
                        headers={headers}
                        render={({ rows, headers, getHeaderProps }) => (
                          <TableContainer title="Suppression Orders Database">
                            <Table>
                              <TableHead>
                                <TableRow>
                                  {headers.map((header) => (
                                    <TableHeader key={header.key} {...getHeaderProps({ header })}>
                                      {header.header}
                                    </TableHeader>
                                  ))}
                                </TableRow>
                              </TableHead>
                              <TableBody>
			        {rows.map((row) => (
                                  <TableRow key={row.id}>
                                    {row.cells.map((cell) => (
                                      <TableCell key={cell.id}>{cell.value}</TableCell>
                                    ))}
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        )}
                      />
                      </>
                  </div>

                  
                </div>
                <div
                  className="bx--col-xlg-5 bx--col-lg-5 bx--col-md-3 bx--col-sm-4 "
                  id={
                    this.state.isMobileView === true
                      ? 'rightContainerWraper_mobile'
                      : 'rightContainerWraper'
                  }
                >
                  <div className="rightContainer">
                    <NewsAndAlert
                      newsDetails={newsDetailsState}
                      alertDetail={alertDetailState}
                    />
                    {/* <div className="newsTitle"> News Feed<span className="minimize"><span className="mimizeIcon"><Minimize20 /></span><Settings32 /></span></div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
