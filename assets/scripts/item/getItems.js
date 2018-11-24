//Finished - pagination
function load(){
    $.ajax({
          type: "GET",
          dataType: "json",
          url: "http://localhost:8080/item/",
          success: function(response){
                var itemDataContainer = response.value;
                var itemData = "";
                var i = 0;
                $.each(itemDataContainer, function(key, value){
                      itemData += "<tr id = itemRow["+i+"]>";
                      itemData += "<td id = itemId["+i+"] data-toggle = modal data-target = #modalDetail data-sku = "+value.itemSku+">"+value.itemSku+"</td>";
                      itemData += "<td id = itemName["+i+"]>"+value.name+"</td>";
                      itemData += "<td id = itemUsername["+i+"]>"+value.quantity+"</td>";
                      itemData += "<td id = itemPrice["+i+"]>"+value.price+"</td>"
                      itemData += "<td class = checkbox id = item["+i+"]selected><input type=checkbox id = item["+i+"]checkbox value = "+value.itemSku+"></input></td>"
                      itemData += "</tr>";
                      i++;
                });
                $("#viewItemTable").append(itemData);
          },
          error: function(response){
                alert(response.errorMessage);
          }
    });
}