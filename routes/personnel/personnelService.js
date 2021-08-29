const path = require("path");
const personnel = require("../../models/personnel");
const company = require("../../models/company");
const fieldsPattern = [
  "firstName",
  "lastName",
  "birthDate",
  "nationalCode",
  "gender",
  "company",
  "isManager",
];

const getAllPersonnel = (req, res, next) => {
  let companyId = req.params.companyId;
  personnel
    .find({ company: { _id: req.params.companyId } }, (err, personnel) => {
      if (err) return res.status(500).send(err.message);
      if (personnel.length === 0) {
        company.find({ _id: companyId }, (err, company) => {
          return res.status(200).render("emptyPersonnel", { company });
        });
      } else {
        return res.status(200).render("personnel", { personnel });
      }
    })
    .populate("company", "name");
};

const getSinglePersonnel = (req, res, next) => {
  console.log(req.params.personnelId);
  personnel.find({ _id: req.params.personnelId }, (err, doc) => {
    if (err) {
      if (err.stack.includes("CastError")) {
        return res.status(400).send(err.message);
      }
      return res.status(500).send("server error");
    }
    if (doc.length === 0) return res.status(404).send("Not found !!!");
    res.status(200).send(doc);
  });
};

const addPersonnel = (req, res, next) => {
  const bodyKeys = Object.keys(req.body);
  const checkFields = fieldsPattern.every((el) => {
    return bodyKeys.includes(el);
  });
  if (!checkFields) {
    return res.status(400).send("validation error");
  }

  const obj = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    birthDate: req.body.birthDate,
    nationalCode: req.body.nationalCode,
    gender: req.body.gender,
    company: req.body.company,
  };

  const newPersonnel = new personnel(obj);
  newPersonnel.save({}, (err, doc) => {
    if (err) {
      if (err.stack.includes("duplicate")) {
        return res.status(400).send("Duplicate item!");
      }
      if (err.stack.includes("ValidationError")) {
        return res.status(400).send("validation error2");
      }
      return res.status(500).send("server error");
    }
    return res.status(201).send(doc);
  });
};

const editPersonnel = (req, res, next) => {
  console.log(req.body);
  const bodyKeys = Object.keys(req.body);
  const checkFields = fieldsPattern.every((field) => bodyKeys.includes(field));
  if (!checkFields) {
    return res.status(400).send("validation error");
  }

  personnel.findOneAndUpdate(
    { _id: req.params.personnelId },
    req.body,
    { new: true },
    (err, doc) => {
      if (err) {
        if (err.stack.includes("CastError")) {
          return res.status(400).send("cast error");
        }
        return res.status(500).send(err.message);
      }
      if (!doc) {
        return res.status(404).send("not found.");
      }

      return res.status(200).send(`successfully updated: ${doc}`);
    }
  );
};

const deletePersonnel = (req, res, next) => {
  personnel.findOneAndDelete({ _id: req.params.personnelId }, (err, doc) => {
    if (err) {
      if (err.stack.includes("CastError")) {
        return res.status(400).send("Cast Error");
      }
      return res.status(500).send(err.message);
    }
    if (!doc) {
      return res.status(404).send("not found");
    }
    res.status(200).send(`successfully deleted: ${doc}`);
  });
};

module.exports = {
  getAllPersonnel,
  addPersonnel,
  getSinglePersonnel,
  editPersonnel,
  deletePersonnel,
};
