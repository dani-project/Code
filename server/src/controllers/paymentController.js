const paymentModel = require("../models/paymentModel");
const siteModel = require("../models/siteModel");

//==============================================================//
//                     Payment Controller                       //
//==============================================================//

// Controller to get all payment methods
module.exports.getAllPaymentMethods = async (req, res) => {
    try {
        const methods = await paymentModel.getAllPaymentMethods();
        if (methods.length === 0) {
            res.status(404).json({ message: "No Payment methods found!" });
        } else {
            res.status(200).json(methods);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Get a specific payment method by ID
module.exports.getPaymentMethodByID = async (req, res) => {
    const paymentMethodID = req.params.id;

    try {
        const method = await paymentModel.getPaymentMethodByID(paymentMethodID);
        if (!method) { // If method is null, !method will be 'true'
            res.status(404).json({ message: `Payment method ID: ${paymentMethodID} not found!` });
        } else {
            res.status(200).json(method);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}



// Get a specific payment method by Name
module.exports.getPaymentMethodByName = async (req, res) => {
    const paymentMethodName = req.body.name;

    try {
        const method = await paymentModel.getPaymentMethodByName(paymentMethodName.toLowerCase());
        if (!method) { // If method is null, !method will be 'true'
            res.status(404).json({ message: `Payment Method \'${paymentMethodName}\' not found!` });
        } else {
            res.status(200).json(method);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}


// Middleware to check if payment method already exists using the Name
module.exports.checkPaymentMethodExistenceByName = async (req, res, next) => {
    const paymentMethodName = req.body.name;

    if (!paymentMethodName) {
        return res.status(400).json({ message: 'Payment method name is required!' });
    }

    try {
        const method = await paymentModel.getPaymentMethodByName(paymentMethodName.toLowerCase());
        if (method) { // If theres a record, means the payment method already exists
            res.status(400).json({ message: `Payment method \'${paymentMethodName}\' already exists!` });
        } else {
            next();
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


// Create a new Payment Method
module.exports.createNewPaymentMethod = async (req, res) => {
    const name = req.body.name;

    try {
        const newMethod = await paymentModel.createPaymentMethod({ name });
        res.status(201).json(newMethod);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// Middleware to check if payment method already exists using the ID
module.exports.checkPaymentMethodExistenceByID = async (req, res, next) => {
    const paymentMethodID = req.params.id;

    try {
        const method = await paymentModel.getPaymentMethodByID(paymentMethodID);
        if (!method) {
            res.status(404).json({ message: `Payment method ID: ${paymentMethodID} not found!` });
        } else {
            next();
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Update existing Payment Method
module.exports.updatePaymentMethod = async (req, res) => {
    const paymentMethodID = req.params.id;
    const name = req.body.name;

    try {
        const updatedMethod = await paymentModel.updatePaymentMethod(paymentMethodID, name);
        res.status(200).json(updatedMethod);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// delete existing Payment Method by ID
module.exports.deletePaymentMethodByID = async (req, res) => {
    const paymentMethodID = req.params.id;

    try {
        const method = await paymentModel.deletePaymentMethodByID(paymentMethodID);

        return res.status(200).json({ message: `Payment Method ID ${paymentMethodID} deleted!` });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


// delete existing Payment Method by Name
module.exports.deletePaymentMethodByName = async (req, res) => {
    const paymentMethodName = req.params.name;

    try {
        // Retrieve the payment method by name
        const method = await paymentModel.getPaymentMethodByName(paymentMethodName.toLowerCase());
        if (!method) {
            return res.status(200).json({ message: `Payment Method \'${paymentMethodName}\' not found!` });
        } else {
            const deletedMethod = await paymentModel.deletePaymentMethodByName(paymentMethodName.toLowerCase());

            //console.log(deletedMethod);
            
            return res.status(200).json({ message: `Payment Method ${paymentMethodName} deleted!` });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


// Check if Site exist using the Site ID
module.exports.checkSiteExistenceByID = async (req, res, next) => {
    const siteID = req.body.siteID;


    if (!siteID){
        return res.status(400).json({ message: "Site ID is required!" });
    }

    try {
        const site = await siteModel.getSiteByID(siteID);
        
        if (!site) {
            return res.status(404).json({ message: `Site ID: \'${siteID}\' not found!` });
        } else {
            next();
        }

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};



// Check if site is link with the payment method
module.exports.checkSiteExistenceByID = async (req, res, next) => {
    const siteID = req.body.siteID;


    if (!siteID){
        return res.status(400).json({ message: "Site ID is required!" });
    }

    try {
        const site = await siteModel.getSiteByID(siteID);
        
        if (!site) {
            return res.status(404).json({ message: `Site ID: \'${siteID}\' not found!` });
        } else {
            next();
        }

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


// Middleware to check if payment method already exists using the ID (Body)
module.exports.checkPaymentMethodExistenceByIDInBody = async (req, res, next) => {
    const paymentMethodID = req.body.paymentMethodID;

    if (!paymentMethodID){
        return res.status(400).json({ message: "Payment Method ID is required!" });
    }

    try {
        const method = await paymentModel.getPaymentMethodByID(paymentMethodID);
        if (!method) {
            res.status(404).json({ message: `Payment method ID: ${paymentMethodID} not found!` });
        } else {
            next();
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Link payment method to Site (Post)
module.exports.linkPaymentMethodToSite = async (req, res) => {
    const { siteID, paymentMethodID } = req.body;

    try {
        const link = await paymentModel.linkPaymentMethodToSite(parseInt(siteID), parseInt(paymentMethodID));

        return res.status(201).json({
            status: 201,
            message: 'Payment method successfully linked to site.',
            data: link
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Site payment methods by ID
module.exports.getSitePaymentMethodsBySiteID = async (req, res) => {
    const siteID = req.params.id;

    try {
        const paymentMethods = await paymentModel.getSitePaymentMethods(parseInt(siteID));

        if (!paymentMethods || paymentMethods.length() === 0){
            return res.status(404).json({ message: `Site ID: ${siteID} not found!` });
        } else {
            return res.status(200).json({
                status: 200,
                message: `Site ID: ${siteID} Payment methods retrieved successfully.`,
                data: paymentMethods
            });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// Check if payment method is linked with site
module.exports.checkSitePaymentMethodExistence = async (req, res, next) => {
    const {siteID, paymentMethodID} = req.body;

    if (!paymentMethodID){
        return res.status(400).json({ message: "Payment Method ID is required!" });
    }

    try {
        const paymentMethod = await paymentModel.getSpecificSitePaymentMethod(parseInt(siteID), parseInt(paymentMethodID));

        if (!paymentMethod){
            return res.status(404).json({ message: `Payment Method ID: ${paymentMethodID} is not linked with Site ID: ${siteID}!` });
        } else {
            next();
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// Delete payment method from site
module.exports.deletePaymentMethodFromSite = async (req, res) => {
    const {siteID, paymentMethodID} = req.body;

    try {
        const deletePaymentMethod = await paymentModel.deletePaymentMethodFromSite(parseInt(siteID), parseInt(paymentMethodID));

        res.status(200).json({ message: `Payment Method ID: ${paymentMethodID} successfully deleted from Site ID: ${siteID}` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
