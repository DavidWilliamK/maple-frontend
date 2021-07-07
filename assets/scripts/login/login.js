window.module = window.module || {}

var credentialData = {};
var token;

function createToken(value){
    token = "token="+value;
    return token
}

function checkCredential(username, password){
    credentialData = {
        "username": username, 
        "password": password
    }
    attemptLogin(JSON.stringify(credentialData));
}

function successLogin(response){
    if (response.code === "BAD_REQUEST") {
        alert("Wrong credentials");
    } else if(response.code === "OK"){
        alert("Login Success");
        document.cookie = createToken(response.value);
        window.location.replace("../../pages/home.html");   
    }
    else{
        alert("Something went wrong");
        console.log(response);
    }
}

function errorLogin(response){
    console.log(response);
    alert("Login Failed, Please input the right credentials");
}

function attemptLogin(credentialData){
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/login",
        dataType: "json",
        contentType: "application/json",
        data: credentialData,
        success: function(response){
            successLogin(response)
        },
        error: function(response){
            errorLogin(response)
        },
    });
}

$(document).ready(function(){
    $("#btnLogin").on("click", function(){
        let username = $("#loginUsername").val();
        let password = $("#loginPassword").val();
        checkCredential(username, password);
        return false;
    })
})

module.exports = {
    credentialData,
    token
}