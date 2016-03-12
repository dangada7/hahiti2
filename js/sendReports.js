
var refreshFunc = function(){
  //just a note
   window.location.replace("reports.html");
};
var deleteStudent = function(studentId){
  var groupID   = sessionStorage.getItem("groupID");
  sendDeleteStudentRequest(studentId, groupID, refreshTable);
};
var editStudent = function(groupName, groupNotes, groupID){
  $("#editGroup").show();
 //$("#editGroupHeading").html("Edit Group-" + groupName + ", Group Notes-"+ groupNotes); 
};


//document ready
$(document).ready(function(){
 
  //get user name
  var userName = sessionStorage.getItem('username');
  var groupName = sessionStorage.getItem("groupName");
  var GroupNotes = sessionStorage.getItem("groupNotes");
  var groupID   = sessionStorage.getItem("groupID");
  var i=1;

  //set navigation bar
  var setNavigationBar = function(){
    $("#titleText").html(groupName);
    $("#note").html(GroupNotes);
    if(userName==null ||userName=="logout"){
      $("#logoutButton").hide();
    }else{
      $("#loginButton").hide();
      $("#signupButton").hide();
      $("#userName").html(userName);
    }
  };
  setNavigationBar();

  //add one student
  var addStudentFunc = function(studentId,studentName,studentPhone,studentEmail){
     $('#addr'+i).html( '<td>'+ i  + '</td>' + 
                        '<td id="studentId">' + studentId + '</td>' + 
                        '<td id="studentName">' + studentName + '</td>' +
                        '<td>' + studentPhone + '</td>' +
                        '<td>' + studentEmail + '</td>' +
                        '<td>' +
					 		'<div class="btn-group" data-toggle="buttons">'+
							  '<label class="btn btn-success active"> <input type="radio" name="options'+i+'" id="Present'+i+'" autocomplete="off" checked> Present <span class="glyphicon glyphicon-ok"></span> </label>'+
							  '<label class="btn btn-warning">        <input type="radio" name="options'+i+'" id="Late'+i+'" autocomplete="off"> Late <span class="glyphicon glyphicon-ok"></span> </label>' +
							  '<label class="btn btn-danger">         <input type="radio" name="options'+i+'" id="Missing'+i+'" autocomplete="off"> Missing  <span class="glyphicon glyphicon-ok"></span> </label>'+
							'</div>'+
                        '</td>'
                        );

      $('#tab_logic').append('<tr id="addr'+(i+1)+'" class="text-center"></tr>');
      i++; 
  };

  //add all the students in data (json) 
  var addStudentsFunc = function(data){
      var students = jQuery.parseJSON(data);
      var j;

      for (j = 0; j < students.length; j++) {
         addStudentFunc(students[j].Id, students[j].Name, students[j].Phone, students[j].Email);
      }
  }
  //insert to the table all students
  if(userName!=null){
    sendGetAllStudentRequest(groupID,addStudentsFunc);
  }

  // logout
  $("#logoutButton").click( function(){
    //note
    sessionStorage.removeItem('username');
  });


  // logout
  $("#send_report").click( function(){
    
	    var summary = "";
	    for(j=1; j<i; j++){

  			var studentName = $(("#addr" + j)).children('#studentName').html();
  			var studentId = $(("#addr" + j)).children('#studentId').html();
  			var status="status";

  			if($(("#addr" + j)).find('#Present'+j).is(':checked')){
  				status = "0";
  			}else if($(("#addr" + j)).find('#Late'+j).is(':checked')){
  				status = "1";
  			}else if($(("#addr" + j)).find('#Missing'+j).is(':checked')){
  				status = "2";
  			}

  	    	summary = summary + studentId + "," + status + ","+ studentName + "/ ";
	    }

	    sendAddNewReportRequest(userName, groupID, groupName, summary, refreshFunc);
  });
});




