# psos
Police Suppression Order System.

This solution starter was created by technologists from IBM.

## Authors

Joseph (Tyler) DeBartolo, Kallie Fergerson, Kimberly Holmes, Paul Jennas, Rinku Kanwar, Henry Nash, Joe Nichols, Jeremy O'Mard, Osai O Osaigbovo, Andrea Ritterbeck, Thomas Schott, Natilie Taylor


## Contents

1. [Overview](#overview)
2. [The idea](#the-idea)
3. [How it works](#how-it-works)
4. [Diagrams](#diagrams)
5. [Documents](#documents)
6. [Technology](#technology)
7. [Getting started](#getting-started)
8. [PSOS Recommendations for Enhancements of Capabilities](#psos-recommendations-for-enhancements-of-capabilities)
8. [Resources](#resources)
9. [License](#license)

## Overview
The **Police Suppression Order System (PSOS)** is a searchable database that contains information about court ordered "suppression orders" and allows lawyers and their staff, police, civic organizations, and individuals to search the database by an officer’s name, jurisdiction, or department via web, smartphone, or third-party application.

PSOS provides multiple methods to upload information from a Suppression Order.

The information in the database is to be used to identify police officers that were named in one or more suppression orders or to identify system issues with police departments or geographic regions.

A **suppression order** is the court’s remedy for police misconduct.
- Judges do not have authority to impose sanctions on an officer who has engaged in misconduct (any discipline decisions are made by the police department or any over-seeing agency).
- As such, the court’s remedy for police misconduct is to decide whether information will be suppressed in court. For example, if an officer lied on a search warrant request, any information gained as result of that warrant will not be admissible in court.
- A judge’s decision to suppress evidence as a result of police is conduct is a matter of public record, but is currently incredibly difficult to track or find, even for attorneys working regularly in one courthouse with the same judges.

### What's the problem?

**Problem:** The lack of transparent and accurate data available to assess police behavioral infractions means police reports can be falsified and contain other inaccuracies.

**PSOS Addresses**
Police officers that provide evidence or testimony that is determined by the US Courts as inadmissible is documented in a court "suppression order.” It can be inadmissible due misleading or false testimony, or improperly acquired or falsified evidence.  Access to this information can be made easily and quickly accessible to all persons regardless of the court type/jurisdiction generating the "suppression order" or government process for requesting.
- Individuals and lawyers defending or prosecuting individuals can access search for specific officers to determine if they have been identified in prior suppression orders regardless of the where that order was placed and determine if such evidence or testimony likely be susceptible to having been tampered, inaccurate, or falsified.
- Government, Civic organizations, and individuals can assess if individual police officers or police departments have reoccurring incidents that indicate a bias or systemic issue that disproportionately affects persons of color.

## The idea

Provide a publically available, expandable system to enable attorneys and interested groups and individuals to have access to the details of   suppression orders, searchable by officer, precinct and geographic area.

## How it works

TBA

## Diagrams

### Personas and Stories

*Add graphics psos_persona_def_attny.png and psos_persona_prosecutor.png*

#### Needs Statement
A defense attorney or prosecutor needs a way to conduct a comprehensive online search for existing suppression orders so that he/she can be sufficiently prepared for court in a timely manner. 

#### Design Requirements
- The ability to quickly search for specific officers
- A way to see a pattern of repeat, racially motivated actions by an officer
- Mobile first interface to enable easy searching on the go (ex: going into court)

### UI Wireframes
*Add graphics psos_wf-001.png, psos_wf-002.png, psos_wf-003.png, psos_wf-004.png, psos_wf-005.png.*


## Documents

TBA

## Technology

### IBM Cloud Services

TBA

## Getting started

### Prerequisites

- Register for an [IBM Cloud](https://www.ibm.com/account/reg/us-en/signup?formid=urx-42793&eventid=cfc-2020?cm_mmc=OSocial_Blog-_-Audience+Developer_Developer+Conversation-_-WW_WW-_-cfc-2020-ghub-starterkit-cooperation_ov75914&cm_mmca1=000039JL&cm_mmca2=10008917) account.
- Install and configure [IBM Cloud CLI](https://cloud.ibm.com/docs/cli?topic=cloud-cli-getting-started#overview).
- Install [React Native CLI dependencies](https://reactnative.dev/docs/getting-started.html) (for iOS).
    - [Node.js](https://nodejs.org/en/)
    - [Watchman](https://facebook.github.io/watchman/docs/install)
    - [Xcode](https://itunes.apple.com/us/app/xcode/id497799835?mt=12)
    - [CocoaPods](https://guides.cocoapods.org/using/getting-started.html)
- Clone the [repository](https://github.com/embrace-call-for-code/psos).

### Steps

1. [Provision a CouchDB instance using Cloudant](#2-Provision-a-CouchDB-instance-using-Cloudant).
1. [Run the server](#4-run-the-server).
1. [Run the mobile application](#5-run-the-mobile-application).

### 1: Provision a CouchDB instance using Cloudant

TBA - [if running in the sandbox, there is a short cut to this]

Log into the IBM Cloud and provision a [CouchDB instance using Cloudant](https://www.ibm.com/cloud/cloudant).

1. From the catalog, select Databases and then the Cloudant panel.
1. Once selected, you can choose your Cloudant plan -- there is a free tier for simple testing that is sufficient to run this CIR example. You should choose an appropriate region, give the service a name, and it is recommended you choose **Use only IAM** under **Available authentication methods**. You can leave the other settings with their defaults. Click the blue **Create** button when ready.
1. Once your Cloudant instance has been created, you need to create a service credential that the CIR API Server can use to communicate with it. By selecting your running Cloudant instance, you can choose **Service credentials** from the left-hand menu. Create a new service credential and give it a name (it doesn't matter what you call it).
1. Once created, you can display the credentials by selecting **view service credentials**, and then copy the credential, so you are ready to paste it into the code of the API server in Step 4.

### 2. Run the server

To set up and launch the server application:

1. Go to the `code/server-app` directory of the cloned repo.
1. Copy the `.env.example` file in the `code/server-app` directory, and create a new file named `.env`.
1. Edit the newly created `.env` file and update the `CLOUDANT_ID` and `CLOUDANT_IAM_APIKEY` with the values from the service credential you created in Step 1. (Note that the `username` from the credential is what should be used for the `CLOUDANT_ID`.)
1. Edit the **name** value in the `manifest.yml` file to your application name (for example, _my-app-name_).
1. From a terminal:
    1. Go to the `code/server-app` directory of the cloned repo.
    1. Install the dependencies: `npm install`.
    1. Launch the server application locally or deploy to IBM Cloud:
        - To run locally:
            1. Start the application: `npm start`.
            1. The server can be accessed at <http://localhost:3000>.
        - To deploy to IBM Cloud:
            1. Log in to your IBM Cloud account using the IBM Cloud CLI: `ibmcloud login`.
            1. Target a Cloud Foundry org and space: `ibmcloud target --cf`.
            1. Push the app to IBM Cloud: `ibmcloud app push`.
            1. The server can be accessed at a URL using the **name** given in the `manifest.yml` file (for example,  <https://my-app-name.bluemix.net>).
    1. The api supports a swagger doc interface in a browser, served from `url`/api-docs. Substitutue your particular server address for `url` e.g. <http://localhost:3000/api-docs> if running locally.

### 3. Run the mobile application

To run the mobile application (using the Xcode iOS Simulator):

1. Go to the `code/mobile-app` directory of the cloned repo.
1. Copy the `.env.example` file in the `code/mobile-app` directory, and create a file named `.env`.
1. Edit the newly created `.env` file:
    - Update the `STARTER_KIT_SERVER_URL` with the URL to the server app launched in the previous step.
1. From a terminal:
    1. Go to the `code/mobile-app` directory.
    1. Install the dependencies: `npm install`.
    1. Go to the `ios` directory: `cd ios`.
    1. Install pod dependencies: `pod install`.
    1. Return to the `mobile-app` directory: `cd ../`.
    1. Launch the app in the simulator: `npm run ios`. You should be running at least iOS 13.0.
    1. The first time you launch the simulator, you should ensure that you set a Location in the Features menu.

With the application running in the simulator, you should be able to navigate through the various screens:

TBA

## PSOS Recommendations for Enhancements of Capabilities

**Police Suppression Order System (PSOS)**

### Background
**Document Purpose:** The PSOS Solution developed by IBM in mid-August 2020 provides a Minimum Viable Product (MVP) solution. During the development period, the team identified potential opportunities to enhance our delivered solution in the future.
**Problem Statement:** The lack of transparent and accurate data available to assess police behavioral infractions means police reports can be falsified and contain other inaccuracies.
**Hills (who, what, and wow)**
- A defense attorney, prosecutor or judge can query a searchable database on a national level for suppression orders against law enforcement, therefore enabling them to call those officers' judgement and testimony into question in current and future cases.
- Anyone can query a searchable database on a national level for suppression orders against law enforcement, therefore making public records on infractions against officers and districts easily accessible to the public.
- Defense attorneys and prosecutors can report known infractions against law enforcement by contributing to a national database, therefore suppressing untrustworthy testimony in a courtroom setting and protecting their clients from potential injustice.

This document is organized into functional areas where there are opportunities to enhance and expand the capabilities of the overall solution.

### Functionality to expand PSOS use/adoption in general
 - Create rules based on prior suppression orders to assess if a police officer is shows patterns of illegal/improper behavior, and make a rating of the officer. The solution might involve AI to establish a summarized assessment/rating of each officer that is then stored in a field with the officer's entry in the database.
- Enable the general public or mobile application to determine if a specific officer with whom they are in contact was identified in a suppression order and the reason for the suppression.
- Ability to compare police officer suppression order data accessible similar to the Citizens Police Data Project for the Chicago region (https://cpdp.co/) where you can see an officer receives X number of complaints more than other officers, or X number more sustained misconduct complaints.
- Integrate other sources of data beyond suppression orders related to individual police officers such as use of force reports or other civilian complaints that can be used to provide a more wholistic view of the police officer being queried.

### Functionality to more easily add content
- Create process that assesses a new suppression order input to see if it could be a duplicate of an existing suppression order, determine if the referenced persons (officer, judge, attorney) was referenced in other suppression orders and ensures it uses references the same the person entity.
- Using the existing API to allow multiple records to be uploaded via an Excel spreadsheet or CSV file.
- Create a process to regularly pull data using screen-scraping technology or via a third-party API to suppression order data that is readily available via a website or accessible data source. Create a new vetting process for data sourced through this method.
- Provide a process by which a scanned copy of the suppression order is uploaded to the PSOS site, and using a NLP solution, pre-populate the database with the appropriate data. The submitter would then be required to add data. The vetting process would validate the correctness of this data.

### Functionality to improve its querying capabilities 
- Provide the capability to assess aggregated suppression order data to determine if there are issues by police officer, police department, or court/judge, or incident type and characteristics (including race). 
- Add geo location information for police departments, court locations that can be used to graphically display database information on an interactive map.

### Technical Capabilities
- Implement role-based authentication and user profiles to application to support the monitoring of uploaded suppression orders, authorize reviewers, and support requests for further information as part of the process to vet the suppression order. See further documentation on a proposed Role-based access control (RBAC) that was not implemented in the MVP solution. 
- Add tamper-proof technology such as blockchain or the hardware infrastructure hosting the database to provide Logical corruption protection (LCP) features.

### Other Capabilities
- The suppression order database is a source of vetted, public information on police officers. Other databases and applications that track official and unofficial complaints against Police Officers can query the PSOS database via the API to integrate suppression order information with their other sources of data.

## Resources

- [IBM Cloud](https://www.ibm.com/cloud)
- [IBM Cloudant](https://cloud.ibm.com/docs/Cloudant?topic=cloudant-overview)
- [Node.js](https://nodejs.org)
- [React Native](https://reactnative.dev/)

## License

This solution starter is made available under the [Apache 2 License](LICENSE).
