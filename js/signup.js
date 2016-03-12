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

		// if(data == "OK"){
		   	sessionStorage.setItem("username",userName);
		   	window.location.replace("home.html");
		// }else{

		// }
	} 

	$("#signup_form").submit(function(event){
	
		// Stop form from submitting normally
		event.preventDefault();
		 
		var name = $("#inputName").val();
		var email = $("#inputEmail").val();
		var username = $("#inputUser").val();
		var password = $("#inputPassword").val();

		sendSignupRequest(username,password,name,email,loginFunc);
	});


});