# IBM Cloud App ID

## Overview
IBM Cloud App ID Free Tier allows 1000 monthly events and 1000 authorized users.
[IBM Cloud App ID](https://www.ibm.com/cloud/app-id)

## Benefits
* Users can sign in with Google, Facebook, or create a new account
* Roles can be assigned to users
* Scopes are referenced by our web app to determine what features each role can access

## Steps
1. Sign up for an IBM Cloud App ID Free Tier Account
1. Create an application with scopes
1. Create user roles and attach scopes to the roles

## Documentation
[Using IBM Cloud App ID with Node.js](https://cloud.ibm.com/docs/appid?topic=appid-web-apps)  node.js

# Roles

## Viewer
The viewer role does not require registration or any kind of user account.
Anyone who accesses the service can view suppression orders.

## Contributor
The contributor role requires user account creation. This account is created
using email and password. The account is verified by an email sent to the user's
provided email address. As a contributor one can search, read, and create
suppression orders. They can also flag other suppression orders for review if
they feel the suppression order is fraudulent. Contributors can also delete
suppression orders which they submitted and flag suppression orders submitted
by others for review if they feel the suppression order contains false
information.

## Moderators
The moderator account is a role assigned by administrator. This user has
permission to remove suppression orders found to contain false information.

## Administrator
The administrator account is set up when the software is deployed. This user has
permission change other user roles, remove other users, to remove suppression
orders submitted by any user or to temporarily or permanently disable
contributors who are found to be submitting false information.
> We may want the Administrator to perform the user permission functions through
the IBM Cloud App ID portal instead of integrating these features with the app. 


# Segregation of Duties Matrix

|                                | Administrator | Moderator | Contributor | Viewer |
|--------------------------------|---------------|-----------|-------------|--------|
| Remove Users                   | x             |           |             |        |
| Change User Roles              | x             |           |             |        |
| Delete All Suppression Orders  | x             | x         |             |        |
| Flag Suppression Orders        | x             | x         | x           |        |
| Delete Own Suppression Orders  | x             | x         | x           |        |
| Create Suppression Orders      | x             | x         | x           |        |
| Search Suppression Orders      | x             | x         | x           | x      |
| Read Suppression Orders        | x             | x         | x           | x      |
