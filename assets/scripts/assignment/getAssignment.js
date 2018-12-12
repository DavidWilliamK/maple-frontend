//Finished - pagination
function loadAssignment(){

    page = 0;

    fetchAssignmentData();

    $("#btnPrev").click(function(){
          if(page > 0){
                page--;
                fetchAssignmentData();
          }
    })

    $("#btnNext").click(function(){
      if((page+1)*size < totalRecords){
            page++;
            fetchAssignmentData();      
      }
    })

    $(".page-btn").click(function(){
          page = $(this).html() - 1;
          fetchAssignmentData();
    })

    function fetchAssignmentData(){
          $.ajax({
                type: "GET",
                contentType: "application/octet-stream",
                dataType: "json",
                data: {
                      page: page,
                      size: 2
                },
                url: "http://localhost:8080/assignment/",
                success: function(response){
                      $("#viewAssignmentTable>tbody").empty();
                      var assignmentDataContainer = response.value; assignmentData = "";
                      var i = 0;
                      $.each(assignmentDataContainer, function(key, value){
                            assignmentData += "<tr id = assignmentRow["+i+"]>";
                            assignmentData += "<td id = assignmentId["+i+"] data-id = "+value.assignmentId+">"+value.assignmentId+"</td>";
                            assignmentData += "<td id = assignedEmployee["+i+"]>"+value.employeeId+"</td>";
                            assignmentData += "<td id = assignedItem["+i+"]>"+value.itemSku+"</td>";
                            assignmentData += "<td id = assignedStatus["+i+"]>"+value.quantity+"</td>";
                            assignmentData += "<td id = assignedQuantity["+i+"]>"+value.status+"</td>";
                            assignmentData += "<td id = statusUpdateBtn["+i+"]><button class = 'btn btn-sm btn-danger' id = btnReject>Reject</button><button class = 'btn btn-sm btn-success' id = btnApprove>Approve</button><button class = 'btn btn-lg btn-primary' id = btnHandover>Handover</button><button class = 'btn btn-lg btn-warning' id = btnReturned>Return</button>"
                            assignmentData += "<td class = checkbox id = assignment["+i+"]selected><input type=checkbox id = assignment["+i+"]checkbox value = "+value.assignmentId+"></input></td>"
                            assignmentData += "</tr>";
                            i++;
                      });
                      $("#viewAssignmentTable").append(assignmentData);
                      $("td[id*='assignmentId']").click(function(){
                            var id = $(this).html();
                            $(".modal-part").load("../../components/modal.html", function(){
                                  $("#modalTemplate").modal({show:true})
                                  $("#modalDetailAssignment").show();
                                  $.ajax({
                                        type: "GET",
                                        url: "http://localhost:8080/assignment/" + id,
                                        dataType: "json",
                                        success: function(response){
                                              var assignmentDataContainer = response.value;
                                              $("#modalDetailHeader").html(assignmentDataContainer.assignmentId);
                                              $("#spnAssignedEmployee").html(assignmentDataContainer.employeeId);
                                              $("#spnAssignedItem").html(assignmentDataContainer.itemSku)
                                              $("#spnAssignedQuantity").html(assignmentDataContainer.quantity);
                                              $("#spnAssignedStatus").html(assignmentDataContainer.status);
                                              $("#modalSaveChanges").hide();
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