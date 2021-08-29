const path = require("path");
const fs = require("fs");
const company = require("../../models/company");
const fieldsPattern = [
  "name",
  "registrationId",
  "city",
  "state",
  "phoneNumber",
];

const getAllCompanies = (req, res, next) => {
  company.find({}, (err, companies) => {
    if (err) return res.status(500).send(err.message);
    res.status(200).render('company', {companies});

  });
};

const getSingleCompany = (req, res, next) => {
  company.find({ _id: req.params.companyId }, (err, doc) => {
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

const addCompany = (req, res, next) => {
  const bodyKeys = Object.keys(req.body);
  const checkFields = fieldsPattern.every((el) => {
    return bodyKeys.includes(el);
  });
  if (!checkFields) {
    return res.status(400).send("validation error");
  }

  const obj = {
    name: req.body.name,
    registrationId: req.body.registrationId,
    city: req.body.city,
    state: req.body.state,
    phoneNumber: req.body.phoneNumber,
  };

  const newCompany = new company(obj);
  newCompany.save({}, (err, doc) => {
    if (err) {
      if (err.code === 11000) {
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

const editCompany = (req, res, next) => {
  const bodyKeys = Object.keys(req.body);
  console.log(bodyKeys);
  const checkFields = fieldsPattern.every((field) => bodyKeys.includes(field));
  if (!checkFields) {
    return res.status(400).send("validation error");
  }

  company.findOneAndUpdate(
    { _id: req.params.companyId },
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

      return res.status(200).send(doc);
    }
  );
};

const deleteCompany = (req, res, next) => {
  company.findOneAndDelete({ _id: req.params.companyId }, (err, doc) => {
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
  getAllCompanies,
  addCompany,
  getSingleCompany,
  editCompany,
  deleteCompany,
};
