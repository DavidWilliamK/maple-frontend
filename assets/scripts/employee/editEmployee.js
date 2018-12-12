//Finished
function editEmployee(){
    var check = null;
    for (var i = 0; i <= 10; i++) { //Change i's limit to amount of data in a page
          if ($("input:checkbox[id = 'employee["+i+"]checkbox']").is(':checked')) {
                check = $("input:checkbox[id = 'employee["+i+"]checkbox']").val();
          }
    }
    if(check == null){
          alert("ERROR");
    }
    else{
      $(".modal-part").load("../../components/modal.html", function(){
            $("#modalTemplate").modal({show:true});
            $("#modalAddEmployee").show();
            $("#employeeImagePlaceholder").click(function(){
                  $("#employeeUploadImage").click();
            });
            $.ajax({
                  type: "GET",
                  url: "http://localhost:8080/employee/" + check,
                  dataType: "json",
                  success: function(response){
                        var employeeDataContainer = response.value;
                        if(employeeDataContainer.imagePath){
                              var image = employeeDataContainer.imagePath;
                              image = image.split("/");
                              image = image.pop();
                              $("#employeeImagePlaceholder").attr("src", "../assets/images/employees/"+image);
                        }
                        $("#employeeIDlbl").html(employeeDataContainer.id);
                        $("#fullname").val(employeeDataContainer.name);
                        $("#username").val(employeeDataContainer.username)
                        $("#phone").val(employeeDataContainer.phone);
                        $("#email").val(employeeDataContainer.email);
                        $("#superiorId").val(employeeDataContainer.superiorId);
                  },
                  error: function(response){
                        console.log("Error");
                  }
                  });

                  //ImagePreview
                  $("#employeeUploadImage").change(function(){
                        readUrl(this);
                  })
                  function readUrl(input){
                        if(input.files && input.files[0]){
                              var reader = new FileReader();

                              reader.onload = function(e){
                                    $("#employeeImagePlaceholder").attr("src", e.target.result);
                              }
                              reader.readAsDataURL(input.files[0]);
                        }
                  }

                  //ButtonSave Click
                  $("#modalSaveChanges").click(function(){
                        var name = $("#fullname").val();
                        var username = $("#username").val();
                        var phone = $("#phone").val();
                        var superior = $("#superiorId").val();
                        var password = $("#password").val();
                        var email = $("#email").val();
                        var image = $("#employeeUploadImage")[0];
                        formdata = new FormData();
            
                        var newUser = {
                              "username": username,
                              "password": password,
                              "superiorId": superior,
                              "name": name,
                              "phone": phone,
                              "email": email
                        }
                        formdata.append("file", image.files[0]);
                        formdata.append("data", JSON.stringify(newUser));
            
            
                        $.ajax({
                              type: "POST",
                              url: "http://localhost:8080/employee/" + check,
                              enctype: "multipart/form-data",
                              data: formdata,
                              processData: false,
                              contentType: false,
                              success: function(response){
                                    if(response.code == "OK"){
                                          alert("Successfully saved");
                                          window.location.reload();
                                    }
                                    else{
                                          console.log(response);
                                    }
                              },
                              error: function(response){
                                    console.log(response);
                              }
                        });
                        check = null;
                  });
      });
    }
}