const express = require("express");
const router = express.Router();
const {
  getAllPersonnel,
  addPersonnel,
  getSinglePersonnel,
  editPersonnel,
  deletePersonnel,
} = require("./personnelService");

router.get(["/:companyId"], getAllPersonnel);
router.get("/personnel/:personnelId", getSinglePersonnel);
router.post("/", addPersonnel);
router.put("/:personnelId", editPersonnel);
router.delete("/:personnelId", deletePersonnel);

module.exports = router;
