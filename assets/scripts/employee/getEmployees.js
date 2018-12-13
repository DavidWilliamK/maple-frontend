//Finished - pagination
function loadEmployee(){

      var page = 0;

      fetchEmployeeData();

      $("#btnPrev").click(function(){
            if(page > 0){
                  page--;
                  fetchEmployeeData();
            }
      })

      $("#btnNext").click(function(){
            if((page+1)*size < totalRecords){
                  page++;
                  fetchEmployeeData();      
            }
      })

      $(".page-btn").click(function(){
            page = $(this).html() - 1;
            fetchEmployeeData();
      })

      function fetchEmployeeData(){
            // Kasih indikator page saat ini
            // $("#page["+page+"]").addClass("active");
            $.ajax({
                  type: "GET",
                  contentType: "application/octet-stream",
                  dataType: "json",
                  data: {
                        page: page,
                        size: 10
                  },
                  url: "http://localhost:8080/employee/",
                  success: function(response){
                        $("#viewEmployeeTable>tbody").empty();
                        var employeeDataContainer = response.value;
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
                                    $("#modalDetailEmployee").show();
                                    $.ajax({
                                          type: "GET",
                                          url: "http://localhost:8080/employee/" + id,
                                          dataType: "json",
                                          success: function(response){
                                                var employeeDataContainer = response.value;
                                                if(employeeDataContainer.imagePath){
                                                      var image = employeeDataContainer.imagePath;
                                                      image = image.split("/");
                                                      image = image.pop();
                                                      $("#employeeDetailImage").attr("src", "../assets/images/employees/"+image);
                                                }
                                                $("#modalTitle").html(employeeDataContainer.id);
                                                $("#spnFullname").html(employeeDataContainer.name);
                                                $("#spnUsername").html(employeeDataContainer.username)
                                                $("#spnPhone").html(employeeDataContainer.phone);
                                                $("#spnEmail").html(employeeDataContainer.email);
                                                $("#spnSuperiorId").html(employeeDataContainer.superiorId);
                                                $("#modalSaveChanges").hide();
                                          },
                                          error: function(response){
                                                console.log("Error");
                                          }
                                    });    
                              })
                        });
                        var pageIndex = 1;
                        for (let index = 0; index < response.totalPages; index++) {
                              if(index == 0){
                                    $("#btnPrev").hide();
                              }
                              if(index == response.totalPages-1){
                                    $("#btnNext").hide();
                              }
                              $(".pagination-items").append("<a href = # class = page-btn id = page["+index+"]>"+pageIndex+"</a>");
                              pageIndex++;
                        }
                  },
                  error: function(response){
                        alert(response.errorMessage);
                  }
            });
      }
}