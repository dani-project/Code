// Import Prisma Client
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//==============================================================//
//                        Payment Model                         //
//==============================================================//

// Prisma ORM query to get all payment methods
module.exports.getAllPaymentMethods = async () => {
    const methods = await prisma.umPaymentMethod.findMany();
    return methods;
};

// Get specific Payment Method by ID
module.exports.getPaymentMethodByID = async (id) => {
    const method = await prisma.umPaymentMethod.findUnique({
        where: { paymentMethodId: parseInt(id) } // paymentMethodID is defined as Integer
    });

    return method; // Returns 'null' is no record found
}

// Get specific Payment Method by Name, case-insensitive
module.exports.getPaymentMethodByName = async (name) => {
    /*
    const method = await prisma.umPaymentMethod.findFirst({
        where: { paymentMethodName: name }
    });
    */

    const method = await prisma.$queryRaw`
    SELECT * FROM "um_payment_method"
    WHERE LOWER("payment_method_name") = ${name}
    LIMIT 1
    `;

    if (method.length === 0) {
        return null;
    } else {
        return method[0];
    }
}


// Create a new Payment Method
module.exports.createPaymentMethod = async (data) => {
    const newMethod = await prisma.umPaymentMethod.create({
        data: {
            paymentMethodName: data.name
        }
    });
    return newMethod;
};


// Update an existing Payment Method
// params: ID and name
module.exports.updatePaymentMethod = async (id, name) => {
    const updateMethod = await prisma.umPaymentMethod.update({
        where: { paymentMethodId: parseInt(id) },
        data: {
            paymentMethodName: name
        }
    });
    return updateMethod;
};


// delete an existing Payment Method
module.exports.deletePaymentMethodByID = async (id) => {
    const method = await prisma.umPaymentMethod.delete({
        where: { paymentMethodId: parseInt(id) }
    });
    return method;
};

// delete an existing Payment Method
module.exports.deletePaymentMethodByName = async (name) => {
    const deletedResult = await prisma.$executeRaw`
    DELETE FROM "um_payment_method"
    WHERE LOWER("payment_method_name") = ${name}
    `;

    return deletedResult;
};