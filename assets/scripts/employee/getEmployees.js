//Finished - pagination
function load(){

      page = 0;

      fetchEmployeeData();

      $("#btnPrev").click(function(){
            if(page > 0){
                  page--;
                  fetchEmployeeData();
            }
      })

      $("#btnNext").click(function(){
            page++;
            fetchEmployeeData();
      })

      $(".page-btn").click(function(){
            page = this.html;
            fetchEmployeeData();
      })

      function fetchEmployeeData(){
            $.ajax({
                  type: "GET",
                  dataType: "json",
                  data: {
                        page: page,
                        size: 2
                  },
                  url: "http://localhost:8080/employee/",
                  success: function(response){
                        $("#viewEmployeeTable>tbody").empty();
                        var employeeDataContainer = response.value;
                        if(employeeDataContainer.length == 0){
                              page--;
                              alert("No more data");
                              fetchEmployeeData();
                        }
                        var employeeData = "";
                        var i = 0;
                        $.each(employeeDataContainer, function(key, value){
                              employeeData += "<tr id = employeeRow["+i+"]>";
                              employeeData += "<td id = employeeId["+i+"] data-id = "+value.id+">"+value.id+"</td>";
                              employeeData += "<td id = employeeName["+i+"]>"+value.name+"</td>";
                              employeeData += "<td id = employeePhoneNumber["+i+"]>"+value.phone+"</td>";
                              employeeData += "<td class = checkbox id = employee["+i+"]selected><input type=checkbox id = employee["+i+"]checkbox value = "+value.id+"></input></td>"
                              employeeData += "</tr>";
                              i++;
                        });
                        $("#viewEmployeeTable").append(employeeData);
                        $("td[id*='employeeId']").click(function(){
                              var id = $(this).html();
                              $(".modal-part").load("../../components/modal.html", function(){
                                    $("#modalTemplate").modal({show:true})
                                    $("#modalAdd").hide();
                                    $("#modalDelete").hide();
                                    $.ajax({
                                          type: "GET",
                                          url: "http://localhost:8080/employee/" + id,
                                          dataType: "json",
                                          success: function(response){
                                                var employeeDataContainer = response.value;
                                                $("#modalDetailHeader").html(employeeDataContainer.id);
                                                $("#spnFullname").html(employeeDataContainer.name);
                                                $("#spnUsername").html(employeeDataContainer.username)
                                                $("#spnPhone").html(employeeDataContainer.phone);
                                                $("#spnEmail").html(employeeDataContainer.email);
                                                $("#spnSuperiorId").html(employeeDataContainer.superiorId);
                                                $("#employeeSaveChanges").hide();
                                          },
                                          error: function(response){
                                                console.log("Error");
                                          }
                                    });    
                              })
                        });
                  },
                  error: function(response){
                        alert(response.errorMessage);
                  }
            });
      }
}