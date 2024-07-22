const paymentModel = require("../models/paymentModel");

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