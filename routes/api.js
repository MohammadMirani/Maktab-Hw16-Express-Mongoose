const express = require("express");
const router = express.Router();
const companyRoutes = require("./company/companyController");
const personnelRoutes = require("./personnel/personnelController");

router.use("/company", companyRoutes);
router.use("/personnel", personnelRoutes);

module.exports = router;
