//Finished
function editItem() {
      var check = null;
      for (var i = 0; i <= 10; i++) { //Change i's limit to amount of data in a page
            if ($("input:checkbox[id = 'item[" + i + "]checkbox']").is(':checked')) {
                  check = $("input:checkbox[id = 'item[" + i + "]checkbox']").val();
            }
      }

      if (check == null) {
            alert("ERROR");
      }
      else {
            $(".modal-part").load("../../components/modal.html", function () {
                  $("#modalTemplate").modal({ show: true });
                  $("#modalAddItem").show();
                  $("#itemImagePlaceholder").click(function () {
                        $("#itemUploadImage").click();
                  })
                  $.ajax({
                        type: "GET",
                        url: "http://localhost:8080/item/" + check,
                        dataType: "json",
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
                  //ButtonSave Click
                  $("#modalSaveChanges").click(function () {
                        var name = $("#itemName").val();
                        var quantity = $("#quantity").val();
                        var price = $("#price").val();
                        var desc = $("#itemDesc").val();
                        var image = $("#itemUploadImage")[0];
                        formdata = new FormData();

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
                        check = null;
                  });
            })
      }
}