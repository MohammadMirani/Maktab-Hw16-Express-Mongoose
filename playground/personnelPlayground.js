const personnel = require("../models/personnel");

const newPersonnel = new personnel({
  firstName: "afruz",
  lastName: "mirani",
  birthDate: "152543215",
  nationalCode: "10003",
  gender: "female",
  company: "6127fdd5853ac0100240f563",
});


newPersonnel.save({},(err, doc) => {
  if (err) return console.log(err.message);
  console.log(doc);
});
