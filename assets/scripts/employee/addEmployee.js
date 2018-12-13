//Finished
function addEmployee(){
    $(".modal-part").load("../../components/modal.html", function(){
      $("#modalTemplate").modal({show:true});
      $("#modalTitle").html("Add Employee");
      $("#modalAddEmployee").show();
      $("#employeeImagePlaceholder").click(function(){
        $("#employeeUploadImage").click();
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
                  "id":null,
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
                  url: "http://localhost:8080/employee/",
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
      });   
    });
}