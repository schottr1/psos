import React, { Component } from 'react';
import { Modal } from "carbon-components-react"; 
import AddAlt20 from "@carbon/icons-react/lib/add--alt/20";
import './preferenceModal.scss';
import Edit20 from '@carbon/icons-react/lib/edit/20';
import View20 from '@carbon/icons-react/lib/view/20';
import Save20 from '@carbon/icons-react/lib/save/20';
import { TooltipDefinition } from "carbon-components-react";
import toolTipNodesForPref from './preferenceTooltip';
import {
    Tab, Tabs, RadioButtonGroup, RadioButton,
    Checkbox, Slider, DataTable, Select, SelectItem,
    TextArea,Form, FormGroup, TextInput, DatePicker, DatePickerInput, FileUploader
} from 'carbon-components-react';
import axios from 'axios';

const fileUploader = () => {
	return {
	  labelTitle: 'Upload',
	  labelDescription: 'only .jpg files at 500mb or less',
	  buttonLabel: 'Add files',
	  buttonKind: 'primary',
	  filenameStatus: 'edit',
	  accept: [ '.jpg', '.png' ],
	  iconDescription: "Clear file",
	  onChange: (e) => { console.log('onChange: ', e.target) },
	  onClick: (e) => { console.log('onClick: ', e.target) },
	  onDelete: (e) => { console.log('onDelete: ', e.target) },
	};
  }

export default class preferenceModal extends Component {
   

      constructor(props) {
    	    super(props);
    	   /*
    	    *   this.state =  
    	    {
    	    "_id":"0446cebf-4f21-49ea-b37e-069fd8c904bf",
    	    "id":"0446cebf-4f21-49ea-b37e-069fd8c904bf",
    	    "date":"",
    	    "state":"MN",
    	    "caseNumber":"",
    	    "summary":"some error",
    	    "motionGranted":false,
    	    "writtenOrder":false,
    	    "foundNotCredible":false,
    	    "issuesLitigated":[],
    	    "prosecutor":{},
    	    "defenseAttorney":{},
    	    "verifiedDate":"",
    	    "primaryOfficers":[{"lastName":"","firstName":""}],
    	    "attendingOfficers":[],
    	    "whenCreated":1596182540225
    	    };
    	    
    	    */ 
    	    this.state =  
    	    {
    	    "_id":"0446cebf-4f21-49ea-b37e-069fd8c904bf",
    	    "id":"0446cebf-4f21-49ea-b37e-069fd8c904bf",
    	    "date":"",
    	    "state":"MN",
    	    "caseNumber":"",
    	    "summary":"",
    	    "motionGranted":false,
    	    "writtenOrder":false,
    	    "foundNotCredible":false,
    	    "issuesLitigated":[],
    	    "prosecutor":{},
    	    "defenseAttorney":{},
    	    "verifiedDate":"",
    	    "primaryOfficers":[{"lastName":"","firstName":"","badge":"","agency":""}],
    	    "attendingOfficers":[],
    	    "whenCreated":1596182540225,
    	    "errorMessage":"",
    	    "message":""
    	    };
    	    

    	    Date.prototype.yyyymmdd = function() {
    	    	  var mm = this.getMonth() + 1; // getMonth() is zero-based
    	    	  var dd = this.getDate(); 
    	    	  return [this.getFullYear(),
    	    	          (mm>9 ? '' : '0') + mm,
    	    	          (dd>9 ? '' : '0') + dd
    	    	         ].join('-');
    	    	};

    	    	var date = new Date();
    	    	var constiso = date.yyyymmdd(); 
    	    	var unixt=Date.now();  
    	    	this.setState({["date"]: constiso});
    	    	this.setState({["whenCreated"]: unixt}); 
    	    
    	  }
  
      mySubmitHandler = (event) => {
    	    event.preventDefault();
    	    var dt= Date.now();
    	    this.setState({['id']: 'id'+dt});
    	    this.setState({['_id']: 'id'+dt});
    	    this.setState({['whenCreated']: dt}); 
     	    console.log("You are submitting " + this.state); 
     	   console.log(JSON.stringify(this.state));
     	    	
     	 axios.post('http://psos-server.us-east.mybluemix.net/api/v1/suppression', this.state)
         .then(response => {
        	 console.log(JSON.stringify(response));  
        	 this.setState({ message: "New Suppression Order added successfully!!!" });
         }).catch(error => {
             this.setState({ errorMessage: error.message });
             console.error('There was an error adding the new Suppression Order !', error);
         });
      }
      
      myChangeHandler = (event) => {
    	    let nam = event.target.id;
    	    let val = event.target.value; 
    	    var fname=this.state.primaryOfficers[0].firstName;
    	    var lname=this.state.primaryOfficers[0].lastName;
    	    var badge=this.state.primaryOfficers[0].badge;
    	    var agency=this.state.primaryOfficers[0].agency;
            	    
    	    if (nam==='firstName' || nam==='lastName' || nam==='badge' || nam==='agency'){
    	    	if (nam==='firstName')
    	    		fname=val;
    	    	else if (nam==='lastName')
    	    		lname=val;
    	    	else if  (nam==='badge')
    	    		badge=val;
    	    	else agency=val; 
    	    	this.setState({
    	    		primaryOfficers:[{"lastName":lname,"firstName":fname,"badge":badge,"agency":agency}]
    	  	  })
    	    }else 
    	    	this.setState({[nam]: val});
		  }
 
    render() {
        const self = this.state;
        return (
            <div class="layerPreferenceContent">
                <Modal
                    className="some-class"
                    hasScrollingContent={false}
                    iconDescription="Close the modal"
                    modalAriaLabel=""
                    modalHeading="Add a New Suppression Order"
                    modalLabel=""
                    onBlur={function noRefCheck() { }}
                    onClick={function noRefCheck() { }}
                    onFocus={function noRefCheck() { }}
                    onKeyDown={function noRefCheck() { }}
                    onRequestClose={this.props.layerPrefCancel}
                    onRequestSubmit={this.mySubmitHandler}
                    onSecondarySubmit={this.props.layerPrefCancel} 
                    open
                    passiveModal={false}
                    primaryButtonDisabled={false}
                    primaryButtonText="Save"
                    secondaryButtonText="Cancel"
                    selectorPrimaryFocus="[data-modal-primary-focus]"
                    size={'lg'}
                >
                    <p className="bx--modal-content__text "> 
                        <div className="risk-content tabContent"> 
                        <h5 style={{"color": "#006600", "width": "100%"}}>{this.state.message !== '' ? this.state.message:''} </h5>
                        <h5 style={{"color": "#ff0000", "width": "100%"}}>{this.state.errorMessage !== '' ? this.state.errorMessage:''} </h5>
                           
                                    <div className="prefRiskAlerts-content tabContent">
                                    <Form onSubmit={this.mySubmitHandler}>
                                    <FormGroup
                                    labelPosition="right">

									<FileUploader {...fileUploader()} />

                                    <div style={{ paddingBottom: '12px',"float":"left","width":"50%" }}> 
                                          <TextInput
                                        id="firstName"
                                        labelPosition="right"
                                        invalidText="Invalid error message."
                                        labelText="Officer First Name"
                                        placeholder=""
                                        onChange={this.myChangeHandler}  /> 
                                        		
                                       
                                            	 <TextInput 
                                                 id="badge"
                                                 labelPosition="right"
                                                 invalidText="Invalid error message."
                                                 labelText="Badge #"
                                                 placeholder=""
                                                onChange={this.myChangeHandler}
                                               />
                                            	 
                                          
                                        
                                          <DatePicker dateFormat="y-m-d" datePickerType="simple">
                                          <DatePickerInput
                                            id="orderdate"
                                            placeholder="2020-08-11"
                                            labelPosition="right"
                                            labelText="Order Date"
                                            type="text"
                                            	onChange={this.myChangeHandler}
                                          />

                                          </DatePicker> 
                                          
                                          <TextInput 
                                          id="casenumber"
                                          labelPosition="right"
                                          cols={10}
                                          invalidText="Invalid error message."
                                          labelText="Case Number"
                                          placeholder=""
                                          onChange={this.myChangeHandler}
                                        /> 
                                        <TextArea
                                          cols={50}
                                          helperText=""
                                          id="summary"
                                          labelPosition="right"
                                          invalidText="Invalid error message."
                                          labelText="Summary/Comments"
                                          placeholder=""
                                          rows={2}
                                        onChange={this.myChangeHandler}
                                        />
                                        
                                       
                                        
                                      
                                        
                                          </div>
                                          <div style={{ paddingLeft: '12px',paddingBottom: '12px',"float":"right","width":"50%" }}> 
                                          <TextInput
                                          id="lastName"
                                          labelPosition="right"
                                          invalidText="Invalid error message."
                                          labelText="Officer Last Name"
                                          placeholder=""
                                          onChange={this.myChangeHandler}
                                          />
                                         
                                          <TextInput 
                                          id="agency"
                                          labelPosition="right"
                                          invalidText="Invalid error message."
                                          labelText="Law Enforcement Agency"
                                          placeholder=""
                                          onChange={this.myChangeHandler}
                                        /> 
                                          
                                          
                                          <Select
                                          defaultValue="" 
                                          id="state"
                                          invalidText="A valid value is required"
                                          labelText="State"
                                          >
                                          <SelectItem  text="STATE"   value="" />
                                          	<SelectItem value="AL"  text="Alabama" />
                                          	<SelectItem value="AK"  text="Alaska" />
                                          	<SelectItem value="AZ"  text="Arizona" />
                                          	<SelectItem value="AR"  text="Arkansas" />
                                          	<SelectItem value="CA"  text="California" />
                                          	<SelectItem value="CO"  text="Colorado" />
                                          	<SelectItem value="CT"  text="Connecticut" />
                                          	<SelectItem value="DE"  text="Delaware" />
                                          	<SelectItem value="DC"  text="District Of Columbia" />
                                          	<SelectItem value="FL"  text="Florida" />
                                          	<SelectItem value="GA"  text="Georgia" />
                                          	<SelectItem value="HI"  text="Hawaii" />
                                          	<SelectItem value="ID"  text="Idaho" />
                                          	<SelectItem value="IL"  text="Illinois" />
                                          	<SelectItem value="IN"  text="Indiana" />
                                          	<SelectItem value="IA"  text="Iowa" />
                                          	<SelectItem value="KS"  text="Kansas" />
                                          	<SelectItem value="KY"  text="Kentucky" />
                                          	<SelectItem value="LA"  text="Louisiana" />
                                          	<SelectItem value="ME"  text="Maine" />
                                          	<SelectItem value="MD"  text="Maryland" />
                                          	<SelectItem value="MA"  text="Massachusetts" />
                                          	<SelectItem value="MI"  text="Michigan" />
                                          	<SelectItem value="MN"  text="Minnesota" />
                                          	<SelectItem value="MS"  text="Mississippi" />
                                          	<SelectItem value="MO"  text="Missouri" />
                                          	<SelectItem value="MT"  text="Montana" />
                                          	<SelectItem value="NE"  text="Nebraska" />
                                          	<SelectItem value="NV"  text="Nevada" />
                                          	<SelectItem value="NH"  text="New Hampshire" />
                                          	<SelectItem value="NJ"  text="New Jersey" />
                                          	<SelectItem value="NM"  text="New Mexico" />
                                          	<SelectItem value="NY"  text="New York" />
                                          	<SelectItem value="NC"  text="North Carolina" />
                                          	<SelectItem value="ND"  text="North Dakota" />
                                          	<SelectItem value="OH"  text="Ohio" />
                                          	<SelectItem value="OK"  text="Oklahoma" />
                                          	<SelectItem value="OR"  text="Oregon" />
                                          	<SelectItem value="PA"  text="Pennsylvania" />
                                          	<SelectItem value="RI"  text="Rhode Island" />
                                          	<SelectItem value="SC"  text="South Carolina" />
                                          	<SelectItem value="SD"  text="South Dakota" />
                                          	<SelectItem value="TN"  text="Tennessee" />
                                          	<SelectItem value="TX"  text="Texas" />
                                          	<SelectItem value="UT"  text="Utah" />
                                          	<SelectItem value="VT"  text="Vermont" />
                                          	<SelectItem value="VA"  text="Virginia" />
                                          	<SelectItem value="WA"  text="Washington" />
                                          	<SelectItem value="WV"  text="West Virginia" />
                                          	<SelectItem value="WI"  text="Wisconsin" />
                                          	<SelectItem value="WY"  text="Wyoming" />

                                        </Select>
                                          
                                          </div>

                                          </FormGroup> 
                                        </Form>
                                    </div>
                                 
                        </div>


                    </p>
                </Modal>
            </div>
        )
    }
}

