$(document).ready(function(){
      $(".navbar-part").load("../../components/navbar.html",function(){
            $(".sidebar-part").load("../../components/sidebar.html", function(){
                  $(".page-header").load("../../components/page-header.html", function(){
                        $("#employeeLink").css("background-color", "#00D6FF");
                        $("#btnAdd").click(add);
                        $("#btnEdit").click(edit);
                        $("#btnDelete").click(remove);
                        $("#employeeNameSearch").keyup(searchByName);
                        $("#idSearch").keyup(searchById);
                        $(".search-item-name").hide();
                        $(".search-sku").hide();
                        $("input[id='imagePlaceholder']").click(function(){
                              $("input[id='uploadImage']").click();
                        });
                        $('#modalDetail').on('show.bs.modal', function(event){
                              var button = $(event.relatedTarget)
                              var id = button.data('id')
                              $.ajax({
                                    type: "GET",
                                    url: "http://localhost:8080/employee/" + id,
                                    dataType: "json",
                                    success: function(response){
                                          var employeeDataContainer = response.value;
                                          $("#modalDetailHeader").html(employeeDataContainer.id);
                                          $("#spnFullname").html(employeeDataContainer.name);
                                          $("#spnUsername").html(employeeDataContainer.username)
                                          $("#spnPhone").html(employeeDataContainer.phone);
                                          $("#spnEmail").html(employeeDataContainer.email);
                                          $("#spnSuperiorId").html(employeeDataContainer.superiorId);
                                    },
                                    error: function(response){
                                          console.log("Error");
                                    }
                              });                        
                        })
                  })
            });
      });
      load();
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