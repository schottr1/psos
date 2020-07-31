require('dotenv').config({silent: true})

const express = require('express');
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000

const cloudant = require('./lib/cloudant.js');

const app = express();
app.use(bodyParser.json());

const swaggerInline = require('swagger-inline');
swaggerInline(['./*.js', './test/*.js'], {
  base: 'swaggerBase.json',
}).then((generatedSwagger) => {
  console.log(generatedSwagger)
  var swaggerDocument = JSON.parse(generatedSwagger)
  var swaggerUi = require('swagger-ui-express')
  var options = {
    jsonEditor: true    // This is an attempt to make request body editable in the Swagger UI, but it isn't working!
  }
  app.use('/api-docs', function(req, res, next){
    swaggerDocument.host = req.get('host');
    req.swaggerDoc = swaggerDocument;
    next();
}, swaggerUi.serve, swaggerUi.setup(null, options));
//swaggerUi.serve, swaggerUi.setup(JSON.parse(generatedSwagger)))
});

const handleError = (res, err) => {
  const status = err.code !== undefined && err.code > 0 ? err.code : 500;
  return res.status(status).json(err);
};

/**
 * @api [get] /health
 * summary: "Get health of service"
 * responses:
 *   "200":
 *     description: "Health of service."
 *     schema:
 *       type: "String"
 */

app.get('/api/health', (req, res) => {
  return res.json({
    status: 'ok'
  });
});

/**
 * @schema Officer
 * type: object
 * properties:
 *   lastName:
 *     type: string
 *   firstName:
 *     type: string
 *   middleInitial:
 *     type: string
 *   badge:
 *     type: string
 *   precinct:
 *     type: string
 * required:
 *   - lastName
 *   - firstName
 */

 /**
 * @schema Person
 * type: object
 * properties:
 *   lastName:
 *     type: string
 *   firstName:
 *     type: string
 * required:
 *   - lastName
 *   - firstName
 */

 /**
 * @schema Suppression
 * type: object
 * properties:
 *   id:
 *     type: string
 *   date:
 *     type: string
 *   state:
 *     type: string
 *   caseNumber:
 *     type: string
 *   summary:
 *     type: string
 *   defendantRace:
 *     type: array
 *     items: 
 *       type: string
 *   motionGranted:
 *     type: boolean
 *   writtenOrder:
 *     type: boolean
 *   foundNotCredible:
 *     type: boolean
 *   issuesLitigated:
 *     type: array
 *     items: 
 *       type: string
 *   prosecutor:
 *     $ref: "#/components/schemas/Person"
 *   defenseAttorney:
 *     $ref: "#/components/schemas/Person"
 *   verifiedDate:
 *     type: string
 *   primaryOfficers:
 *     type: array
 *     items:
 *       $ref: "#/components/schemas/Officer"
 *   attendingOfficers:
 *     type: array
 *     items:
 *       $ref: "#/components/schemas/Officer"
 * required:
 *   - date
 *   - state
 *   - caseNumber
 *   - summary
 *   - issuesLitigated
 *   - primaryOfficers
 */

/**
 * Get a list of suppression orders from the system
 *
 * @api [get] /v1/suppression
 * summary: "Gets suppression orders from the system"
 * parameters:
 *   - in: query
 *     name: state
 *     schema:
 *       type: string
 *     description: state in which supression order was filed
 *   - in: query
 *     name: primaryOfficer_lastName
 *     schema:
 *       type: string
 *     description: last name of primary officer named in order
 *   - in: query
 *     name: primaryOfficer_firstName
 *     schema:
 *       type: string
 *     description: first name of primary officer named in order
 *   - in: query
 *     name: officer_lasttName
 *     schema:
 *       type: string
 *     description: last name of officer named as either primary or attending officer
 *   - in: query
 *     name: officer_firstName
 *     schema:
 *       type: string
 *     description: first name of officer named as either primary or attending officer
 * responses:
 *   "200":
 *     description: "A list of suppression orders, matching the specified query parameters"
 *     schema:
 *       type: array
 *       items:
 *         $ref: "#/components/schemas/Suppression"
 */

app.get('/api/v1/suppression', (req, res) => {
  const primaryOfficerLastName = req.query.primaryOfficer_lastName;
  const state = req.query.state;
  cloudant
    .find(state, primaryOfficerLastName)
    .then(data => {
      if (data.statusCode != 200) {
        res.sendStatus(data.statusCode)
      } else {
        res.send(data.data)
      }
    })
    .catch(err => handleError(res, err));
});

/**
 * Get a suppression order by ID
 * 
 * @api [get] /v1/suppression/{id}
 * summary: "Get a suppression order from the system, by ID"
 * parameters:
 *   - in: path
 *     name: id
 *     schema:
 *       type: string
 * responses:
 *   "200":
 *     description: "Suppression order found"
 */

app.get('/api/v1/suppression/:id', (req, res) => {
  cloudant
    .getById(req.params.id)
    .then(data => {
      if (data.statusCode != 200) {
        res.sendStatus(data.statusCode)
      } else {
        res.send(data.data)
      }
    })
});

/**
 * Create a new suppression order
 *
 * @api [post] /v1/suppression
 * summary: "Adds a new suppression order to the system"
 * parameters:
 *   - in: body
 *     schema:
 *       $ref: "#/components/schemas/Suppression"
 * responses:
 *   "201":
 *     description: "Suppression order added"
 *     schema:
 *         $ref: "#/components/schemas/Suppression"
 */
app.post('/api/v1/suppression', (req, res) => {
  if (!req.body.primaryOfficers) {
    return res.status(422).json({ errors: "At least one primary officer must be provided"});
  }
  // TBD - Add more checking here (can we use schema validation?)
 
  const date = req.body.date || '';
  const state = req.body.state;
  const caseNumber = req.body.caseNumber || '';
  const summary = req.body.summary || '';
  const motionGranted = req.body.motionGranted || false;
  const writtenOrder = req.body.writtenOrder || false;
  const foundNotCredible = req.body.foundNotCredible || false;
  const issuesLitigated = req.body.issuesLitigated || [];
  const prosecutor = req.body.caseNumber || {};
  const defenseAttorney = req.body.defenseAttorney || {}; 
  const verifiedDate = req.body.verifiedDate || '';
  const primaryOfficers = req.body.primaryOfficers || [];
  const attendingOfficers = req.body.attendingOfficers || [];

  cloudant
    .create(date, state, caseNumber, summary, motionGranted, writtenOrder, foundNotCredible, issuesLitigated,
      prosecutor, defenseAttorney, verifiedDate, primaryOfficers, attendingOfficers)
    .then(data => {
      if (data.statusCode != 201) {
        res.sendStatus(data.statusCode)
      } else {
        res.send(data.data)
      }
    })
    .catch(err => handleError(res, err));
});

/**
 * Update suppression order
 *
 * The body may contain any of the valid attributes, with their new values. Attributes
 * not included will be left unmodified.
 * 
 * The new rev of the suppression order will be returned if successful
 */

app.patch('/api/v1/suppression/:id', (req, res) => {
  // TO BE MODIFIED
  const type = req.body.type || '';
  const name = req.body.name || '';
  const description = req.body.description || '';
  const userID = req.body.userID || '';
  const quantity = req.body.quantity || '';
  const location = req.body.location || '';
  const contact = req.body.contact || '';

  cloudant
    .update(req.params.id, type, name, description, quantity, location, contact, userID)
    .then(data => {
      if (data.statusCode != 200) {
        res.sendStatus(data.statusCode)
      } else {
        res.send(data.data)
      }
    })
    .catch(err => handleError(res, err));
});

/**
 * Delete a suppression order
 * 
 * @api [delete] /v1/suppression/{id}
 * summary: "Deletes a new suppression order from the system"
 * parameters:
 *   - in: path
 *     name: id
 *     schema:
 *       type: string
 *     required: true
 *     description: ID of the supression order to delete
 * responses:
 *   "200":
 *     description: "Suppression order deleted"
 */

app.delete('/api/v1/suppression/:id', (req, res) => {
  cloudant
    .deleteById(req.params.id)
    .then(statusCode => res.sendStatus(statusCode))
    .catch(err => handleError(res, err));
});

const server = app.listen(port, () => {
   const host = server.address().address;
   const port = server.address().port;
   console.log(`Policy Suppression Order System listening at http://${host}:${port}`);
});
