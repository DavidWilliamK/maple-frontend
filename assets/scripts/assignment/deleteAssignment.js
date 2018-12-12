//Finished
function removeAssignment(){
    $("#deleteEmployeeTable>tbody").html("");
    var check = [];
    for (var i = 0; i <= 10; i++) { //Change i's limit to amount of data in a page
        if ($("input:checkbox[id = 'assignment["+i+"]checkbox']").is(':checked')) {
              check.push($("input:checkbox[id= 'assignment["+i+"]checkbox']").val());
        }
      }
      if(check.length === 0){
            alert("ERROR");
      }
      else{
            $(".modal-part").load("../../components/modal.html", function(){
                  $("#modalTemplate").modal({show:true})
                  $("#modalDeleteAssignment").show();
                  check.forEach(element => {
                        $.ajax({
                              type: "GET",
                              dataType: "json",
                              url: "http://localhost:8080/assignment/" + element,
                              success: function(response){
                                    var assignmentDataContainer = response.value;
                                    var assignmentData  ="";
                                    assignmentData += "<tr>";
                                    assignmentData += "<td>"+assignmentDataContainer.assignmentId+"</td>";
                                    assignmentData += "<td>"+assignmentDataContainer.employeeId+"</td>";
                                    assignmentData += "<td>"+assignmentDataContainer.itemSku+"</td>";
                                    assignmentData += "<td>"+assignmentDataContainer.quantity+"</td>";
                                    assignmentData += "</tr>";
                                    $("#deleteAssignmentTable").append(assignmentData);
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
                              url: "http://localhost:8080/assignment/",
                              contentType: "application/json; charset=utf-8",
                              dataType: "json",
                              data: JSON.stringify(data),
                              success: function(){
                                    window.location.reload();
                              },
                              error: function(response){
                                    console.log(response);
                              }
                        });   
                  })
            });
      }
}