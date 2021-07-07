function getReceivedTable() {

  page = 0;
  fetchReceivedData();

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
    $("#tableReceived>tbody").empty();
    var receivedItemDataContainer = response.value;
    var receivedItemData = "";
    var i = 0;
    if (receivedItemDataContainer.length) {
      console.log("TEST");
      $.each(receivedItemDataContainer, function (key, value) {
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
        receivedItemData += "<tr id = receivedItemRow[" + i + "]>";
        receivedItemData += "<td id = receivedItemId[" + i + "] data-id = " + value.assignmentId + ">" + value.assignmentId + "</td>";
        if (role === "ADMIN") {
          $(".employeeName").show();
          receivedItemData += "<td id = receivedItemEmployee[" + i + "]>" + value.employeeUsername + "</td>";
          $("#receivedPagination").attr("colspan", 5);
        }
        receivedItemData += "<td id = receivedItemName[" + i + "]>" + value.itemName + "</td>";
        receivedItemData += "<td id = receivedItemQuantity[" + i + "]>" + value.quantity + "</td>";
        receivedItemData += "<td id = receivedItemUpdated[" + i + "]>" + date + "</td>";
        receivedItemData += "</tr>";
        i++;
      });
      createPagination(response.totalPages, page);
      $(".previous").click(function () {
        page--;
        fetchReceivedData();
      });

      $(".next").click(function () {
        page++;
        fetchReceivedData();
      });
      $(".page-number").click(function () {
        page = $(this).text() - 1;
        fetchReceivedData();
      });
    }
    else {
      $("#tableReceived").removeClass("table-hover");
      if(role === "ADMIN"){
        $(".employeeName").show();
        receivedItemData += "<tr><td colspan='5' class='text-center p-4'><h3>No Data Available</h3><br>";
        receivedItemData += "<button class='btn btn-dark' onclick='window.location.reload()'>Reload</button></td></tr>";
      }
      else{
        receivedItemData += "<tr><td colspan='4' class='text-center p-4'><h3>No Data Available</h3><br>";
        receivedItemData += "<button class='btn btn-dark' onclick='window.location.reload()'>Reload</button></td></tr>";
      }
      
      $("#receivedPagination").hide();
    }
    $("#tableReceived").append(receivedItemData);
  }

  function fetchReceivedData() {
    $.ajax({
      type: "GET",
      dataType: "json",
      data: {
        page: page,
        size: 2
      },
      url: "http://localhost:8080/the-assignments?status=RECEIVED",
      beforeSend: function (request) {
        request.setRequestHeader("Authorization-key", getCookie("token"));
      },
      success: function (response) {
        //Obtain Role
        role = getRole();
        console.log(response);
        loadData(response);
      },
      error: function (response) {
        console.log(response);
        alert("Error");
      }
    });
  }

}