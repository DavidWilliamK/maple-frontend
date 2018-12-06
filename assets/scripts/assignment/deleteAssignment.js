//Finished
function remove(){
    $("#deleteEmployeeTable>tbody").html("");
    var check = [];
    for (var i = 0; i <= 7; i++) { //Change i's limit to amount of data in a page
        if ($("input:checkbox[id = 'employee["+i+"]checkbox']").is(':checked')) {
              check.push($("input:checkbox[id= 'employee["+i+"]checkbox']").val());
        }
    }
    check.forEach(element => {
          $.ajax({
                type: "GET",
                dataType: "json",
                url: "http://localhost:8080/employee/" + element,
                success: function(response){
                      var employeeDataContainer = response.value;
                      console.log(check);
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
    $("#btnDelete").click(function(){
          check.forEach(element => {
                $.ajax({
                      type: "DELETE",
                      url: "http://localhost:8080/employee/" +element, //Dummy data
                      contentType: "application/json",
                      dataType: "json",
                      success: function(){
                            alert("Deleted");
                      },
                      error: function(response){
                            console.log(response);
                      }
                });   
          });
          // window.location.reload();
    })
}