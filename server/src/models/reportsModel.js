const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports.getAllReports = async () => {
    const reports = await prisma.umReport.findMany();
    return reports;
}

// Get specific Payment Method by ID
module.exports.getReportById = async (id) => {
    const report = await prisma.umReport.findUnique({
        where: { reportId: parseInt(id) } // paymentMethodID is defined as Integer
    });

    return report; // Returns 'null' is no record found
}

// Update an existing Payment Method
// params: ID and name
module.exports.updateReport = async (id, title) => {
    const updateReport = await prisma.umReport.update({
        where: { reportId : parseInt(id) },
        data: {
            report_title: title
        }
    });
    return updateReport;
};

module.exports.deleteReportById = async (id) => {
    const deletedReport = await prisma.umReport.delete({
        where: { reportId: parseInt(id) }
    });

    return deletedReport; // Returns the deleted report if found and deleted, otherwise throws an error
}

// Method to get site report by ID
module.exports.getSiteReportById = async (reportId) => {
    const report = await prisma.siteReport.findUnique({
        where: { reportId: parseInt(reportId) }
    });

    return report; // Returns 'null' if no record found
};

module.exports.getAllReportsBySiteId = async (siteId) => {
    const siteReports = await prisma.siteReport.findMany({
        where: { siteId: parseInt(siteId) },
        include: { report: true }  // Assuming a relation is set up in Prisma schema
    });

    return siteReports.map(siteReport => siteReport.report);
};