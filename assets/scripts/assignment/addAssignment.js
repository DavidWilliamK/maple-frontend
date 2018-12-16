//Finished
function addAssignment() {
      $(".modal-part").load("../../components/modal.html", function () {
            validateForm();
            $("#modalTemplate").modal({ show: true });
            $("#modalAddAssignment").show();
            $("#modalTitle").html("Add Assignment");

            function validateForm() {
                  var quantityRegex = "([1-9][0-9]*$)";
                  $("#assignedQuantity").prop('pattern', quantityRegex);

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
                  $("#btnAddAssignment").click();
                  let form = $("#formAddAssignment");
                  if (form[0].checkValidity()) {
                        var employeeId = $("#assignedEmployeeId").val();
                        var itemSku = $("#assignedItemSku").val();
                        var quantity = $("#assignedQuantity").val();

                        var newAssignment = {
                              "assignmentId": null,
                              "employeeId": employeeId,
                              "itemSku": itemSku,
                              "status": "PENDING",
                              "quantity": quantity,
                        }

                        $.ajax({
                              type: "POST",
                              url: "http://localhost:8080/assignment/",
                              contentType: "application/json; charset=utf-8",
                              dataType: "json",
                              data: JSON.stringify(newAssignment),
                              success: function (response) {
                                    if (response.code != 500) {
                                          alert("Successfully saved");
                                          window.location.reload();
                                    }
                                    else {
                                          alert(response.errorMessage);
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