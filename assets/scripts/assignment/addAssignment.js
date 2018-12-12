//Finished
function addAssignment(){
      $(".modal-part").load("../../components/modal.html", function(){
            $("#modalTemplate").modal({show:true});
            $("#modalAddAssignment").show();

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
                url: "http://localhost:8080/assignment/",
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