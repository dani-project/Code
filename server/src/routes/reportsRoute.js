const express = require("express");
const router = express.Router();
const reportsController = require("../controllers/reportsController.js");

//==============================================================//
//                    Reports Routes                        //
//==============================================================//

// GET /api/reports
router.get("/", reportsController.getAllReports);

// GET /api/reports/id
router.get("/:report_id", reportsController.getReportById);

router.put("/:report_id", reportsController.updateReportById);

router.delete("/:report_id", reportsController.deleteReportById);

// GET /api/sitereports/:site_id/:report_id
router.get("/:site_id/:report_id", reportsController.checkSiteReportEntry, reportsController.getSiteReportById);

// GET /api/sitereports/:site_id
router.get("/:site_id/reports", reportsController.checkSiteReportEntry, reportsController.getAllSiteReports);

router.get("/sites-generated", reportsController.getSitesGeneratedReport);
