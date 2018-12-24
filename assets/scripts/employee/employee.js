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