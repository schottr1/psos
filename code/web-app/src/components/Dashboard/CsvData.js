 import axios from 'axios';
 
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

const csvToSupressionOrdersOld = (csvData, searchFilter) => {
    var orders = []
    var lSearchFilter = searchFilter.toLowerCase()
for (var i=1;i<csvData.length;i++){
	var csvDataRow=csvData[i].split(",");
            // TODO: need to handle partially filled rows
	if (csvDataRow.length > 5) {
		// Search officer last name, first name, agency, and case number fields
		var cdrSearchables=csvDataRow[0].concat(", ").concat(csvDataRow[1]).concat(csvDataRow[3]).concat(csvDataRow[5]).toLowerCase();
		if ( (lSearchFilter.length == 0) ||
		     (cdrSearchables.indexOf(lSearchFilter) >= 0) ) {
			const officer = new Officer(...(csvDataRow.slice(0, 4)))
			const supressionOrder = new SupressionOrder(i, officer, csvDataRow[5], csvDataRow[11])
		    orders.push(supressionOrder)
		}
	}
}
return orders
}

const csvToSupressionOrders = (csvData, searchFilter) => {
        var orders = []
        var lSearchFilter =  searchFilter.toLowerCase();
        
        axios.get(`http://psos-server.us-east.mybluemix.net/api/v1/suppression` ,{ crossDomain: true }  )
        .then(res => {
        console.log(JSON.stringify(res));
       
        var data=res.data;
         
        for (var i=1;i<data.length;i++){ 
	 		// Search officer last name, first name, agency, and case number fields
			var cdrSearchables=data[i]["primaryOfficers"][0]["firstName"].concat(data[i]["primaryOfficers"][0]["lastName"]).toLowerCase();
			if ( (lSearchFilter.length == 0) ||
			     (cdrSearchables.indexOf(lSearchFilter) >= 0) ) {
				const officer = new Officer(data[i]["primaryOfficers"][0]["lastName"],data[i]["primaryOfficers"][0]["firstName"],data[i]["primaryOfficers"][0]["firstName"],"N/A","N/A")
		 		const supressionOrder = new SupressionOrder(i, officer, data[i]["caseNumber"], data[i]["whenCreated"])
			    orders.push(supressionOrder)
			}
		} 
        
	 })
      	  
	return orders
}

const supressionToRow = (supressionOrder) => {
	return {
		id: supressionOrder.id,
		caseNum: supressionOrder.caseNum,
		orderDate: supressionOrder.orderDate,
		officerName: supressionOrder.officer.lastName + ', ' + supressionOrder.officer.firstName,
		officerBadge: supressionOrder.officer.badge,
		officerAgency: supressionOrder.officer.agency,
	}
}

const getSupressionRowsAndHeaders = (orders) => {

	console.log('Orders: ', orders)

	const rows = orders.map((order) => supressionToRow(order))

	console.log('Rows: ', rows)

	const headers = [
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
	]
	return [rows, headers]
}

const getTableRowsAndHeaders = (searchFilter) => {
 	return getSupressionRowsAndHeaders(csvToSupressionOrders(
		[
			'Last Name of Officer/Trooper,First Name of Officer/Trooper,Badge Number,Law Enforcement Agency,State,Case Number,Client/Defendant Race (categories based on 2020 census),Motion to suppress granted?,Is there a written order?,Did the judge expressly find the officer not credible?,Judge Last Name,Date of Order (MM/DD/YYYY),Issues Litigated,Prosecutor,Defense Attorney,Notes,Has this information been verified?,When was this information verified?',
			  'Stein,Kristopher,,Brooklyn Center Police Department,MN,27CR193901,Black or African AmericanAsian,Yes,Yes,No,Gaitas Theodora,8/1/2019,Stop (of car or person) Search of Person,Gunderson Grant,Diegel Clare,The court found Officer Stein illegally expanded the scope of an investigative stop and conducted an illegal search of the person stopped. ,Yes,7/5/2020',
			  'Wood,Nathan,,Hastings Police Department,MN,27CR1818950,Asian,Yes,Yes,No,Bartolomei Luis,10/22/2019,Invalid Warrant,Scoggins Elizabeth,Diegel Clare,This order was a decision on a Franks motion. The court found that an affidavit supporting a search warrant by  Officer Wood contains misrepresentations and omissions made deliberately or with reckless disregard for the truth . . . .,Yes,7/5/2020',
			  'Bialozynski,John,,Hennepin County Sheriffs Office,MN,27CR193048,Black or African American,Yes,Yes,No,Janzen Lisa,6/19/2019,Invalid Warrant,Moreland Asha,Diegel Clare,The court found: (1) that the ion swab referenced in the affidavit supporting the warrant was an illegal search; and (2) that info from an anonymous citizen does not establish probable cause.,Yes,7/5/2020',
			  'Creighton,Scott,,Minneapolis Police Department,MN,27CR1812138,Black or African American,Yes,Yes,No,Barnette Todd,5/16/2019,Search of CarSearch of PersonMirandaStop (of car or person) ,Cole Clair,Diegel Clare,Motion granted based on illegal search of vehicle. The court found: (1) no PC to search a vehicle after they stopped the driver on foot for speeding and believed he smelled like marijuana and there was no nexus linking the scent to the car; (2); the court found the body camera footage contradicted the officers  testimony.  See also Officer Todd Babekuhl who was also involved in this case.,Yes,7/5/2020',
			  'Babekuhl,Todd,,Minneapolis Police Department,MN,27CR1812138,Black or African American,Yes,Yes,No,Barnette Todd,5/16/2019,Search of CarSearch of PersonMirandaStop (of car or person) ,Cole Clair,Diegel Clare,Motion granted based on illegal search of vehicle. The court found: (1) no PC to search a vehicle after they stopped the driver on foot for speeding and believed he smelled like marijuana and there was no nexus linking the scent to the car; (2); the court found the body camera footage contradicted the officers testimony. See also Officer Scott Creighton who was also involved with this case.,Yes,7/5/2020',
			  'Spies,Jacob,,Minneapolis Police Department,MN,27CR192604,Black or African American,Yes,Yes,No,Chou Marta,4/12/2019,FriskSearch of Person,Scoggins Elizabeth,Diegel Clare,The court found illegal frisk/search of person whenOfficer Spies testified he then squeezed and  pinched the pocket and that he also took his thumb to apply pressure and squeezed a little bit  to ensure there were no needles present before removing the substance.,Yes,7/5/2020',
			  'Zimmerman,Katrina,,Minneapolis Police Department,MN,27CR189213,Black or African American,Yes,Yes,No,Peralta Nelson,1/18/2019,Stop (of car or person) Detention,Bell Brian,Diegel Clare,The court stated that Officer Zimmermans justification for stopping the car--that the temporary tags were suspicious--strain credulity.  Officer Nicholas Anderson was also found to have conducted an illegal stop in this case.  Court found officers failed to corroborate tip and failed to provide RAS for stop. When Officer Zimmerman asked Office Anderson if they should stop the car Officer Anderson said Might as well.,Yes,7/5/2020',
			  'Anderson,Nicholas,,Minneapolis Police Department,MN,27CR189213,Black or African American,Yes,Yes,No,Peralta Nelson,1/18/2019,Stop (of car or person) Detention,Bell Brian,Diegel Clare,The court found that Office Anderson and Officer Katrina Zimmerman failed to corroborate tip and failed to provide RAS for stop. When Officer Zimmerman asked Office Anderson if they should stop the car Officer Anderson said Might as well.,Yes,7/5/2020',
			  'Anderson,Nicholas,,Minneapolis Police Department,MN,27CR1915150,White,Yes,Yes,No,Chou Marta,9/19/2019,Search of Property,Gunderson Grant,Diegel Clare,The court found there were various discrepancies concerning to the Court when comparing Officer Andersons testimony to State Exhibit R1 the Video of Officer Anderson’s body-worn camera Video.,Yes,7/5/2020',
			  'Kaczmarek,John,,Robbinsdale Police Department,MN,27CR186359,Black or African American,Yes,Yes,No,West Sarah,9/13/2019,Stop (of car or person) ,Reyerson Allison,Diegel Clare,The court found that Officer Kaczmarek illegally 	expanded the scope of the stop and conducted an illegal search of the defendant.,Yes,7/5/2020'
		],
	    searchFilter
	))
}

const addCsvData = () => { 
   const csvData = [
	  		 'Last Name of Officer/Trooper,First Name of Officer/Trooper,Badge Number,Law Enforcement Agency,State,Case Number,Client/Defendant Race (categories based on 2020 census),Motion to suppress granted?,Is there a written order?,Did the judge expressly find the officer not credible?,Judge Last Name,Date of Order (MM/DD/YYYY),Issues Litigated,Prosecutor,Defense Attorney,Notes,Has this information been verified?,When was this information verified?',
			  'Stein,Kristopher,,Brooklyn Center Police Department,MN,27CR193901,Black or African AmericanAsian,Yes,Yes,No,Gaitas Theodora,8/1/2019,Stop (of car or person) Search of Person,Gunderson Grant,Diegel Clare,The court found Officer Stein illegally expanded the scope of an investigative stop and conducted an illegal search of the person stopped. ,Yes,7/5/2020',
			  'Wood,Nathan,,Hastings Police Department,MN,27CR1818950,Asian,Yes,Yes,No,Bartolomei Luis,10/22/2019,Invalid Warrant,Scoggins Elizabeth,Diegel Clare,This order was a decision on a Franks motion. The court found that an affidavit supporting a search warrant by  Officer Wood contains misrepresentations and omissions made deliberately or with reckless disregard for the truth . . . .,Yes,7/5/2020',
			  'Bialozynski,John,,Hennepin County Sheriffs Office,MN,27CR193048,Black or African American,Yes,Yes,No,Janzen Lisa,6/19/2019,Invalid Warrant,Moreland Asha,Diegel Clare,The court found: (1) that the ion swab referenced in the affidavit supporting the warrant was an illegal search; and (2) that info from an anonymous citizen does not establish probable cause.,Yes,7/5/2020',
			  'Creighton,Scott,,Minneapolis Police Department,MN,27CR1812138,Black or African American,Yes,Yes,No,Barnette Todd,5/16/2019,Search of CarSearch of PersonMirandaStop (of car or person) ,Cole Clair,Diegel Clare,Motion granted based on illegal search of vehicle. The court found: (1) no PC to search a vehicle after they stopped the driver on foot for speeding and believed he smelled like marijuana and there was no nexus linking the scent to the car; (2); the court found the body camera footage contradicted the officers  testimony.  See also Officer Todd Babekuhl who was also involved in this case.,Yes,7/5/2020',
			  'Babekuhl,Todd,,Minneapolis Police Department,MN,27CR1812138,Black or African American,Yes,Yes,No,Barnette Todd,5/16/2019,Search of CarSearch of PersonMirandaStop (of car or person) ,Cole Clair,Diegel Clare,Motion granted based on illegal search of vehicle. The court found: (1) no PC to search a vehicle after they stopped the driver on foot for speeding and believed he smelled like marijuana and there was no nexus linking the scent to the car; (2); the court found the body camera footage contradicted the officers testimony. See also Officer Scott Creighton who was also involved with this case.,Yes,7/5/2020',
			  'Spies,Jacob,,Minneapolis Police Department,MN,27CR192604,Black or African American,Yes,Yes,No,Chou Marta,4/12/2019,FriskSearch of Person,Scoggins Elizabeth,Diegel Clare,The court found illegal frisk/search of person whenOfficer Spies testified he then squeezed and  pinched the pocket and that he also took his thumb to apply pressure and squeezed a little bit  to ensure there were no needles present before removing the substance.,Yes,7/5/2020',
			  'Zimmerman,Katrina,,Minneapolis Police Department,MN,27CR189213,Black or African American,Yes,Yes,No,Peralta Nelson,1/18/2019,Stop (of car or person) Detention,Bell Brian,Diegel Clare,The court stated that Officer Zimmermans justification for stopping the car--that the temporary tags were suspicious--strain credulity.  Officer Nicholas Anderson was also found to have conducted an illegal stop in this case.  Court found officers failed to corroborate tip and failed to provide RAS for stop. When Officer Zimmerman asked Office Anderson if they should stop the car Officer Anderson said Might as well.,Yes,7/5/2020',
			  'Anderson,Nicholas,,Minneapolis Police Department,MN,27CR189213,Black or African American,Yes,Yes,No,Peralta Nelson,1/18/2019,Stop (of car or person) Detention,Bell Brian,Diegel Clare,The court found that Office Anderson and Officer Katrina Zimmerman failed to corroborate tip and failed to provide RAS for stop. When Officer Zimmerman asked Office Anderson if they should stop the car Officer Anderson said Might as well.,Yes,7/5/2020',
			  'Anderson,Nicholas,,Minneapolis Police Department,MN,27CR1915150,White,Yes,Yes,No,Chou Marta,9/19/2019,Search of Property,Gunderson Grant,Diegel Clare,The court found there were various discrepancies concerning to the Court when comparing Officer Andersons testimony to State Exhibit R1 the Video of Officer Anderson’s body-worn camera Video.,Yes,7/5/2020',
			  'Kaczmarek,John,,Robbinsdale Police Department,MN,27CR186359,Black or African American,Yes,Yes,No,West Sarah,9/13/2019,Stop (of car or person) ,Reyerson Allison,Diegel Clare,The court found that Officer Kaczmarek illegally 	expanded the scope of the stop and conducted an illegal search of the defendant.,Yes,7/5/2020'
			  ]; 

	csvToSupressionOrders(csvData)
  
	var html="<div style='width:100%;height:400px;overflow:auto'><table style='border:1px solid #eee; padding:2px'>";
	for (var i=0;i<csvData.length;i++){
		var csvDataRow=csvData[i].split(",");
		
		if (i==0){
			html+="<theader><tr>";
			for (var j=0;j<csvDataRow.length;j++){
				html+="<th style='backgorund-color:#666;border:1px solid #aaa; padding:2px'>"+csvDataRow[j]+"</th>";//
			}
			html+="</tr></theader><tbody>"; 
		}
		else {
			html+="<tr>";
			for (var j=0;j<csvDataRow.length;j++){ html+="<td <th style='backgorund-color:#888;border:1px solid #aaa; padding:2px'>"+csvDataRow[j]+"</td>";  
			} html+="</tr>";
		}
	}

	html+="</tbody></table></div>"; 
  	document.getElementById('csvdata').innerHTML=html;
 
};

export default getTableRowsAndHeaders;
 
