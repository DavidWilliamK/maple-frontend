//Finished
function remove(){
      $("#deleteEmployeeTable>tbody").html("");
      var check = [];
      for (var i = 0; i <= 10; i++) { //Change i's limit to amount of data in a page
          if ($("input:checkbox[id = 'employee["+i+"]checkbox']").is(':checked')) {
                check.push($("input:checkbox[id= 'employee["+i+"]checkbox']").val());
          }
      }
      if(check == null){
            alert("ERROR");
      }
      else{
            $(".modal-part").load("../../components/modal.html", function(){
                  $("#modalTemplate").modal({show:true})
                  $("#modalSaveChanges").html("Delete Employees");
                  $("#modalAdd").hide();
                  $("#modalDetailEmployee").hide();
                  $("#modalDetailItem").hide();
                  //INSERT DELETE LOGIC
                  check.forEach(element => {
                        $.ajax({
                              type: "GET",
                              dataType: "json",
                              url: "http://localhost:8080/employee/" + element,
                              success: function(response){
                                    var employeeDataContainer = response.value;
                                    var employeeData  ="";
                                    employeeData += "<tr>";
                                    employeeData += "<td>"+employeeDataContainer.id+"</td>";
                                    employeeData += "<td>"+employeeDataContainer.name+"</td>";
                                    employeeData += "<td>"+employeeDataContainer.phone+"</td>";
                                    employeeData += "</tr>";
                                    $("#deleteEmployeeTable").append(employeeData);
                              },
                              error: function(response){
                                    alert(response.errorMessage);
                              }
                        });   
                  });
                  $("#modalSaveChanges").click(function(){
                        $.ajax({
                              type: "DELETE",
                              url: "http://localhost:8080/employee/",
                              contentType: "application/json; charset=utf-8",
                              dataType: "json",
                              data: JSON.stringify(check),
                              success: function(){
                                    window.location.reload();
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