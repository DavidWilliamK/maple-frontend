$(document).ready(function(){
    $(".navbar-part").load("../../components/navbar.html",function(){
          $(".sidebar-part").load("../../components/sidebar.html", function(){
                $(".page-header").load("../../components/page-header.html", function(){
                      load();
                      $("#assignmentLink").css("background-color", "#00D6FF");
                      $("#btnAdd").click(function(){
                            $(".modal-part").load("../../components/modal.html", function(){
                                  $("#modalTemplate").modal({show:true})
                                  $("#modalDetail").hide();
                                  $("#modalDelete").hide();
                                  add();
                            });
                      });
                      //TOSHOWDETAIL DOESN'T WORK
                      $("#btnEdit").click(function(){
                            $(".modal-part").load("../../components/modal.html", function(){
                                  $("#modalTemplate").modal({show:true})
                                  $("#modalDetail").hide();
                                  $("#modalDelete").hide();
                                  edit();
                            });
                      });
                      //NOTWORKING
                      $("#btnDelete").click(function(){
                            $(".modal-part").load("../../components/modal.html", function(){
                                  $("#modalTemplate").modal({show:true})
                                  $("#modalAdd").hide();
                                  $("#modalDetail").hide();
                                  remove();
                            });
                      });
                      //Search may change according to backend
                      $("#employeeNameSearch").keyup(searchByName);
                      $("#idSearch").keyup(searchById);
                      $(".search-item-name").hide();
                      $(".search-sku").hide();
                      //Search may change according to backend
                      //Upload image still doesn't work
                })
          });
    });
});

//Finished
function searchById(){
    $("#idResult").html('');
    var searchField = $("#idSearch").val();
    var exp = new RegExp(searchField, "i");
    $.ajax({
          type: "GET",
          url: "http://localhost:8080/employee",
          success: function(response){
                $.each(response.value, function(key, val){
                      if(val.id.search(exp) != -1){
                            $("#idResult").append("<li class=list-group-item data-toggle = modal data-target = #modalDetail data-id = "+val.id+">" + val.id + " <span> | </span>"+ val.name+ "</li>");
                      }
                });
          },
          error: function(response){
                console.log(response);
          }
    });
    $("body").click(function(){
          $("#idResult").html('');
    })
}
//Finished
function searchByName(){
    $("#employeeNameResult").html('');
    var searchField = $("#employeeNameSearch").val();
    var exp = new RegExp(searchField, "i");
    $.ajax({
          type: "GET",
          url: "http://localhost:8080/employee/",
          success: function(response){
                $.each(response.value, function(key, val){
                      if(val.name.search(exp) != -1){
                            $("#employeeNameResult").append("<li class = list-group-item data-toggle = modal data-target = #modalDetail data-id = "+val.id+">" + val.id + " <span> | </span>"+ val.name+ "</li>");
                      }
                });
          },
          error: function(response){
                console.log(response);
          }
    });
    $("body").click(function(){
          $("#employeeNameResult").html('');
    })
}