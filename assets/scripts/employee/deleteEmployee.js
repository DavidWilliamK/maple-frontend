//Finished
function remove(){
    for (var i = 0; i <= 3; i++) { //Change i's limit to amount of data in a page
          if ($("input:checkbox[id = 'employee["+i+"]checkbox']").is(':checked')) {
                $.ajax({
                type: "DELETE",
                url: "http://localhost:8080/employee/" + $("input:checkbox[id = 'employee["+i+"]checkbox']").val(), //Dummy data
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