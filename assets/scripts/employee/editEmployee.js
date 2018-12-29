//Finished
function editEmployee() {
      var check = [];
      for (var i = 0; i <= 5; i++) { //Change i's limit to amount of data in a page
            if ($("input:checkbox[id = 'employee[" + i + "]checkbox']").is(':checked')) {
                  check.push($("input:checkbox[id = 'employee[" + i + "]checkbox']").val());
            }
      }

      if (check.length === 0) {
            alert("Please select 1 employee");
      }
      else if(check.length > 1){
            alert("Please select only 1 employee");
      }
      else {
            $(".modal-part").load("../../components/modal.html", function () {
                  validateForm();
                  $("#modalTemplate").modal({ show: true });
                  $("#modalAddEmployee").show();
                  $("#employeeImagePlaceholder").click(function () {
                        $("#employeeUploadImage").click();
                  });
                  $.ajax({
                        type: "GET",
                        url: "http://localhost:8080/employee/" + check,
                        dataType: "json",
                        beforeSend: function(request) {
                              request.setRequestHeader("Authorization-key", getCookie("token"));
                            },
                        success: function (response) {
                              var employeeDataContainer = response.value;
                              if (employeeDataContainer.imagePath) {
                                    var image = employeeDataContainer.imagePath;
                                    image = image.split("/");
                                    image = image.pop();
                                    $("#employeeImagePlaceholder").attr("src", "../assets/images/employees/" + image);
                              }
                              $("#modalTitle").html(employeeDataContainer.id);
                              $("#fullname").val(employeeDataContainer.name);
                              $("#username").val(employeeDataContainer.username)
                              $("#phone").val(employeeDataContainer.phone);
                              $("#email").val(employeeDataContainer.email);
                              $("#superiorId").val(employeeDataContainer.superiorId);
                        },
                        error: function (response) {
                              console.log("Error");
                        }
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
                        var emailRegex = "(^[a-z0-9A-Z](\.?[a-zA-Z0-9]){2,}@[a-zA-Z]{2,}\.com$)";
                        $('#email').prop('pattern', emailRegex);

                        var nameRegex = "([a-zA-Z ]{1,30}$)";
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
                        if (form[0].checkValidity()) {
                              var name = $("#fullname").val();
                              var username = $("#username").val();
                              var phone = $("#phone").val();
                              var superior = $("#superiorId").val();
                              var password = $("#password").val();
                              var email = $("#email").val();
                              email = email.toLowerCase();
                              var image = $("#employeeUploadImage")[0];
                              formdata = new FormData();

                              if(superior){
                                    var newUser = {
                                          "username": username,
                                          "password": password,
                                          "superiorId": superior,
                                          "name": name,
                                          "phone": phone,
                                          "email": email
                                    }
                              }
                              else{
                                    var newUser = {
                                          "username": username,
                                          "password": password,
                                          "superiorId": null,
                                          "name": name,
                                          "phone": phone,
                                          "email": email
                                    }
                              }

                              
                              formdata.append("file", image.files[0]);
                              formdata.append("data", JSON.stringify(newUser));

                              $.ajax({
                                    type: "POST",
                                    url: "http://localhost:8080/employee/" + check,
                                    processData: false,
                                    contentType: false,
                                    enctype: "multipart/form-data",
                                    data: formdata,
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
}