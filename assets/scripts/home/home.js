$(document).ready(function(){
    $(".navbar-part").load("../../components/navbar.html",function(){
          $(".sidebar-part").load("../../components/sidebar.html", function(){
                      $("#homeLink").css("background-color", "#00D6FF");
                      $(".search-employee-name").hide();
                      $(".search-id").hide();
                      
                      //GetItemCount
                      getItemCount();

                      //GetPendingTable
                      $("#pendingFooter").on("click", function(){
                        getPendingTable();
                      })
                      //GetApprovedTable
                      $("#approvedFooter").on("click", function(){
                        getApprovedTable();
                      })
                      //GetReceivedTable
                      $("#receivedFooter").on("click", function(){
                        getReceivedTable();
                      })
                      //GetAllItemsTable
                      $("#allItemsFooter").on("click", function(){
                        getAllItemsTable();
                      })
                      
          });
    });
});

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
              c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
              return c.substring(name.length, c.length);
        }
  }
  return "";
}