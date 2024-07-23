const reportsModel = require("../models/reportsModel.js");

//to get all functionalities
module.exports.getAllReports = async (req, res) => {
    try {
      const reports = await reportsModel.getAllReports();
      if (reports.length === 0) {
        res.status(404).json({ message: "No Reports Found" });
      } else {
        res.status(200).json(reports);
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

// Get a specific payment method by ID
module.exports.getReportById = async (req, res) => {
    const reportId = req.params.id;

    try {
        const reports = await reportsModel.getReportById(reportId);
        if (reports) { // If method is null, !method will be 'true'
            res.status(404).json({ message: `Report ID: ${reportId} not found!` });
        } else {
            res.status(200).json(reports);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}

// Update existing Payment Method
module.exports.updateReportById = async (req, res) => {
    const reportId = req.params.id;
    const title = req.body.name;

    try {
        const updatedReport = await reportsModel.updateReport(reportId, title);
        res.status(200).json(updatedReport);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.deleteReportById = async (req, res) => {
    const reportId = req.params.id;

    try {
        const deletedReport = await reportsModel.deleteReportById(reportId);
        if (!deletedReport) { // If no report is deleted, `deletedReport` will be `null`
            res.status(404).json({ message: `Report ID: ${reportId} not found!` });
        } else {
            res.status(200).json({ message: `Report ID: ${reportId} successfully deleted!` });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports.checkSiteReportEntry = async (req, res, next) => {
    const { site_id, report_id } = req.params;

    try {
        const entry = await prisma.siteReport.findFirst({
            where: {
                reportId: parseInt(report_id),
                siteId: parseInt(site_id),
            }
        });

        if (!entry) {
            return res.status(404).json({ message: `No link found between Site ID: ${site_id} and Report ID: ${report_id}` });
        }

        next();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.getSiteReportById = async (req, res) => {
    const reportId = req.params.report_id;

    try {
        const report = await reportsModel.getReportById(reportId);
        if (!report) {
            res.status(404).json({ message: `Report ID: ${reportId} not found!` });
        } else {
            res.status(200).json(report);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.getAllSiteReports = async (req, res) => {
    const siteId = req.params.site_id;

    try {
        const reports = await reportsModel.getAllReportsBySiteId(siteId);
        if (reports.length === 0) {
            res.status(404).json({ message: `No reports found for Site ID: ${siteId}` });
        } else {
            res.status(200).json(reports);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Reports for each site to see users
module.exports.getSitesGeneratedReport = async (req, res) => {
    try {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

        const [lastWeek, lastMonth, lastYear] = await Promise.all([
            prisma.site.count({
                where: {
                    createdAt: {
                        gte: oneWeekAgo,
                    },
                },
            }),
            prisma.site.count({
                where: {
                    createdAt: {
                        gte: oneMonthAgo,
                    },
                },
            }),
            prisma.site.count({
                where: {
                    createdAt: {
                        gte: oneYearAgo,
                    },
                },
            }),
        ]);

        res.status(200).json({
            lastWeek,
            lastMonth,
            lastYear
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Reports for the Sites