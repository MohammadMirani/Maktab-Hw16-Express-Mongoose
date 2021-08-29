const company = require("../models/company");

// * Create new company for mongoDB

const newCompany = new company({
  name: "Ford",
  registrationId: 1001,
  city: "nowhere",
  state: "anyWhere",
  phoneNumber: 972425222
});

newCompany.save({},(err, doc)=>{
    if(err) return console.log(err.message);
    console.log(doc);
})