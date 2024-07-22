const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");

//==============================================================//
//                      Payment Routes                          //
//==============================================================//

// Retrieve all payment methods
// GET /site/payment
router.get("/", paymentController.getAllPaymentMethods);

// Retrieve payment method by Name
// GET /site/payment/:name
router.get("/name", paymentController.getPaymentMethodByName);

// Retrieve a specific payment method by ID
// GET /site/payment/:id
router.get("/id/:id", paymentController.getPaymentMethodByID);

// Add a new Payment Method
// POST /site/payment
// Middleware to check if payment method already exists using the name
// Body: name
router.post("/", paymentController.checkPaymentMethodExistenceByName, paymentController.createNewPaymentMethod)

// Update name of payment method
// PUT /site/payment/:id
// Middleware to check if payment method of request ID exists, and if the request name already exists
// Body: name
router.put("/:id", paymentController.checkPaymentMethodExistenceByID, paymentController.checkPaymentMethodExistenceByName, paymentController.updatePaymentMethod)


// Delete payment method By name
// DELETE /site/payment/name/
router.delete("/name/:name", paymentController.deletePaymentMethodByName);

// Delete a payment method by ID
// DELETE /site/payment/:id
router.delete("/:id", paymentController.checkPaymentMethodExistenceByID, paymentController.deletePaymentMethodByID);


// Create: Link a payment method to a site by adding site_id and payment_method_id. 
// POST /site/payment/link
// Body: siteID, paymentMethodID
// Middleware: Checks if Site ID exists, payment method ID exists
router.post("/link", paymentController.checkSiteExistenceByID, paymentController.checkPaymentMethodExistenceByIDInBody, paymentController.linkPaymentMethodToSite)

// Get Site payment methods
// Read: Retrieve details of site payments by site_id and payment_method_id. 
// GET /site/payment/sitePaymentMethod/:id
router.get("/sitePaymentMethod/:id", paymentController.getSitePaymentMethodsBySiteID);


// Delete: Unlink a payment method from site
// DELETE /site/payment/link
// Body: siteID, paymentMethodID
router.delete("/link",  paymentController.checkSiteExistenceByID, paymentController.checkSitePaymentMethodExistence, paymentController.deletePaymentMethodFromSite);



module.exports = router;
