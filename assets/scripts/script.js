var selectedUser = [];
$(document).ready(function(){
      $(".navbar-part").load("../../components/navbar.html",function(){
            $(".sidebar-part").load("../../components/sidebar.html", function(){
                  $(".sidebar-add").click(add);
                  $(".sidebar-edit").click(edit);
                  $(".sidebar-delete").click(remove);
                  $("#nameSearch").keyup(searchByName);
                  $("#idSearch").keyup(searchById);
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
            $("#idResult").html('');
      })
}
//Finished
function searchByName(){
      $("#nameResult").html('');
      var searchField = $("#nameSearch").val();
      var exp = new RegExp(searchField, "i");
      $.ajax({
            type: "GET",
            url: "http://localhost:8080/employee/",
            success: function(response){
                  $.each(response.value, function(key, val){
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
//Finished - pagination
function load(){
      $.ajax({
            type: "GET",
            dataType: "json",
            url: "http://localhost:8080/employee/",
            success: function(response){
                  var employeeDataContainer = response.value;
                  var employeeData = "";
                  var i = 0;
                  $.each(employeeDataContainer, function(key, value){
                        employeeData += "<tr id = employeeRow["+i+"]>";
                        employeeData += "<td id = employeeId["+i+"]>"+value.id+"</td>";
                        employeeData += "<td id = employeeName["+i+"]>"+value.name+"</td>";
                        employeeData += "<td id = employeeUsername["+i+"]>"+value.username+"</td>";
                        employeeData += "<td class = checkbox id = employee["+i+"]selected><input type=checkbox id = employee["+i+"]checkbox value = "+value.username+"></input></td>"
                        employeeData += "</tr>";
                        selectedUser.push(value.username);
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
//Finished
function add(){
      $("#fullname").val("");
      $("#username").val("")
      $("#phone").val("");
      $("#email").val("");
      $("#superiorId").val("");
      $("#password").val("");
      $("#confirmPassword").val("");
      //ButtonSave Click
      $("#employeeSaveChanges").click(function(){
            var name = $("#fullname").val();
            var username = $("#username").val();
            var phone = $("#phone").val();
            var superior = $("#superiorId").val();
            var password = $("#password").val();
            var email = $("#email").val();

            var newUser = {
                  "employeeId":null,
                  "username": username,
                  "password": password,
                  "superiorId": superior,
                  "name": name,
                  "phone": phone,
                  "email": email
            }

            $.ajax({
                  type: "POST",
                  url: "http://localhost:8080/employee/",
                  contentType: "application/json; charset=utf-8",
                  dataType: "json",
                  data: JSON.stringify(newUser),
                  success: function(response){
                        if(response.code != 500){
                              console.log("Successfully saved");
                              console.log(newUser);
                        }
                        else{
                              console.log(response.errorMessage);
                        }
                  },
                  error: function(response){
                        console.log(response);
                  }
            });
      });
}
//FaultyAPI(?) > Can't update name, mail, phone
//Finished 
function edit(){
      $("#fullname").val("");
      $("#username").val("")
      $("#phone").val("");
      $("#email").val("");
      $("#superiorId").val("");
      $("#password").val("");
      $("#confirmPassword").val("");
      var check = "null";
      for (var i = 0; i <= 2; i++) { //Change i's limit to amount of data in a page
            console.log(i);
            if ($("input:checkbox[id = 'employee["+i+"]checkbox']").is(':checked')) {
                  check = $("input:checkbox[id = 'employee["+i+"]checkbox']").val();
            }
      }

      $.ajax({
      type: "GET",
      url: "http://localhost:8080/employee/" + check,
      dataType: "json",
      success: function(response){
            var employeeDataContainer = response.value;
            $.each(employeeDataContainer, function(key, value){
                  $("#fullname").val(value.name);
                  $("#username").val(value.username)
                  $("#phone").val(value.phone);
                  $("#email").val(value.email);
                  $("#superiorId").val(value.superiorId);
            })

      },
      error: function(response){
            console.log("Error");
      }
      });
      //ButtonSave Click
      $("#employeeSaveChanges").click(function(){
            var name = $("#fullname").val();
            var username = $("#username").val();
            var phone = $("#phone").val();
            var superior = $("#superiorId").val();
            var password = $("#password").val();
            var email = $("#email").val();

            var newUser = {
                  "employeeId":null,
                  "username": username,
                  "password": password,
                  "superiorId": superior,
                  "name": name,
                  "phone": phone,
                  "email": email
            }

            $.ajax({
                  type: "POST",
                  url: "http://localhost:8080/employee/" + check,
                  contentType: "application/json; charset=utf-8",
                  dataType: "json",
                  data: JSON.stringify(newUser),
                  success: function(response){
                        if(response.code != 500){
                              console.log("Successfully saved");
                              console.log(newUser);
                        }
                        else{
                              console.log(response.errorMessage);
                        }
                  },
                  error: function(response){
                        console.log(response);
                  }
            });
      });
      check = "null";
}
//Finished
function remove(){
      for (var i = 0; i <= 2; i++) { //Change i's limit to amount of data in a page
            if ($("input:checkbox[id = 'employee["+i+"]checkbox']").is(':checked')) {
                  $.ajax({
                  type: "DELETE",
                  url: "http://localhost:8080/employee/" + $("input:checkbox[id = 'employee["+i+"]checkbox']").val(), //Dummy data
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
}