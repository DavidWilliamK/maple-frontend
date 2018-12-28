//Finished
function removeEmployee(){
      $("#deleteEmployeeTable>tbody").html("");
      var check = [];
      for (var i = 0; i <= 5; i++) { //Change i's limit to amount of data in a page
          if ($("input:checkbox[id = 'employee["+i+"]checkbox']").is(':checked')) {
                check.push($("input:checkbox[id= 'employee["+i+"]checkbox']").val());
          }
      }
      if(check.length === 0){
            alert("ERROR");
      }
      else{
            console.log(check);
            $(".modal-part").load("../../components/modal.html", function(){
                  $("#modalTemplate").modal({show:true});
                  $("#modalTitle").html("Delete Employees");
                  $("#modalSaveChanges").html("Delete Employees");
                  $("#modalDeleteEmployee").show();
                  //INSERT DELETE LOGIC
                  check.forEach(element => {
                        $.ajax({
                              type: "GET",
                              dataType: "json",
                              url: "http://localhost:8080/employee/" + element,
                              beforeSend: function(request) {
                                    request.setRequestHeader("Authorization-key", getCookie("token"));
                                  },
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
                  var data = {
                        "ids": check
                  }
                  $("#modalSaveChanges").click(function(){
                        $.ajax({
                              type: "DELETE",
                              url: "http://localhost:8080/employee/",
                              contentType: "application/json; charset=utf-8",
                              dataType: "json",
                              data: JSON.stringify(data),
                              beforeSend: function(request) {
                                    request.setRequestHeader("Authorization-key", getCookie("token"));
                                  },
                              success: function(response){
                                    if(response.code === "OK"){
                                          window.location.reload();
                                    }
                                    else if(response.code === "BAD_REQUEST"){
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