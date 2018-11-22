$(document).ready(function(){
      $(".navbar-part").load("../../components/navbar.html",function(){
            $(".sidebar-part").load("../../components/sidebar.html", function(){
                  $("#itemLink").css("background-color", "#00D6FF");
                  $(".sidebar-add").click(add);
                  $(".sidebar-edit").click(edit);
                  $(".sidebar-delete").click(remove);
                  $("#itemNameSearch").keyup(searchByName);
                  $("#skuSearch").keyup(searchBySku);
                  $(".search-id").hide();
                  $(".search-employee-name").hide();
            });
      });
      load();
});

//Finished
function searchBySku(){
      $("#skuResult").html('');
      var searchField = $("#skuSearch").val();
      var exp = new RegExp(searchField, "i");
      $.ajax({
            type: "GET",
            url: "http://localhost:8080/item",
            success: function(response){
                  $.each(response.value, function(key, val){
                        if(val.itemSku.search(exp) != -1){ //Gabisa jalan karena id di placeholder bukan String -> Regex ga jalan di integer
                              $("#skuResult").append("<li class='list-group-item'>" + val.itemSku + " <span> | </span>"+ val.name+ "</li>");
                        }
                  });
            },
            error: function(response){
                  console.log(response);
            }
      });
      $("body").click(function(){
            $("#skuResult").html('');
      })
}
//Finished
function searchByName(){
      $("#itemNameResult").html('');
      var searchField = $("#itemNameSearch").val();
      var exp = new RegExp(searchField, "i");
      $.ajax({
            type: "GET",
            url: "http://localhost:8080/item/",
            success: function(response){
                  $.each(response.value, function(key, val){
                        if(val.name.search(exp) != -1){
                              $("#itemNameResult").append("<li class='list-group-item'>" + val.itemSku + " <span> | </span>"+ val.name+ "</li>");
                        }
                  });
            },
            error: function(response){
                  console.log(response);
            }
      });
      $("body").click(function(){
            $("#itemNameResult").html('');
      })
}
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
                        itemData += "<td id = itemId["+i+"]>"+value.itemSku+"</td>";
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
//Finished
function add(){
      $("#itemName").val("");
      $("#quantity").val("");
      $("#price").val("");
      $("#itemDesc").val("");
      $("#itemSKUlbl").html("");
      //ButtonSave Click
      $("#itemSaveChanges").click(function(){
            var name = $("#itemName").val();
            var quantity = $("#quantity").val();
            var price = $("#price").val();
            var desc = $("#itemDesc").val();

            var newItem = {
                  "itemSku":null,
                  "name": name,
                  "price": price,
                  "quantity": quantity,
                  "description": desc
            }

            $.ajax({
                  type: "POST",
                  url: "http://localhost:8080/item/",
                  contentType: "application/json; charset=utf-8",
                  dataType: "json",
                  data: JSON.stringify(newItem),
                  success: function(response){
                        if(response.code != 500){
                              alert("Successfully saved");
                        }
                        else{
                              alert(response.errorMessage);
                        }
                  },
                  error: function(response){
                        console.log(response);
                  }
            });
      });
}
//Finished
function edit(){
      $("#itemName").val("");
      $("#quantity").val("");
      $("#price").val("");
      $("#itemDesc").val("");
      $("#itemSKUlbl").val("");
      var check = "null";
      for (var i = 0; i <= 3; i++) { //Change i's limit to amount of data in a page
            if ($("input:checkbox[id = 'item["+i+"]checkbox']").is(':checked')) {
                  check = $("input:checkbox[id = 'item["+i+"]checkbox']").val();
            }
      }

      $.ajax({
      type: "GET",
      url: "http://localhost:8080/item/" + check,
      dataType: "json",
      success: function(response){
            var itemDataContainer = response.value;
            $("#itemSKUlbl").html(itemDataContainer.itemSku);
            $("#itemName").val(itemDataContainer.name);
            $("#quantity").val(itemDataContainer.quantity)
            $("#price").val(itemDataContainer.price);
            $("#itemDesc").val(itemDataContainer.description);

      },
      error: function(response){
            console.log("Error");
      }
      });
      //ButtonSave Click
      $("#itemSaveChanges").click(function(){
            var name = $("#itemName").val();
            var quantity = $("#quantity").val();
            var price = $("#price").val();
            var desc = $("#itemDesc").val();

            var newItem = {
                  "name": name,
                  "price": price,
                  "quantity": quantity,
                  "description": desc
            }

            $.ajax({
                  type: "POST",
                  url: "http://localhost:8080/item/"+check,
                  contentType: "application/json; charset=utf-8",
                  dataType: "json",
                  data: JSON.stringify(newItem),
                  success: function(response){
                        if(response.code != 500){
                              alert("Successfully saved");
                        }
                        else{
                              alert(response.errorMessage);
                        }
                  },
                  error: function(response){
                        console.log(response);
                  }
            });
            check = "null";
      });
}
//Finished
function remove(){
      for (var i = 0; i <= 2; i++) { //Change i's limit to amount of data in a page
            if ($("input:checkbox[id = 'item["+i+"]checkbox']").is(':checked')) {
                  $.ajax({
                  type: "DELETE",
                  url: "http://localhost:8080/item/" + $("input:checkbox[id = 'item["+i+"]checkbox']").val(), //Dummy data
                  contentType: "application/json",
                  dataType: "json",
                  success: function(){
                        alert("Deleted");
                  },
                  error: function(response){
                        console.log(response);
                  }
                  });
            }
      }
}