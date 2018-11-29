//Finished
function add(){
    $("#employeeIDlbl").html("");
    $("#fullname").val("");
    $("#username").val("");
    $("#phone").val("");
    $("#email").val("");
    $("#superiorId").val("");
    $("#password").val("");
    $("#confirmPassword").val("");
    $("input[id='imagePlaceholder']").click(function(){
      $("input[id='uploadImage']").click();
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
                url: "http://localhost:8080/employee/",
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
    });
}