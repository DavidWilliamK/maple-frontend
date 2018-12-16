//Finished
function addItem() {
      $(".modal-part").load("../../components/modal.html", function () {
            validateForm();
            $("#modalTemplate").modal({ show: true });
            $("#modalAddItem").show();
            $("#modalTitle").html("Add Item");
            $("#itemImagePlaceholder").click(function () {
                  $("#itemUploadImage").click();
            })

            //Image Preview
            $("#itemUploadImage").change(function () {
                  readUrl(this);;
            })
            function readUrl(input) {
                  if (input.files && input.files[0]) {
                        var reader = new FileReader();

                        reader.onload = function (e) {
                              $("#itemImagePlaceholder").attr("src", e.target.result);
                        }
                        reader.readAsDataURL(input.files[0]);
                  }
            }

            function validateForm() {
                  var quantityRegex = "([1-9][0-9]*$)";
                  $("#quantity").prop('pattern', quantityRegex);

                  var priceRegex = "([1-9][0-9]*$)";
                  $("#price").prop('pattern', priceRegex);

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
                  $("#btnAddItem").click();
                  let form = $("#formAddItem");
                  if (form[0].checkValidity()) {
                        var name = $("#itemName").val();
                        var quantity = $("#quantity").val();
                        var price = $("#price").val();
                        var desc = $("#itemDesc").val();
                        var image = $("#itemUploadImage")[0];
                        formdata = new FormData();

                        var newItem = {
                              "itemSku": null,
                              "name": name,
                              "price": price,
                              "quantity": quantity,
                              "description": desc
                        }
                        formdata.append("file", image.files[0]);
                        formdata.append("data", JSON.stringify(newItem));

                        $.ajax({
                              type: "POST",
                              url: "http://localhost:8080/item/",
                              enctype: "multipart/form-data",
                              data: formdata,
                              contentType: false,
                              processData: false,
                              success: function (response) {
                                    if (response.code == "OK") {
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