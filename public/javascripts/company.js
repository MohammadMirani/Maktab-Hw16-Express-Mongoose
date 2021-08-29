function infoFun(el) {
  $.ajax({
    type: "GET",
    url: `/company/${el}`,
    success: function (response) {
      createPage(response);
    },
    err: function (err) {
      console.log(err.message);
    },
  });
}

function createPage(el) {
  let html = "";
  html = `<h5 class="modal-title" id="exampleModalLabel">Company</h5>
          <a href="#" class="link-info personnelBtn" onclick="personnelFun('${el[0]._id}')"><button class="btn btn-info">Personnel</button></a>
          `;
  $(".modal-header").html(html);

  html = `<div class="input-group mb-3">
            <span class="input-group-text" ">Name</span>
            <input type="text" class="form-control"  id="name" aria-describedby="basic-addon3" disabled value = "${
              el[0].name
            }" >
        </div>
        <div class="input-group mb-3">
            <span class="input-group-text">City</span>
            <input type="text" class="form-control" id="city" aria-describedby="basic-addon3" disabled value = "${
              el[0].city
            }">
        </div>
        <div class="input-group mb-3">
            <span class="input-group-text">State</span>
            <input type="text" class="form-control" id="state" aria-describedby="basic-addon3" disabled value = "${
              el[0].state
            }">
        </div>
        <div class="input-group mb-3">
            <span class="input-group-text">Phone Number</span>
            <input type="text" class="form-control" id="phoneNumber" aria-describedby="basic-addon3" disabled value = "${
              el[0].phoneNumber
            }">
        </div>
        <div class="input-group mb-3">
            <span class="input-group-text">registration Date</span>
            <input type="text" class="form-control" id="registrationId" aria-describedby="basic-addon3" disabled value = "${
              el[0].registrationId
            }">
        </div>
        <div class="input-group mb-3">
            <span class="input-group-text">Personnel</span>
            <input type="text" class="form-control" aria-describedby="basic-addon3" disabled value = "${null}">
        </div>`;

  $(".modal-body").html(html);

  html = `<button type="button" class="btn btn-warning editBtn" onclick = "editFun('${el[0]._id}')">Edit</button>
            <button type="button" class="btn btn-danger deleteBtn" onclick = "deleteFun('${el[0]._id}')">Delete</button>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" >Close</button>`;
  $(".modal-footer").html(html);
}

function editFun(el) {
  $(".form-control").prop("disabled", false);
  let html = "";
  html = `<button type="button" class="btn btn-primary saveBtn" >Save Changes</button>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" >Close</button>`;
  $(".modal-footer").html(html);

  $(".saveBtn").click(function (e) {
    const editedCompany = {
      name: $("#name").val(),
      city: $("#city").val(),
      state: $("#state").val(),
      phoneNumber: $("#phoneNumber").val(),
      registrationId: $("#registrationId").val(),
    };
    $.ajax({
      type: "PUT",
      url: `/company/${el}`,
      data: editedCompany,
      success: function (response) {
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
    url: "/company/" + el,
    success: function (response) {
      setTimeout(() => {
        location.reload();
      }, 500);
    },
  });
}

$(".addCompany").click(function (e) {
  let newCompany = {
    name: "",
    city: "",
    state: "",
    phoneNumber: "",
    registrationId: "",
  };
  createPage([newCompany]);
  let html = "";
  html = `<button type="button" class="btn btn-primary saveBtn" >Save Changes</button>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" >Close</button>`;
  $(".modal-footer").html(html);
  $(".form-control").prop("disabled", false);

  $(document).on("click", ".saveBtn", function () {
    newCompany = {
      name: $("#name").val(),
      city: $("#city").val(),
      state: $("#state").val(),
      phoneNumber: $("#phoneNumber").val(),
      registrationId: $("#registrationId").val(),
    };
    $.ajax({
      type: "POST",
      url: "/company",
      data: newCompany,
      success: function (response) {
        console.log(response);
        setTimeout(() => {
          location.reload();
        }, 500);
      },
    });
  });
});

function personnelFun(el) {
  let href = `/personnel/${el}`
  window.location.href = href;
}
