function infoFun(el) {
  $.ajax({
    type: "GET",
    url: "/personnel/personnel/" + el,
    success: function (response) {
      createModal(response);
    },
  });
}

function createModal(el) {
  let html = "";
  html = `<h5 class="modal-title" id="exampleModalLabel">Information</h5>
          `;
  $(".modal-header").html(html);

  html = `<div class="input-group mb-3">
            <span class="input-group-text" ">First Name: </span>
            <input type="text" class="form-control"  id="firstName" aria-describedby="basic-addon3" disabled value = "${el[0].firstName}" >
        </div>
        <div class="input-group mb-3">
            <span class="input-group-text">Last Name: </span>
            <input type="text" class="form-control" id="lastName" aria-describedby="basic-addon3" disabled value = "${el[0].lastName}">
        </div>
        <div class="input-group mb-3">
            <span class="input-group-text">Birth Date: </span>
            <input type="text" class="form-control" id="birthDate" aria-describedby="basic-addon3" disabled value = "${el[0].birthDate}">
        </div>
        <div class="input-group mb-3">
            <span class="input-group-text">Is Manager: </span>
            <input type="text" class="form-control" id="isManager" aria-describedby="basic-addon3" disabled value = "${el[0].isManager}">
        </div>
        <div class="input-group mb-3">
            <span class="input-group-text">National Code</span>
            <input type="text" class="form-control" id="nationalCode" aria-describedby="basic-addon3" disabled value = "${el[0].nationalCode}">
        </div>
        <div class="input-group mb-3">
            <span class="input-group-text">Gender</span>
            <input type="text" class="form-control" id="gender" aria-describedby="basic-addon3" disabled value = "${el[0].gender}">
        </div>`;

  $(".modal-body").html(html);

  html = `<button type="button" class="btn btn-warning editBtn" onclick = "editFun('${el[0].company}','${el[0]._id}')">Edit</button>
            <button type="button" class="btn btn-danger deleteBtn" onclick = "deleteFun('${el[0]._id}')">Delete</button>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" >Close</button>`;
  $(".modal-footer").html(html);
}

function editFun(companyId, personnelId) {
  $(".form-control").prop("disabled", false);
  let html = "";
  html = `<button type="button" class="btn btn-primary saveBtn" >Save Changes</button>
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" >Close</button>`;
  $(".modal-footer").html(html);

  $(".saveBtn").click(function (e) {
    const editedPersonnel = {
      firstName: $("#firstName").val(),
      lastName: $("#lastName").val(),
      birthDate: $("#birthDate").val(),
      isManager: $("#isManager").val(),
      nationalCode: $("#nationalCode").val(),
      gender: $("#gender").val(),
      company: companyId,
    };
    $.ajax({
      type: "PUT",
      url: `/personnel/` + personnelId,
      data: editedPersonnel,
      success: function (response) {
        console.log(response);
        setTimeout(() => {
          location.reload();
        }, 500);
      },
    });

    e.preventDefault();
  });
}

function deleteFun(el) {
  $.ajax({
    type: "DELETE",
    url: "/personnel/" + el,
    success: function (response) {
      setTimeout(() => {
        location.reload();
      }, 500);
    },
  });
}

$(".addPersonnel").click(function (e) {
  let newPersonnel = {
    firstName: "",
    lastName: "",
    birthDate: "",
    isManager: "",
    nationalCode: "",
    gender: "",
    company: "",
  };
  createModal([newPersonnel]);
  let html = "";
  html = `<button type="button" class="btn btn-primary saveBtn" >Save Changes</button>
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" >Close</button>`;
  $(".modal-footer").html(html);
  $(".form-control").prop("disabled", false);
  let companyId = $(".companyHeader").attr("id");
  $(document).on("click", ".saveBtn", function () {
    newPersonnel = {
      firstName: $("#firstName").val(),
      lastName: $("#lastName").val(),
      birthDate: $("#birthDate").val(),
      isManager: $("#isManager").val(),
      nationalCode: $("#nationalCode").val(),
      gender: $("#gender").val(),
      company: companyId,
    };
    $.ajax({
      type: "POST",
      url: "/personnel",
      data: newPersonnel,
      success: function (response) {
        console.log(response);
        setTimeout(() => {
          location.reload();
        }, 500);
      },
    });
  });
});
