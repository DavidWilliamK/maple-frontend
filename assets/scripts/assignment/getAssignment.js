//Finished - pagination
function loadAssignment() {

      page = 0;

      fetchAssignmentData();


      function createPagination(pages, page) {
            page = page + 1;
            let str = "<ul>";
            let active;
            let pageCutLow = page - 1;
            let pageCutHigh = page + 1;
            // Show the Previous button only if you are on a page other than the first

            if (page > 1) {
                  str +=
                        '<li class="page-item previous no"><a>&laquo;</a></li>';
            }
            // Show all the pagination elements if there are less than 6 pages total
            if (pages < 6) {
                  for (let p = 1; p <= pages; p++) {
                        active = page == p ? "active" : "no";
                        str +=
                              '<li class="page-number ' +
                              active +
                              '"><a>' +
                              p +
                              "</a></li>";
                  }
            } else {
                  // Use "..." to collapse pages outside of a certain range
                  // Show the very first page followed by a "..." at the beginning of the
                  // pagination section (after the Previous button)
                  if (page > 2) {
                        str +=
                              '<li class="no page-item page-number"><a>1</a></li>';
                        if (page > 3) {
                              str +=
                                    '<li class="out-of-range"><a>...</a></li>';
                        }
                  }
                  // Determine how many pages to show after the current page index
                  if (page === 1) {
                        pageCutHigh += 2;
                  } else if (page === 2) {
                        pageCutHigh += 1;
                  }
                  // Determine how many pages to show before the current page index
                  if (page === pages) {
                        pageCutLow -= 2;
                  } else if (page === pages) {
                        pageCutLow -= 1;
                  }
                  console.log(page, pageCutLow, pageCutHigh);
                  // Output the indexes for pages that fall inside the range of pageCutLow
                  // and pageCutHigh
                  for (let p = pageCutLow; p <= pageCutHigh; p++) {
                        if (p === 0) {
                              p += 1;
                        }
                        if (p > pages) {
                              continue;
                        }
                        active = page == p ? "active" : "no";
                        str +=
                              '<li class="page-item page-number ' +
                              active +
                              '"><a>' +
                              p +
                              "</a></li>";
                  }
                  // Show the very last page preceded by a "..." at the end of the pagination
                  // section (before the Next button)
                  if (page < pages - 1) {
                        if (page < pages - 2) {
                              str +=
                                    '<li class="out-of-range"><a>...</a></li>';
                        }
                        str +=
                              '<li class="page-item no page-number"><a>' +
                              pages +
                              "</a></li>";
                  }
            }
            // Show the Next button only if you are on a page other than the last
            if (page < pages) {
                  str +=
                        '<li class="page-item next no"><a>&raquo;</a></li>';
            }
            str += "</ul>";
            // Return the pagination string to be outputted in the pug templates
            $(".pagination").html(str);
            return str;
      }

      function loadData(response){
            $("#viewAssignmentTable>tbody").empty();
                        var assignmentDataContainer = response.value;
                        assignmentData = "";
                        var i = 0;
                        if(assignmentDataContainer.length){
                              $.each(assignmentDataContainer, function (key, data) {
                                    // data = value.assignment;
                                    buttonLive = data.button;
                                    assignmentData += "<tr id = assignmentRow[" + i + "]>";
                                    assignmentData += "<td id = assignmentId[" + i + "]>" + data.assignmentId + "</td>";
                                    assignmentData += "<td id = assignedEmployee[" + i + "]>" + data.employeeUsername + "</td>";
                                    assignmentData += "<td id = assignedItem[" + i + "]>" + data.itemName + "</td>";
                                    assignmentData += "<td id = assignedStatus[" + i + "]>" + data.quantity + "</td>";
                                    assignmentData += "<td id = assignedQuantity[" + i + "]>" + data.status + "</td>";
                                    assignmentData += "<td id = statusUpdateBtn[" + i + "]>"
                                    $.each(buttonLive, function (key, value) {
                                          if (value === "btnReject") {
                                                assignmentData += "<button style = 'width:50%;' class = 'btn btn-danger decrease-btn' id =" + value + "[" + data.assignmentId + "]>Reject</button>";
                                          } else if (value === "btnApprove") {
                                                assignmentData += "<button style = 'width:50%; padding-right:0px; padding-left:0px;' class = 'btn btn-success increase-btn' id = " + value + "[" + data.assignmentId + "]>Approve</button>";
                                          }
                                          else if (value === "btnHandover") {
                                                assignmentData += "<button style = 'width:100%;' class = 'btn btn-primary increase-btn' id = " + value + "[" + data.assignmentId + "]>Handover</button>";
                                          }
                                          else if (value === "btnReturn") {
                                                assignmentData += "<button style = 'width:100%;' class = 'btn btn-warning decrease-btn' id = " + value + "[" + data.assignmentId + "]>Return</button>";
                                          }
                                    })
                                    assignmentData += "</td>";
                                    assignmentData += "</tr>";
                                    i++;
                              });
                        }
                        else{
                              $("#viewAssignmentTable").removeClass("table-hover")
                              assignmentData += "<tr><td colspan='6' class='text-center p-4'><h3>No Request to be handled</h3><br>";
                              assignmentData += "<button class='btn btn-dark' onclick='window.location.reload()'>Reload</button></td></tr>";
                        }
                        $("#viewAssignmentTable").append(assignmentData);

                        $("button[class*='increase-btn']").click(function(){
                              var action = $(this).attr("id");
                              console.log(action);
                              action = action.split("[");
                              var id = action.pop();
                              id = id.substr(0, id.length-1);
                              console.log(action, id);
                              $.ajax({
                                    type: "POST",
                                    url: "http://localhost:8080/assignment/"+id+"/status?action=UP",
                                    beforeSend: function(request) {
                                          request.setRequestHeader("Authorization-key", getCookie("token"));
                                        },
                                    success: function(){
                                          window.location.reload();
                                    },
                                    error: function(response){
                                          console.log(response);
                                    }
                              });
                        })

                        $("button[class*='decrease-btn']").click(function(){
                              var action = $(this).attr("id");
                              action = action.split("[");
                              var id = action.pop();
                              id = id.substr(0, id.length-1);
                              console.log(action, id);
                              $.ajax({
                                    type: "POST",
                                    url: "http://localhost:8080/assignment/"+id+"/status?action=DOWN",
                                    beforeSend: function(request) {
                                          request.setRequestHeader("Authorization-key", getCookie("token"));
                                        },
                                    success: function(){
                                          window.location.reload();
                                    },
                                    error: function(response){
                                          console.log(response.errorMessage);
                                    }
                              });
                        })

                        $("td[id*='assignmentId']").click(function () {
                              var id = $(this).html();
                              $(".modal-part").load("../../components/modal.html", function () {
                                    $.ajax({
                                          type: "GET",
                                          url: "http://localhost:8080/assignment/" + id,
                                          dataType: "json",
                                          beforeSend: function(request) {
                                                request.setRequestHeader("Authorization-key", getCookie("token"));
                                              },
                                          success: function (response) {
                                                console.log(response);
                                                if(response.code === "OK"){
                                                      $("#modalTemplate").modal({ show: true })
                                                      $("#modalDetailAssignment").show();
                                                      var assignmentDataContainer = response.value;
                                                      $("#modalTitle").html(assignmentDataContainer.assignmentId);
                                                      $("#spnAssignedEmployee").html(assignmentDataContainer.employeeUsername);
                                                      $("#spnAssignedItem").html(assignmentDataContainer.itemName)
                                                      $("#spnAssignedQuantity").html(assignmentDataContainer.quantity);
                                                      $("#spnAssignedStatus").html(assignmentDataContainer.status);
                                                      $("#spnAssignedNote").html(assignmentDataContainer.note);
                                                      $("#modalSaveChanges").hide();
                                                }
                                                else{
                                                      alert("Something went wrong");
                                                }
                                          },
                                          error: function (response) {
                                                console.log("Error");
                                          }
                                    });
                              })
                        });
                        createPagination(response.totalPages, page);
                        $(".previous").click(function () {
                              page--;
                              fetchAssignmentData();
                        });

                        $(".next").click(function () {
                              page++;
                              fetchAssignmentData();
                        });
                        $(".page-number").click(function () {
                              console.log($(this).text());
                              page = $(this).text() - 1;
                              fetchAssignmentData();
                        });
      }

      function fetchAssignmentData() {
            $.ajax({
                  type: "GET",
                  contentType: "application/octet-stream",
                  dataType: "json",
                  data: {
                        page: page,
                        size: 5
                  },
                  url: "http://localhost:8080/assignment/",
                  beforeSend: function(request) {
                        request.setRequestHeader("Authorization-key", getCookie("token"));
                      },
                  success: function (response) {
                        loadData(response);
                  },
                  error: function (response) {
                        alert(response.errorMessage);
                  }
            });
      }
}

