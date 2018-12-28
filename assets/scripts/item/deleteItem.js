//Finished
function removeItem(){
      $("#deleteItemTable>tbody").html("");
      var check = [];
      for (var i = 0; i <= 5; i++) { //Change i's limit to amount of data in a page
          if ($("input:checkbox[id = 'item["+i+"]checkbox']").is(':checked')) {
                check.push($("input:checkbox[id= 'item["+i+"]checkbox']").val());
          }
      }
      if(check.length === 0){
            alert("ERROR");
      }
      else{
            $(".modal-part").load("../../components/modal.html", function(){
                  $("#modalTemplate").modal({show:true});
                  $("#modalTitle").html("Delete Items");
                  $("#modalSaveChanges").html("Delete Items");
                  $("#modalDeleteItem").show();
                  check.forEach(element => {
                        $.ajax({
                              type: "GET",
                              dataType: "json",
                              url: "http://localhost:8080/item/" + element,
                              beforeSend: function(request) {
                                    request.setRequestHeader("Authorization-key", getCookie("token"));
                              },
                              success: function(response){
                                    var itemDataContainer = response.value;
                                    var itemData  ="";
                                    itemData += "<tr>";
                                    itemData += "<td>"+itemDataContainer.itemSku+"</td>";
                                    itemData += "<td>"+itemDataContainer.name+"</td>";
                                    itemData += "<td>"+itemDataContainer.quantity+"</td>";
                                    itemData += "<td>"+itemDataContainer.price+"</td>";
                                    itemData += "</tr>";
                                    $("#deleteItemTable").append(itemData);
                              },
                              error: function(response){
                                    alert(response.errorMessage);
                              }
                        });   
                  });
                  var data = {
                        "ids": check
                  }
                  $("#modalSaveChanges").click(function(){
                        $.ajax({
                              type: "DELETE",
                              url: "http://localhost:8080/item/",
                              contentType: "application/json; charset=utf-8",
                              dataType: "json",
                              data: JSON.stringify(data),
                              beforeSend: function(request) {
                                    request.setRequestHeader("Authorization-key", getCookie("token"));
                              },
                              success: function(response){
                                    if(response.code === "OK"){
                                          console.log(response);
                                          window.location.reload();
                                    }
                                    else if(response.code === "BAD_REQUEST"){
                                          console.log(response);
                                          alert("You are not allowed to delete this data");
                                    }
                              },
                              error: function(response){
                                    console.log(response);
                              }
                        });   
                        // window.location.reload();
                  })
            });
      }
}