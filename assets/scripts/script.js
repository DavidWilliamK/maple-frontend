$(document).ready(function(){
      $(".navbar-part").load("../../components/navbar.html",function(){
            $(".sidebar-part").load("../../components/sidebar.html", function(){
                  $("#employeeSaveChanges").click(save);
                  $(".sidebar-add").click(add);
                  $(".sidebar-edit").click(edit);
                  $(".sidebar-delete").click(remove);
                  $("#nameSearch").keyup(searchByName);
                  $("#idSearch").keyup(searchById);
            });
      });
     
      load();
});

//Body onClick function still error
function searchById(){
      $("#idResult").html('');
      var searchField = $("#idSearch").val();
      var exp = new RegExp(searchField, "i");
      $.ajax({
            type: "GET",
            url: "https://jsonplaceholder.typicode.com/users",
            success: function(response){
                  $.each(response, function(key, val){
                        if(val.id.search(exp) != -1){ //Gabisa jalan karena id di placeholder bukan String -> Regex ga jalan di integer
                              $("#idResult").append("<li class='list-group-item'>" + val.id + " <span> | </span>"+ val.name+ "</li>");
                        }
                  });
            },
            error: function(response){
                  console.log("TEST");
            }
      });
      $("body").click(function(){
            // $("#idResult").html('');
      })
}

function searchByName(){
      $("#nameResult").html('');
      var searchField = $("#nameSearch").val();
      var exp = new RegExp(searchField, "i");
      $.ajax({
            type: "GET",
            url: "https://jsonplaceholder.typicode.com/users",
            success: function(response){
                  $.each(response, function(key, val){
                        if(val.name.search(exp) != -1){
                              $("#nameResult").append("<li class='list-group-item'>" + val.id + " <span> | </span>"+ val.name+ "</li>");
                        }
                  });
            },
            error: function(response){
                  console.log(response);
            }
      });
      $("body").click(function(){
            $("#nameResult").html('');
      })
}

function load(){
      $.ajax({
            type: "GET",
            dataType: "json",
//          url: "http://localhost:8080/employee"
            url: "https://jsonplaceholder.typicode.com/users", //Dummy URL
            // success: function(response){
            //       var employeeDataContainer = response.value;
            //       var employeeData = "";
            //       var i = 0;
            //       $.each(employeeDataContainer, function(key, value){
            //             employeeData += "<tr id = employeeRow["+i+"]>";
            //             employeeData += "<td id = employeeId["+i+"]>"+value.id+"</td>";
            //             employeeData += "<td id = employeeName["+i+"]>"+value.name+"</td>";
            //             employeeData += "<td id = employeePhone["+i+"]>"+value.phone+"</td>";
            //             employeeData += "<td id = employee["+i+"]selected><input type=checkbox></input></td>"
            //             employeeData += "</tr>";
            //             i++;
            //       });
            //       $("#viewEmployeeTable").append(employeeData);
            // },
            // error: function(response){
            //       alert(response.errorMessage);
            //       console.log(response);
            // }
//DummyData
            success: function(response){
                  var employeeDataContainer = response;
                  var employeeData = "";
                  var i = 1;
                  $.each(employeeDataContainer, function(key, val){
                        employeeData += "<tr id = employeeRow["+i+"]>";
                        employeeData += "<td id = employeeId["+i+"]>"+val.id+"</td>";
                        employeeData += "<td id = employeeName["+i+"]>"+val.name+"</td>";
                        employeeData += "<td id = employeePhone["+i+"]>"+val.phone+"</td>";
                        employeeData += "<td id = employee["+i+"]selected><input type=checkbox id= employee["+i+"]checkbox></input></td>"
                        employeeData += "</tr>";
                        i++;
                  });
                  $("#viewEmployeeTable").append(employeeData);
            },
            error: function(response){
                  alert(response.errorMessage);
                  console.log(response);
            }
      });
}

function save(){
      var name = $("#fullname").val();
      var username = $("#username").val();
      var phone = $("#phone").val();
      var superior = $("#superiorId").val();
      var password = $("#password").val();

      var newUser = {
            "employeeId":null,
            "username": username,
            "password": password,
            "superiorId": superior,
            "fullname": name,
            "phone": phone
      }

      $.ajax({
            type: "POST",
            url: "https://jsonplaceholder.typicode.com/users",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(newUser),
            success: function(response){
                  console.log("Successfully saved");
            },
            error: function(response){
                  console.log(response);
            }
      });
}

function add(){
      $("#fullname").val("");
      $("#username").val("")
      $("#phone").val("");
}

//Display value of checked item in modal edit
function edit(){
      $("#fullname").val("");
      $("#username").val("")
      $("#phone").val("");
      var check;
      for (var i = 1; i <= 10; i++) { //Change i's limit to amount of data in a page
            if ($("input:checkbox[id = 'employee["+i+"]checkbox']").is(':checked')) {
                  check = i;
            }
      }
      console.log(check);

      $.ajax({
      type: "GET",
      url: "https://jsonplaceholder.typicode.com/users/" + check,
      dataType: "json",
      success: function(response){
            $("#fullname").val(response.name);
            $("#username").val(response.username)
            $("#phone").val(response.phone);
      },
      error: function(response){
            console.log("Error");
      }
      });
}

//Delete function
//Dummy data
//Kyknya masih bug
function remove(){
      $(".sidebar-delete").on("click", function(){
            for (var i = 0; i <= 9; i++) { //Change i's limit to amount of data in a page
                  if ($("input:checkbox[id = 'employee["+i+"]checkbox']").is(':checked')) {
                        $.ajax({
                        type: "DELETE",
                        url: "https://jsonplaceholder.typicode.com/users/" + i, //Dummy data
                        contentType: "application/json",
                        dataType: "json",
                        success: function(){
                              console.log("Deleted");
                              console.log(i);
                        },
                        error: function(e){
                              console.log(e);
                        }
                        });
                  }
            }
      });
}