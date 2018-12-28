$(document).ready(function(){
    $("#btnLogin").click(function(){
        username = $("#loginUsername").val();
        password = $("#loginPassword").val();
        var data = {
            "username": username,
            "password": password
        };
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/login",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(data),
            success: function(response, textStatus, jqXHR){
                if (response.code === "BAD_REQUEST") {
                    alert("Wrong credentials");
                } else if(response.code === "OK"){
                    alert("Login Success");
                    alert(jqXHR.getResponseHeader("token"));
                    document.cookie = "token="+response.value;
                    window.location.replace("../../pages/employee.html");   
                }
                else{
                    alert("ASD");
                }
            },
            error: function(response){
                console.log(data);
                console.log(response);
                alert("Login Failed, Please input the right credentials");
            }
        });
    return false;
    })
})