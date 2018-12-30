function getPendingTable() {

      page = 0;
      fetchPendingData();

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

      function getRole() {
            //Obtain Role
            var role = getCookie("token");
            if (role.split("-")) {
                  role = role.split("-");
                  role = role.pop();
            }
            else {
                  role = "EMPLOYEE";
            }
            return role;
      }

      function loadData(response) {
            $("#tablePending>tbody").empty();
            var pendingItemDataContainer = response.value;
            var pendingItemData = "";
            var i = 0;
            if (pendingItemDataContainer.length) {
                  $.each(pendingItemDataContainer, function (key, value) {
                        //Obtain Date
                        let date;
                        if (value.updatedDate) {
                              date = value.updatedDate;
                        }
                        else {
                              date = value.createdDate;
                        }
                        date = date.split("T");
                        date.pop();

                        //Insert Data
                        pendingItemData += "<tr id = pendingItemRow[" + i + "]>";
                        pendingItemData += "<td id = pendingItemId[" + i + "] data-id = " + value.assignmentId + ">" + value.assignmentId + "</td>";
                        if (role === "ADMIN") {
                              $(".employeeName").show();
                              pendingItemData += "<td id = pendingItemEmployee[" + i + "]>" + value.employeeUsername + "</td>";
                              $("#pendingPagination").attr("colspan", 5);
                        }
                        pendingItemData += "<td id = pendingItemName[" + i + "]>" + value.itemName + "</td>";
                        pendingItemData += "<td id = pendingItemQuantity[" + i + "]>" + value.quantity + "</td>";
                        pendingItemData += "<td id = pendingItemUpdated[" + i + "]>" + date + "</td>";
                        pendingItemData += "</tr>";
                        i++;
                  });
                  createPagination(response.totalPages, page);
                  $(".previous").click(function () {
                        page--;
                        fetchPendingData();
                  });

                  $(".next").click(function () {
                        page++;
                        fetchPendingData();
                  });
                  $(".page-number").click(function () {
                        console.log($(this).text());
                        page = $(this).text() - 1;
                        fetchPendingData();
                  });
            }
            else {
                  $("#tablePending").removeClass("table-hover")
                  if(role === "ADMIN"){
                        $(".employeeName").show();
                        pendingItemData += "<tr><td colspan='5' class='text-center p-4'><h3>No Data Available</h3><br>";
                        pendingItemData += "<button class='btn btn-dark' onclick='window.location.reload()'>Reload</button></td></tr>";
                  }
                  else{
                        pendingItemData += "<tr><td colspan='4' class='text-center p-4'><h3>No Data Available</h3><br>";
                        pendingItemData += "<button class='btn btn-dark' onclick='window.location.reload()'>Reload</button></td></tr>";
                  }
                  
                  $("#pendingPagination").hide();
            }
            $("#tablePending").append(pendingItemData);
      }

      function fetchPendingData() {
            $.ajax({
                  type: "GET",
                  dataType: "json",
                  data: {
                        page: page,
                        size: 2
                  },
                  url: "http://localhost:8080/the-assignments?status=PENDING",
                  beforeSend: function (request) {
                        request.setRequestHeader("Authorization-key", getCookie("token"));
                  },
                  success: function (response) {
                        role = getRole();
                        loadData(response);
                  },
                  error: function (response) {
                        console.log(response);
                        alert("Error");
                  }
            });
      }
}