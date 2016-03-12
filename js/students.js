
var refreshTable = function(){
  //just a note
   window.location.replace("students.html");
 };

var deleteStudent = function(studentId){
  var groupID   = sessionStorage.getItem("groupID");
  sendDeleteStudentRequest(studentId, groupID, refreshTable);
}

var editStudent = function(groupName, groupNotes, groupID){
  $("#editStudent").show();
 //$("#editGroupHeading").html("Edit Group-" + groupName + ", Group Notes-"+ groupNotes); 
}


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

  // 

  
  //add one student
  var addStudentFunc = function(studentId,studentName,studentPhone,studentEmail, present, late, missing ){
     $('#addr'+i).html( '<td>'+ i  + '</td>' + 
                        '<td>' + studentId + '</td>' + 
                        '<td>' + studentName + '</td>' +
                        '<td>' + studentPhone + '</td>' +
                        '<td>' + studentEmail + '</td>' +
                        '<td>' + present + '</td>' +
                        '<td>' + late + '</td>' +
                        '<td>' + missing + '</td>' +
                        '<td> <a onclick="deleteStudent(\''+studentId+'\')" class="btn btn-danger"> <span class="glyphicon glyphicon-trash"></span></a> ' +
                             '<a onclick="editStudent()" class="btn btn-warning"> <span class="glyphicon glyphicon-pencil"></span></a>'
                        );

      $('#tab_logic').append('<tr id="addr'+(i+1)+'" class="text-center"></tr>');
      i++; 
  };
  //add all the students in data (json) 
  var addStudentsFunc = function(data){
      var students = jQuery.parseJSON(data);
      var j;

      for (j = 0; j < students.length; j++) {
         addStudentFunc(students[j].Id, students[j].Name, students[j].Phone, students[j].Email, students[j].Present, students[j].Late, students[j].Missing);
      }
  }
  //insert to the table all students
  if(userName!=null){
    sendGetAllStudentRequest(groupID,addStudentsFunc);
  }
  // add new student
  $("#addStudentForm").submit(function(){
    var studentId  = $("#student_id_input").val();
    var studentName  = $("#student_name_input").val();
    var studentPhone  = $("#student_phone_input").val();
    var studentEmail  = $("#student_email_input").val();
    
    $("#student_id_input").val("");
    $("#student_name_input").val("");
    $("#student_phone_input").val("");
    $("#student_email_input").val("");

    sendAddNewStudentRequest(studentId,studentName,studentPhone,studentEmail,groupID, addStudentFunc);
  });
  // logout
  $("#logoutButton").click( function(){
    //note
    sessionStorage.removeItem('username');
  });
  // cancelEditStudent
  $("#cancelEditStudent").click( function(){
    //note
    $("#editStudent").hide();
  });

  //set the logout button - on click
  $("#changeImage").click( function(){
      //note
      var iamgeLoc = $("#newImageLocation").val();
      if(iamgeLoc==""){
        alert("problem with location");
      }else{
        sendUploadGroupImage("iamgeLoc");
        //sendUploadGroupImage(iamgeLoc);
      }
  });




  $(document).on('change', '.btn-file :file', function() {
    var input = $(this),
      label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
    input.trigger('fileselect', [label]);
    });

    $('.btn-file :file').on('fileselect', function(event, label) {
        
        var input = $(this).parents('.input-group').find(':text'),
            log = label;
        
        if( input.length ) {
            input.val(log);
        } else {
            if( log ) alert(log);
        }
      
    });
    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            
            reader.onload = function (e) {
                $('#img-upload').attr('src', e.target.result);
            }
            
            reader.readAsDataURL(input.files[0]);
        }
    }

  $("#imgInp").change(function(){
        readURL(this);
  });   



  //proxy
  //addStudentFunc("studentId","studentName","studentPhone","studentEmail", "present", "late", "missing");


});