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
                            window.location.reload();
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