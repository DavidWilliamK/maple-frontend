//Finished
function addEmployee() {
      $(".modal-part").load("../../components/modal.html", function () {
            validateForm();
            $("#modalTemplate").modal({ show: true });
            $("#modalTitle").html("Add Employee");
            $("#modalAddEmployee").show();
            $("#employeeImagePlaceholder").click(function () {
                  $("#employeeUploadImage").click();
            });

            //ImagePreview
            $("#employeeUploadImage").change(function () {
                  readUrl(this);
            })
            function readUrl(input) {
                  if (input.files && input.files[0]) {
                        var reader = new FileReader();

                        reader.onload = function (e) {
                              $("#employeeImagePlaceholder").attr("src", e.target.result);
                        }
                        reader.readAsDataURL(input.files[0]);
                  }
            }

            //Validation
            function validateForm() {
                  var emailRegex = "(^[a-z0-9A-Z](\.?[a-zA-Z0-9]){2,}@[a-zA-Z]{2,}\.[a-zA-Z]{2,}$)";
                  $('#email').prop('pattern', emailRegex);

                  var nameRegex = "([a-zA-Z ]{1,}$)";
                  $('#fullname').prop('pattern', nameRegex);

                  var phoneRegex = "(0([0-9]{3,4}-?){2}[0-9]{3,4}$)";
                  $("#phone").prop('pattern', phoneRegex);

                  var passwordRegex = "(^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]{8,}$)";
                  $("#password").prop('pattern', passwordRegex);

                  var confirmPasswordRegex = "";
                  $('#password').on('keyup', function () {
                        confirmPasswordRegex = ($("#password").val());
                        console.log(confirmPasswordRegex);
                        $("#confirmPassword").prop('pattern', "(" + confirmPasswordRegex + "$)");
                  });


                  'use strict';
                  // Fetch all the forms we want to apply custom Bootstrap validation styles to
                  var forms = document.getElementsByClassName('needs-validation');
                  // Loop over them and prevent submission
                  var validation = Array.prototype.filter.call(forms, function (form) {
                        form.addEventListener('submit', function (event) {
                              if (form.checkValidity() === false) {
                                    event.preventDefault();
                                    event.stopPropagation();
                              }
                              form.classList.add('was-validated');
                        }, false);
                  });
            }

            //ButtonSave Click
            $("#modalSaveChanges").click(function () {
                  $("#btnAddEmployee").click();
                  let form = $("#formAddEmployee");
                  console.log(form[0]);
                  if (form[0].checkValidity()) {
                        var name = $("#fullname").val();
                        var username = $("#username").val();
                        var phone = $("#phone").val();
                        var superior = $("#superiorId").val();
                        var password = $("#password").val();
                        var email = $("#email").val();
                        email = email.toLowerCase();
                        var image = $("#employeeUploadImage")[0];
                        let formdata = new FormData();

                        var newUser = {
                              "id": null,
                              "username": username,
                              "password": password,
                              "superiorId": superior,
                              "name": name,
                              "phone": phone,
                              "email": email
                        }
                        formdata.append("file", image.files[0]);
                        formdata.append("data", JSON.stringify(newUser));


                        $.ajax({
                              type: "POST",
                              url: "http://localhost:8080/employee/",
                              enctype: "multipart/form-data",
                              data: formdata,
                              processData: false,
                              contentType: false,
                              beforeSend: function(request) {
                                    request.setRequestHeader("Authorization-key", getCookie("token"));
                                  },
                              success: function (response) {
                                    if (response.code == "OK") {
                                          alert("Successfully saved");
                                          window.location.reload();
                                    }
                                    else {
                                          console.log(response);
                                    }
                              },
                              error: function (response) {
                                    console.log(response);
                              }
                        });
                  }
            });
      });
}