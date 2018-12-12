$(document).ready(function(){
    $(".navbar-part").load("../../components/navbar.html",function(){
          $(".sidebar-part").load("../../components/sidebar.html", function(){
                    //   loadAssignment();
                      $("#homeLink").css("background-color", "#00D6FF");
                    //   $("#btnAdd").click(addAssignment);
                    //   $("#btnEdit").click(editAssignment);
                    //   $("#btnDelete").click(removeAssignment);
                      //Search may change according to backend
                    //   $("#employeeNameSearch").keyup(searchByName);
                    //   $("#idSearch").keyup(searchById);
                      $(".search-employee-name").hide();
                      $(".search-id").hide();
                      //Search may change according to backend
                      //Upload image still doesn't work
          });
    });
});