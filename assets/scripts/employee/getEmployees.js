//Finished - pagination
function load(){
      $.ajax({
            type: "GET",
            dataType: "json",
            url: "http://localhost:8080/employee/",
            success: function(response){
                  var employeeDataContainer = response.value;
                  var employeeData = "";
                  var i = 0;
                  $.each(employeeDataContainer, function(key, value){
                        employeeData += "<tr id = employeeRow["+i+"]>";
                        employeeData += "<td id = employeeId["+i+"] data-toggle= modal data-target = #modalDetail data-id = "+value.id+">"+value.id+"</td>";
                        employeeData += "<td id = employeeName["+i+"]>"+value.name+"</td>";
                        employeeData += "<td id = employeePhoneNumber["+i+"]>"+value.phone+"</td>";
                        employeeData += "<td class = checkbox id = employee["+i+"]selected><input type=checkbox id = employee["+i+"]checkbox value = "+value.id+"></input></td>"
                        employeeData += "</tr>";
                        i++;
                  });
                  $("#viewEmployeeTable").append(employeeData);
            },
            error: function(response){
                  alert(response.errorMessage);
            }
      });
}