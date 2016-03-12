
var goToStudentsPage = function(groupName,groupNotes,groupID){
    sessionStorage.setItem("groupName",groupName);
    sessionStorage.setItem("groupNotes",groupNotes);
    sessionStorage.setItem("groupID",groupID);
    window.location.replace("students.html");
};
var goToSendReportPage = function(groupName,groupNotes,groupID){
    sessionStorage.setItem("groupName",groupName);
    sessionStorage.setItem("groupNotes",groupNotes);
    sessionStorage.setItem("groupID",groupID);
    window.location.replace("sendReport.html");
};
var refreshTable = function(){
    //just a note
    window.location.replace("groups.html");
};
var deleteGroup = function(groupId){
   var userName = sessionStorage.getItem('username');
   sendDeleteGroupRequest(groupId,userName,refreshTable);
 }
var editGroup = function(groupName, groupNotes, groupID){
  $("#editGroup").show();
  //$("#editGroupHeading").html("Edit Group-" + groupName + ", Group Notes-"+ groupNotes); 
}


//document ready:
$(document).ready(function(){

  //get userName
  var userName = sessionStorage.getItem('username');

  //set navigation bar
  var setNavigationBar = function(){
    if(userName==null ||userName=="logout"){
      $("#logoutButton").hide();
    }else{
      $("#loginButton").hide();
      $("#signupButton").hide();
      $("#userName").html(userName);
    }};
  setNavigationBar();
  // 
  var i=1;
  var addGroupFunc = function(groupName, groupNotes, groupID){
     $('#addr'+i).html( '<td>'+ i  + '</td>' + 
                        '<td>' + groupName + '</td>' + 
                        '<td>' + groupNotes + '</td>' +
                        '<td> <a onclick="deleteGroup(\''+groupID+'\')" class="btn btn-danger"> <span class="glyphicon glyphicon-trash"></span></a>  '+
                              '<a onclick="editGroup(\''+groupName+'\',\''+groupNotes+'\',\''+groupID+'\')"  class="btn btn-warning"> <span class="glyphicon glyphicon-pencil"></span></a> &nbsp&nbsp' +
                              '<a onclick="goToSendReportPage(\''+groupName+'\',\''+groupNotes+'\',\''+groupID+'\')"  class="btn btn-primary"> <span class="glyphicon glyphicon-file"></span></a>  ' +
                              '<a onclick="goToStudentsPage(\''+groupName+'\',\''+groupNotes+'\',\''+groupID+'\')" class="btn btn-info"> <span class="glyphicon glyphicon-user"></span></a> </td>' );

      $('#tab_logic').append('<tr id="addr'+ (i+1) +'" class="text-center"></tr>');
      i++; };
  var addGroupsFunc = function(data){
     //set all the groups
      var groups = jQuery.parseJSON(data);
      if(groups!=null){
        for (j = 0; j < groups.length; j++) {
           addGroupFunc(groups[j].Name,groups[j].Description,groups[j].Id);
        }
      }};
  
  //add all the groups;
  if(userName!=null){
    sendGetAllGroupsRequest(userName, addGroupsFunc);
  }
 

  //set the add row button - on click
  $("#addGroupForm").submit(function(){
    var groupName  = $("#group_input").val();
    var groupNotes = $("#note_input").val();
    $("#group_input").val("");
    $("#note_input").val("");
    sendAddGroupRequest(groupName,groupNotes,userName, refreshTable);
  });

  //set the logout button - on click
  $("#logoutButton").click( function(){
        sessionStorage.removeItem('username');
  });
  //set the logout button - on click
  $("#cancleEditGroup").click( function(){
      //note
      $("#editGroup").hide();
  });

  //proxy
  //addGroupFunc("group","note");


});