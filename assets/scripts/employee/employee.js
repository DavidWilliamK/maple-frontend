$(document).ready(function () {
      $(".navbar-part").load("../../components/navbar.html", function () {
            $("#employeeLink").css("background-color", "#00D6FF");
      });
      $(".sidebar-part").load("../../components/sidebar.html", function () {
            $("#employeeNameSearch").keyup(searchByName);
            $(".search-item-name").hide();
            $(".search-sku").hide();
      });
      $(".page-header").load("../../components/page-header.html", function () {
            $("#btnAdd").click(addEmployee);
            $("#btnEdit").click(editEmployee);
            $("#btnDelete").click(removeEmployee);
      });
      loadEmployee();
});

//Finished
function searchByName() {
      $("#employeeNameResult").html('');
      var searchField = $("#employeeNameSearch").val();
      loadEmployee(searchField);
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