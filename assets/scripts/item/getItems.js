//Finished - pagination
function loadItem(search) {

      var page = 0;

      fetchItemData();

      function loadPdf(sku){
            $.ajax({
                  type: "GET",
                  url: "http://localhost:8080/item/" + sku + "/download",
                  success: function (response) {
                        window.open("http://localhost:8080/item/" + sku + "/download", "_blank");
                  },
                  error: function (response) {
                        console.log("error");
                  }
            })
      }

      function loadDetail(sku){
            $(".modal-part").load("../../components/modal.html", function () {
                  $("#modalTemplate").modal({ show: true })
                  $("#modalDetailItem").show();
                  $.ajax({
                        type: "GET",
                        url: "http://localhost:8080/item/" + sku,
                        dataType: "json",
                        success: function (response) {
                              var itemDataContainer = response.value;
                              if (itemDataContainer.imagePath) {
                                    var image = itemDataContainer.imagePath;
                                    image = image.split("/");
                                    image = image.pop();
                                    console.log(image);
                                    $("#itemDetailImage").attr("src", "../assets/images/items/" + image);
                              }
                              $("#modalTitle").html(itemDataContainer.itemSku);
                              $("#spnItemName").html(itemDataContainer.name);
                              $("#spnItemQuantity").html(itemDataContainer.quantity);
                              $("#spnItemPrice").html(itemDataContainer.price);
                              $("#spnItemDesc").html(itemDataContainer.description);
                              $("#modalSaveChanges").hide();
                        },
                        error: function (response) {
                              console.log("Error");
                        }
                  });
            })
      }

      function loadData(response){
            $("#viewItemTable>tbody").empty();
            var itemDataContainer = response.value;
            var itemData = "";
            var i = 0;
            if (itemDataContainer.length) {
                  $.each(itemDataContainer, function (key, value) {
                        itemData += "<tr id = itemRow[" + i + "]>";
                        itemData += "<td id = itemSku[" + i + "] data-id = " + value.itemSku + ">" + value.itemSku + "</td>";
                        itemData += "<td id = itemName[" + i + "]>" + value.name + "</td>";
                        itemData += "<td id = itemQuantity[" + i + "]>" + value.quantity + "</td>";
                        itemData += "<td id = itemPrice[" + i + "]>" + value.price + "</td>";
                        itemData += "<td class = checkbox id = item[" + i + "]selected><input type=checkbox id = item[" + i + "]checkbox value = " + value.itemSku + "></input></td>"
                        itemData += "<td name = " + value.itemSku + " id = item[" + i + "]pdf>PDF</td>";
                        itemData += "</tr>";
                        i++;
                  });
            } else {
                  $("#viewItemTable").removeClass("table-hover")
                  itemData+= "<tr><td colspan='6' class='text-center p-4'><h3>No Data Available</h3><br>";
                  itemData+= "<button class='btn btn-dark' onclick='window.location.reload()'>Reload</button></td></tr>";
            }
            
            $("#viewItemTable").append(itemData);
            $("td[id*='itemSku']").click(function () {
                  var sku = $(this).html();
                  loadDetail(sku);
            });
            $("td[id*='pdf']").click(function () {
                  var sku = $(this).attr("name");
                  loadPdf(sku);
            })
            createPagination(response.totalPages, page);
            $(".previous").click(function () {
                  page--;
                  fetchItemData();
            });

            $(".next").click(function () {
                  page++;
                  fetchItemData();
            });
            $(".page-number").click(function () {
                  console.log($(this).text());
                  page = $(this).text() - 1;
                  fetchItemData();
            });
      }

      function loadAllItems(){
            $.ajax({
                  type: "GET",
                  contentType: "application/octet-stream",
                  dataType: "json",
                  data: {
                        page: page,
                        size: 5
                  },
                  url: "http://localhost:8080/item/",
                  success: function (response) {
                        loadData(response);
                  },
                  error: function (response) {
                        alert(response.errorMessage);
                  }
            });
      }

      function loadSearchedItems(search){
            $.ajax({
                  type: "GET",
                  contentType: "application/octet-stream",
                  dataType: "json",
                  data: {
                        page: page,
                        size: 5
                  },
                  url: "http://localhost:8080/item?search="+search,
                  success: function (response) {
                        loadData(response);
                  },
                  error: function (response) {
                        alert(response.errorMessage);
                  }
            });
      }

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

      function fetchItemData() {
            if(!search){
                  loadAllItems();
            }
            else{
                  loadSearchedItems(search);
            }
            
      }
}