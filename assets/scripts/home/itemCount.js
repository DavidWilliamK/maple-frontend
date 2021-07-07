function getItemCount(){
    $.ajax({
        type: "GET",
        async: false,
        dataType: "json",
        url: "http://localhost:8080/",
        beforeSend: function(request) {
          request.setRequestHeader("Authorization-key", getCookie("token"));
        },
        success: function(response){
          $("#pendingCount").html(response.value.pending);
          $("#approvedCount").html(response.value.approved);
          $("#receivedCount").html(response.value.received);
          $("#allItemsCount").html(response.value.all);
        },
        error: function(response){
          console.log(response);
        }
      });
}