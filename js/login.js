$(document).ready(function(){

	var userName = sessionStorage.getItem('username');

	if(userName==null ||userName=="logout"){
		$("#logoutButton").hide();
	}else{
		$("#loginButton").hide();
		$("#signupButton").hide();
		$("#userName").html(userName);
	}
	
	$("#logoutButton").click( function(){
		sessionStorage.removeItem('username');
	});


	var loginFunc = function(userName,data){
		if(data == "OK"){
		   	sessionStorage.setItem("username",userName);
		   	window.location.replace("home.html");
	   }else{
	   	alert(data);
	   }
	} 

	$("#login_form").submit(function(){
		// Stop form from submitting normally
		event.preventDefault();
		 
		var username = $("#signin_inputUser").val();
		var password = $("#signin_inputPassword").val();

		sendLoginRequest(username,password,loginFunc);
	});


});