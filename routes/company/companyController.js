const express = require("express");
const router = express.Router();
const {
  getAllCompanies,
  addCompany,
  getSingleCompany,
  editCompany,
  deleteCompany
} = require("./companyService");

router.get(["/all", "/"], getAllCompanies);
router.get("/:companyId", getSingleCompany);
router.post("/", addCompany);
router.put('/:companyId', editCompany)
router.delete('/:companyId', deleteCompany)

module.exports = router;
