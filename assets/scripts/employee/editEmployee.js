//Finished
function edit(){
    $("#fullname").val("");
    $("#username").val("");
    $("#phone").val("");
    $("#email").val("");
    $("#superiorId").val("");
    $("#password").val("");
    $("#confirmPassword").val("");
    var check = "null";
    for (var i = 0; i <= 3; i++) { //Change i's limit to amount of data in a page
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
          $("#employeeIDlbl").html(employeeDataContainer.id);
          $("#fullname").val(employeeDataContainer.name);
          $("#username").val(employeeDataContainer.username)
          $("#phone").val(employeeDataContainer.phone);
          $("#email").val(employeeDataContainer.email);
          $("#superiorId").val(employeeDataContainer.superiorId);
          console.log(check);

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
                "employeeId": null,
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
                            alert("Successfully saved");
                            window.location.reload();
                      }
                      else{
                            alert(response.errorMessage);
                      }
                },
                error: function(response){
                      console.log(response);
                }
          });
          check = "null";
    });
}