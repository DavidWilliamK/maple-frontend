$(document).ready(function(){
      $(".navbar-part").load("../../components/navbar.html",function(){
      	   $(".sidebar-part").load("../../components/sidebar.html");
      });
      // GIJGO Grid
      // var employeeTable = $("#employeeTable").grid({
      // 	dataSource: "http://localhost:8080/employee",
      // 	columns: [
      // 		{field: 'Photos', width: 56},
      // 		{field: 'ID', sortable: true},
      // 		{field: 'Name', sortable: true},
      // 		{field: 'Select'}
      // 	],
      // 	pager: {limit: 5}
      // });
      $.ajax({
      	type: "GET",
      	url: "http://localhost:8080/employee",
      	dataType: "json",
      	success: function(response){
      		var employeeData = "";
      		$.each(data, function(key, object){
      			employeeData += "<tr>";
      			employeeData += "<td>"+object.value.imagePath+"</td>";
      			employeeData += "<td>"+object.value.id+"</td>";
      			employeeData += "<td>"+object.value.name+"</td>";
      			employeeData += "</tr>";
      		});
      		$(".employeeTable").append(employeeData);
      	},
      	error: function(response){
      		alert("Something went wrong!");
      	}
      });

      //Script isn't loaded(?)
      $("#employeeSaveChanges").click(function(){
            alert("TEST");
      	var name = $("#fullname").val();
      	var username = $("#username").val();
      	var phone = $("#phone").val();
      	var superior = $("superiorId").val();

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
      		url: "http/employee",
      		dataType: "json",
      		data: JSON.stringify(newUser),
      		success: function(response){
      			console.log(response);
      		},
      		error: function(response){
      			alert("Something went wrong!");
      		}
      	});
      });
});