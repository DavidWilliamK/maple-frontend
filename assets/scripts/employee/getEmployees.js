//Finished - pagination
function loadEmployee() {

      page = 0;

      fetchEmployeeData();

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


      function fetchEmployeeData() {
            $.ajax({
                  type: "GET",
                  contentType: "application/octet-stream",
                  dataType: "json",
                  data: {
                        page: page,
                        size: 5
                  },
                  url: "http://localhost:8080/employee/",
                  success: function (response) {
                        $("#viewEmployeeTable>tbody").empty();
                        var employeeDataContainer = response.value;
                        var employeeData = "";
                        var i = 0;
                        $.each(employeeDataContainer, function (key, value) {
                              employeeData += "<tr id = employeeRow[" + i + "]>";
                              employeeData += "<td id = employeeId[" + i + "] data-id = " + value.id + ">" + value.id + "</td>";
                              employeeData += "<td id = employeeName[" + i + "]>" + value.name + "</td>";
                              employeeData += "<td id = employeePhoneNumber[" + i + "]>" + value.phone + "</td>";
                              employeeData += "<td class = checkbox id = employee[" + i + "]selected><input type=checkbox id = employee[" + i + "]checkbox value = " + value.id + "></input></td>"
                              employeeData += "</tr>";
                              i++;
                        });
                        $("#viewEmployeeTable").append(employeeData);
                        $("td[id*='employeeId']").click(function () {
                              var id = $(this).html();
                              $(".modal-part").load("../../components/modal.html", function () {
                                    $("#modalTemplate").modal({ show: true })
                                    $("#modalDetailEmployee").show();
                                    $.ajax({
                                          type: "GET",
                                          url: "http://localhost:8080/employee/" + id,
                                          dataType: "json",
                                          success: function (response) {
                                                var employeeDataContainer = response.value;
                                                if (employeeDataContainer.imagePath) {
                                                      var image = employeeDataContainer.imagePath;
                                                      image = image.split("/");
                                                      image = image.pop();
                                                      $("#employeeDetailImage").attr("src", "../assets/images/employees/" + image);
                                                }
                                                $("#modalTitle").html(employeeDataContainer.id);
                                                $("#spnFullname").html(employeeDataContainer.name);
                                                $("#spnUsername").html(employeeDataContainer.username)
                                                $("#spnPhone").html(employeeDataContainer.phone);
                                                $("#spnEmail").html(employeeDataContainer.email);
                                                $("#spnSuperiorId").html(employeeDataContainer.superiorId);
                                                $("#modalSaveChanges").hide();
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
                              fetchEmployeeData();
                        });

                        $(".next").click(function () {
                              page++;
                              fetchEmployeeData();
                        });
                        $(".page-number").click(function () {
                              console.log($(this).text());
                              page = $(this).text() - 1;
                              fetchEmployeeData();
                        });
                  },
                  error: function (response) {
                        alert(response.errorMessage);
                  }
            });
      }
}