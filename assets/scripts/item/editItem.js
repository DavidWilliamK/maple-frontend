//Finished
function editItem() {
      var check = [];
      for (var i = 0; i <= 5; i++) { //Change i's limit to amount of data in a page
            if ($("input:checkbox[id = 'item[" + i + "]checkbox']").is(':checked')) {
                  check.push($("input:checkbox[id = 'item[" + i + "]checkbox']").val());
            }
      }

      if (check.length === 0) {
            alert("Please select 1 item");
      }
      else if(check.length > 1){
            alert("Please select only 1 data");
      }
      else {
            $(".modal-part").load("../../components/modal.html", function () {
                  validateForm();
                  $("#modalTemplate").modal({ show: true });
                  $("#modalAddItem").show();
                  $("#itemImagePlaceholder").click(function () {
                        $("#itemUploadImage").click();
                  });
                  $.ajax({
                        type: "GET",
                        url: "http://localhost:8080/item/" + check,
                        dataType: "json",
                        beforeSend: function(request) {
                              request.setRequestHeader("Authorization-key", getCookie("token"));
                        },
                        success: function (response) {
                              var itemDataContainer = response.value;
                              if (itemDataContainer.imagePath) {
                                    var image = itemDataContainer.imagePath;
                                    image = image.split("/");
                                    image = image.pop();
                                    $("#itemImagePlaceholder").attr("src", "../assets/images/items/" + image);
                              }
                              $("#modalTitle").html(itemDataContainer.itemSku);
                              $("#itemName").val(itemDataContainer.name);
                              $("#quantity").val(itemDataContainer.quantity)
                              $("#price").val(itemDataContainer.price);
                              $("#itemDesc").val(itemDataContainer.description);

                        },
                        error: function (response) {
                              console.log("Error");
                        }
                  });
                  //Image Preview
                  $("#itemUploadImage").change(function () {
                        readUrl(this);
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

                  //Validate
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
                        console.log(form[0]);
                        if (form[0].checkValidity()) {
                              var name = $("#itemName").val();
                              var quantity = $("#quantity").val();
                              var price = $("#price").val();
                              var desc = $("#itemDesc").val();
                              var image = $("#itemUploadImage")[0];
                              let formdata = new FormData();

                              var newItem = {
                                    "name": name,
                                    "price": price,
                                    "quantity": quantity,
                                    "description": desc
                              }

                              formdata.append("file", image.files[0]);
                              formdata.append("data", JSON.stringify(newItem));

                              $.ajax({
                                    type: "POST",
                                    url: "http://localhost:8080/item/" + check,
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
            })
      }
}