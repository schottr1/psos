const Cloudant = require('@cloudant/cloudant');

const cloudant_id = process.env.CLOUDANT_ID || '<cloudant_id>'
const cloudant_apikey = process.env.CLOUDANT_IAM_APIKEY || '<cloudant_apikey>';

// UUID creation
const { v4: uuidv4 } = require('uuid');

var cloudant = new Cloudant({
    account: cloudant_id,
    plugins: {
      iamauth: {
        iamApiKey: cloudant_apikey
      }
    }
  })

// Cloudant DB reference
let db;
let db_name = "suppression_db";

/**
 * Connects to the Cloudant DB, creating it if does not already exist
 * @return {Promise} - when resolved, contains the db, ready to go
 */
const dbCloudantConnect = () => {
    return new Promise((resolve, reject) => {
        Cloudant({  // eslint-disable-line
            account: cloudant_id,
                plugins: {
                    iamauth: {
                        iamApiKey: cloudant_apikey
                    }
                }
        }, ((err, cloudant) => {
            if (err) {
                console.log('Connect failure: ' + err.message + ' for Cloudant ID: ' +
                    cloudant_id);
                reject(err);
            } else {
                cloudant.db.list().then((body) => {
                    if (!body.includes(db_name)) {
                        console.log('DB Does not exist..creating: ' + db_name);
                        cloudant.db.create(db_name).then(() => {
                            if (err) {
                                console.log('DB Create failure: ' + err.message + ' for Cloudant ID: ' +
                                cloudant_id);
                                reject(err);
                            }
                        })
                    }
                    let db = cloudant.use(db_name);
                    console.log('Connect success! Connected to DB: ' + db_name);
                    resolve(db);
                }).catch((err) => { console.log(err); reject(err); });
            }
        }));
    });
}

// Initialize the DB when this module is loaded
(function getDbConnection() {
    console.log('Initializing Cloudant connection...', 'getDbConnection()');
    dbCloudantConnect().then((database) => {
        console.log('Cloudant connection initialized.', 'getDbConnection()');
        db = database;
    }).catch((err) => {
        console.log('Error while initializing DB: ' + err.message, 'getDbConnection()');
        throw err;
    });
})();

/**
 * Find all suppression objects that match the specified parameters.
 * 
 * @param {String} state
 * @param {String} primaryOfficerLastName
 * 
 * @return {Promise} Promise - 
 *  resolve(): all suppression objects that contain the partial
 *          primaryOfficerLastName or state provided, or an empty array if nothing
 *          could be located that matches. 
 *  reject(): the err object from the underlying data store
 */
function find(state, primaryOfficerLastName) {
    return new Promise((resolve, reject) => {
        let selector = {}
        if (state) {
            selector['state'] = state;
        }
        if (primaryOfficerLastName) {
            let search = `(?i).*${primaryOfficerLastName}.*`;
            selector['primaryOfficers'] = { "$elemMatch": { "lastName": {'$regex': search}}}
        }
        
        db.find({ 
            'selector': selector
        }, (err, documents) => {
            if (err) {
                reject(err);
            } else {
                resolve({ data: JSON.stringify(documents.docs), statusCode: 200});
            }
        });
    });
}

/**
 * Get a suppression object that matches an ID.
 * 
 * @param {String} id
 * 
 * @return {Promise} Promise - 
 *  resolve(): Status code as to whether to the object was found
 *  reject(): the err object from the underlying data store
 */
function getById(id) {
    return new Promise((resolve, reject) => {
        db.get(id, (err, document) => {
            if (err) {
                resolve(err.statusCode);
            } else {
                resolve({ data: JSON.stringify(document.doc), statusCode: 200});
            }            
        })
    });
}

/**
 * Delete a suppression object that matches an ID.
 * 
 * @param {String} id
 * 
 * @return {Promise} Promise - 
 *  resolve(): Status code as to whether to the object was deleted
 *  reject(): the err object from the underlying data store
 */
function deleteById(id, rev) {
    return new Promise((resolve, reject) => {
        db.get(id, (err, document) => {
            if (err) {
                resolve(err.statusCode);
            } else {
                db.destroy(id, document._rev, (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(200);
                    }
                })
            }            
        })
    });
}

/**
 * Create a suppression object with the specified attributes
 * 
 * @param {String} date - the date the order was filed
 * @param {String} state - the satte in which the order was filed
 * @param {String} caseNumber - the case number of the order
 * @param {String} summary - the summary description of the order 
 * @param {Boolean} motionGranted - was the order granted?
 * @param {Boolean} writtenOrder - was this a written order? 
 * @param {Boolean} foundNotCredible - were the officer(s) found Not Credible? 
 * @param {Array} issuesLitigated - list of issues litigated? 
 * @param {Object} prosecutor - proesctor lastName and firstName
 * @param {Object} defenseAttorney - defense attorney lastName and firstName
 * @param {Array} suppressionDocs - list of references to origional docs stored
 * @param {String} verifiedDate - the date this data was verified against the actual order?
 * @param {Array} primaryOfficers - list of primary officers names
 * @param {Array} attendingOfficers - list of named officers who were attending
 * 
 * @return {Promise} - promise that will be resolved (or rejected)
 * when the call to the DB completes
 */
function create(date, state, caseNumber, summary, motionGranted, writtenOrder, foundNotCredible, issuesLitigated,
    prosecutor, defenseAttorney, suppressionDocs, verifiedDate, primaryOfficers, attendingOfficers) {
    return new Promise((resolve, reject) => {
        let itemId = uuidv4();
        let whenCreated = Date.now();
        let item = {
            _id: itemId,
            id: itemId,
            date: date,
            state: state,
            caseNumber: caseNumber,
            summary: summary,
            motionGranted: motionGranted,
            writtenOrder: writtenOrder,
            foundNotCredible: foundNotCredible,
            issuesLitigated: issuesLitigated,
            prosecutor: prosecutor,
            defenseAttorney: defenseAttorney,
            suppressionDocs: suppressionDocs,
            verifiedDate: verifiedDate,
            primaryOfficers: primaryOfficers,
            attendingOfficers: attendingOfficers,
            whenCreated: whenCreated
        };
        db.insert(item, (err, result) => {
            if (err) {
                console.log('Error occurred: ' + err.message, 'create()');
                reject(err);
            } else {
                resolve({ data: { createdId: result.id, createdRevId: result.rev }, statusCode: 201 });
            }
        });
    });
}

/**
 * Update a suppression object with the requested new attribute values
 * 
 * @param {String} id - the ID of the item (required)
 * 
 * The following parameters can be null
 * 
 * @param {String} date - the date the order was filed
 * @param {String} state - the satte in which the order was filed
 * @param {String} caseNumber - the case number of the order
 * @param {String} summary - the summary description of the order 
 * @param {Boolean} motionGranted - was the order granted?
 * @param {Boolean} writtenOrder - was this a written order? 
 * @param {Boolean} foundNotCredible - were the officer(s) found Not Credible? 
 * @param {Array} issuesLitigated - list of issues litigated? 
 * @param {Object} prosecutor - proesctor lastName and firstName
 * @param {Object} defenseAttorney - defense attorney lastName and firstName
 * @param {Array} suppressionDocs - list of references to origional docs stored
 * @param {String} verifiedDate - the date this data was verified against the actual order?
 * @param {Array} primaryOfficers - list of primary officers names
 * @param {Array} attendingOfficers - list of named officers who were attending
 * 
 * @return {Promise} - promise that will be resolved (or rejected)
 * when the call to the DB completes
 */
function update(date, state, caseNumber, summary, motionGranted, writtenOrder, foundNotCredible, issuesLitigated,
    prosecutor, defenseAttorney, suppressionDocs, verifiedDate, primaryOfficers, attendingOfficers) {
    return new Promise((resolve, reject) => {
        db.get(id, (err, document) => {
            if (err) {
                resolve({statusCode: err.statusCode});
            } else {
                let item = {
                    _id: document._id,
                    _rev: document._rev,            // Specifiying the _rev turns this into an update
                }
                if (date) {item["date"] = date} else {item["date"] = document.date};
                if (state) {item["state"] = state} else {item["state"] = document.state};
                if (caseNumber) {item["caseNumber"] = caseNumber} else {item["caseNumber"] = document.caseNumber};
                if (summary) {item["summary"] = summary} else {item["summary"] = document.summary};
                if (motionGranted) {item["motionGranted"] = motionGranted} else {item["motionGranted"] = document.motionGranted};
                if (writtenOrder) {item["writtenOrder"] = writtenOrder} else {item["writtenOrder"] = document.writtenOrder};
                if (foundNotCredible) {item["foundNotCredible"] = foundNotCredible} else {item["foundNotCredible"] = document.foundNotCredible};
                if (issuesLitigated) {item["issuesLitigated"] = issuesLitigated} else {item["issuesLitigated"] = document.issuesLitigated};
                if (prosecutor) {item["prosecutor"] = prosecutor} else {item["prosecutor"] = document.prosecutor};
                if (defenseAttorney) {item["defenseAttorney"] = defenseAttorney} else {item["defenseAttorney"] = document.defenseAttorney};
                if (suppressionDocs) {item["suppressionDocs"] = suppressionDocs} else {item["suppressionDocs"] = document.suppressionDocs};
                if (verifiedDate) {item["verifiedDate"] = verifiedDate} else {item["verifiedDate"] = document.verifiedDate};
                if (primaryOfficers) {item["primaryOfficers"] = primaryOfficers} else {item["primaryOfficers"] = document.primaryOfficers};
                if (attendingOfficers) {item["attendingOfficers"] = attendingOfficers} else {item["attendingOfficers"] = document.attendingOfficers};

                db.insert(item, (err, result) => {
                    if (err) {
                        console.log('Error occurred: ' + err.message, 'create()');
                        reject(err);
                    } else {
                        resolve({ data: { updatedRevId: result.rev }, statusCode: 200 });
                    }
                });
            }            
        })
    });
}

module.exports = {
    deleteById: deleteById,
    create: create,
    update: update,
    find: find,
    getById: getById
  };