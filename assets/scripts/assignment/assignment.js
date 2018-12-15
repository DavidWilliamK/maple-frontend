$(document).ready(function () {
      $(".navbar-part").load("../../components/navbar.html", function(){
            $("#assignmentLink").css("background-color", "#00D6FF");
      });
      $(".sidebar-part").load("../../components/sidebar.html", function(){
            $("#employeeNameSearch").keyup(searchByName);
            $("#idSearch").keyup(searchById);
            $(".search-item-name").hide();
            $(".search-sku").hide();
      });
      $(".page-header").load("../../components/page-header.html", function(){
            $("#btnAdd").click(addAssignment);
            $("#btnEdit").click(editAssignment);
            $("#btnDelete").click(removeAssignment);
      });
      loadAssignment();

      //Search may change according to backend

      //Search may change according to backend
      //Upload image still doesn't work
});

//Finished
function searchById() {
      $("#idResult").html('');
      var searchField = $("#idSearch").val();
      var exp = new RegExp(searchField, "i");
      $.ajax({
            type: "GET",
            url: "http://localhost:8080/employee",
            success: function (response) {
                  $.each(response.value, function (key, val) {
                        if (val.id.search(exp) != -1) {
                              $("#idResult").append("<li class=list-group-item data-toggle = modal data-target = #modalDetail data-id = " + val.id + ">" + val.id + " <span> | </span>" + val.name + "</li>");
                        }
                  });
            },
            error: function (response) {
                  console.log(response);
            }
      });
      $("body").click(function () {
            $("#idResult").html('');
      })
}
//Finished
function searchByName() {
      $("#employeeNameResult").html('');
      var searchField = $("#employeeNameSearch").val();
      var exp = new RegExp(searchField, "i");
      $.ajax({
            type: "GET",
            url: "http://localhost:8080/employee/",
            success: function (response) {
                  $.each(response.value, function (key, val) {
                        if (val.name.search(exp) != -1) {
                              $("#employeeNameResult").append("<li class = list-group-item data-toggle = modal data-target = #modalDetail data-id = " + val.id + ">" + val.id + " <span> | </span>" + val.name + "</li>");
                        }
                  });
            },
            error: function (response) {
                  console.log(response);
            }
      });
      $("body").click(function () {
            $("#employeeNameResult").html('');
      })
}