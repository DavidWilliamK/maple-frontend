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