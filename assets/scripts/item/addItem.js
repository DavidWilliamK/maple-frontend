//Finished
function addItem(){
    $(".modal-part").load("../../components/modal.html", function(){
          $("#modalTemplate").modal({show:true});
          $("#modalAddItem").show();
          $("#itemImagePlaceholder").click(function(){
                $("#itemUploadImage").click();
          })

          //Image Preview
          $("#itemUploadImage").change(function(){
                readUrl(this);;
          })
          function readUrl(input){
                if(input.files && input.files[0]){
                      var reader = new FileReader();

                      reader.onload = function(e){
                            $("#itemImagePlaceholder").attr("src", e.target.result);
                      }
                      reader.readAsDataURL(input.files[0]);
                }
          }
    //ButtonSave Click
    $("#modalSaveChanges").click(function(){
          var name = $("#itemName").val();
          var quantity = $("#quantity").val();
          var price = $("#price").val();
          var desc = $("#itemDesc").val();
          var image = $("#itemUploadImage")[0];
          formdata = new FormData();

          var newItem = {
                "itemSku":null,
                "name": name,
                "price": price,
                "quantity": quantity,
                "description": desc
          }
          formdata.append("file", image.files[0]);
          formdata.append("data", JSON.stringify(newItem));

          $.ajax({
                type: "POST",
                url: "http://localhost:8080/item/",
                enctype: "multipart/form-data",
                data: formdata,
                contentType: false,
                processData: false,
                success: function(response){
                      if(response.code == "OK"){
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
      });
}