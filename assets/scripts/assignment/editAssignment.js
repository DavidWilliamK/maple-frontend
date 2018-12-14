//Finished
function editAssignment(){
      var check = null;
      for (var i = 0; i <= 10; i++) { //Change i's limit to amount of data in a page
            if ($("input:checkbox[id = 'assignment["+i+"]checkbox']").is(':checked')) {
                  check = $("input:checkbox[id = 'assignment["+i+"]checkbox']").val();
            }
      }
      if(check == null){
            alert("ERROR");
      }
      else{
        $(".modal-part").load("../../components/modal.html", function(){
              $("#modalTemplate").modal({show:true});
              $("#modalAddAssignment").show();
              $.ajax({
                    type: "GET",
                    url: "http://localhost:8080/assignment/" + check,
                    dataType: "json",
                    success: function(response){
                          var assignmentDataContainer = response.value.assignment;
                          console.log(assignmentDataContainer);
                          $("#modalTitle").html(assignmentDataContainer.assignmentId);
                          $("#assignedEmployeeId").val(assignmentDataContainer.employeeId);
                          $("#assignedItemSku").val(assignmentDataContainer.itemSku);
                          $("#assignedQuantity").val(assignmentDataContainer.quantity);
                    },
                    error: function(response){
                          console.log("Error");
                    }
                    });
  
                    //ButtonSave Click
                    $("#modalSaveChanges").click(function(){
                        var employeeId = $("#assignedEmployeeId").val();
                        var itemSku = $("#assignedItemSku").val();
                        var quantity = $("#assignedQuantity").val();
              
                        var newAssignment = {
                              "assignmentId":null,
                              "employeeId": employeeId,
                              "itemSku": itemSku,
                              "status": "PENDING",
                              "quantity": quantity,
                        }
              
                        $.ajax({
                              type: "POST",
                              url: "http://localhost:8080/assignment/"+check,
                              contentType: "application/json; charset=utf-8",
                              dataType: "json",
                              data: JSON.stringify(newAssignment),
                              success: function(response){
                                    if(response.code != 500){
                                          alert("Successfully saved");
                                          window.location.reload();
                                    }
                                    else{
                                          alert(response.errorMessage);
                                    }
                              },
                              error: function(response){
                                    console.log(response);
                              }
                        });
                  });
        });
      }
  }