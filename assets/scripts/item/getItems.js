//Finished - pagination
function loadItem(){

      var page = 0;

      fetchItemData();

      $("#btnPrev").click(function(){
            if(page > 0){
                  page--;
                  fetchItemData();
            }
      })

      $("#btnNext").click(function(){
            if((page+1)*size < totalRecords){
                  page++;
                  fetchItemData();      
            }
      })

      $(".page-btn").click(function(){
            page = $(this).html() - 1;
            fetchItemData();
      })

      function fetchItemData(){
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
                  url: "http://localhost:8080/item/",
                  success: function(response){
                        $("#viewItemTable>tbody").empty();
                        var itemDataContainer = response.value;
                        var itemData = "";
                        var i = 0;
                        $.each(itemDataContainer, function(key, value){
                              itemData += "<tr id = itemRow["+i+"]>";
                              itemData += "<td id = itemSku["+i+"] data-id = "+value.itemSku+">"+value.itemSku+"</td>";
                              itemData += "<td id = itemName["+i+"]>"+value.name+"</td>";
                              itemData += "<td id = itemQuantity["+i+"]>"+value.quantity+"</td>";
                              itemData += "<td id = itemPrice["+i+"]>"+value.price+"</td>";
                              itemData += "<td class = checkbox id = item["+i+"]selected><input type=checkbox id = item["+i+"]checkbox value = "+value.itemSku+"></input></td>"
                              itemData += "<td name = "+value.itemSku+" id = item["+i+"]pdf>PDF</td>";
                              itemData += "</tr>";
                              i++;
                        });
                        $("#viewItemTable").append(itemData);
                        $("td[id*='itemSku']").click(function(){
                              var sku = $(this).html();
                              $(".modal-part").load("../../components/modal.html", function(){
                                    $("#modalTemplate").modal({show:true})
                                    $("#modalDetailItem").show();
                                    $.ajax({
                                          type: "GET",
                                          url: "http://localhost:8080/item/" + sku,
                                          dataType: "json",
                                          success: function(response){
                                                var itemDataContainer = response.value;
                                                if(itemDataContainer.imagePath){
                                                      var image = itemDataContainer.imagePath;
                                                      image = image.split("/");
                                                      image = image.pop();
                                                      console.log(image);
                                                      $("#itemDetailImage").attr("src", "../assets/images/items/"+image);
                                                }
                                                $("#modalTitle").html(itemDataContainer.itemSku);
                                                $("#spnItemName").html(itemDataContainer.name);
                                                $("#spnItemQuantity").html(itemDataContainer.quantity);
                                                $("#spnItemPrice").html(itemDataContainer.price);
                                                $("#spnItemDesc").html(itemDataContainer.description);
                                                $("#modalSaveChanges").hide();
                                          },
                                          error: function(response){
                                                console.log("Error");
                                          }
                                    });    
                              })
                        });
                        $("td[id*='pdf']").click(function(){
                              var sku = $(this).attr("name");
                              $.ajax({
                                    type: "GET",
                                    url: "http://localhost:8080/item/"+sku+"/download",
                                    success: function(response){
                                          window.open("http://localhost:8080/item/"+sku+"/download", "_blank");
                                    },
                                    error: function(response){
                                          console.log("error");
                                    }
                              })
                        })
                        var pageIndex = 1;
                        for (let index = 0; index < response.totalPages; index++) {
                              if(index == 0){
                                    $("#btnPrev").hide();
                              }
                              if(index == response.totalPages-1){
                                    $("#btnNext").hide();
                              }
                              $(".pagination-items").append("<a href = # class = page-btn id = page["+index+"]0>"+pageIndex+"</a>");
                        }
                  },
                  error: function(response){
                        alert(response.errorMessage);
                  }
            });
      }
}