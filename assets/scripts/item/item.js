$(document).ready(function () {
      $(".navbar-part").load("../../components/navbar.html", function () {
            $("#itemLink").css("background-color", "#00D6FF");
      });
      $(".sidebar-part").load("../../components/sidebar.html", function () {
            $("#itemNameSearch").keyup(searchByName);
            $(".search-id").hide();
            $(".search-employee-name").hide();
      });
      $(".page-header").load("../../components/page-header.html", function () {
            $("#btnRequest").show();
            $("#btnAdd").click(addItem);
            $("#btnEdit").click(editItem);
            $("#btnDelete").click(removeItem);
            $("#btnRequest").click(requestItem);
      });
      loadItem();
});

//Finished
function searchByName(){
      $("#itemNameResult").html('');
      var searchField = $("#itemNameSearch").val();
      loadItem(searchField);
}

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