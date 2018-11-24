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
    });
}