
var refreshTable = function(){
    //just a note
    window.location.replace("reports.html");
};

var deleteReport = function(groupID,date){
  var owner = sessionStorage.getItem('username');
  sendDeleteReportRequest(groupID, owner, date, refreshTable);
}

//documnet ready
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
      } };
  setNavigationBar();
  //
  var i=1;
  var addReportFunc = function(date, GroupName, Summary, groupId){
     $('#addr'+i).html( '<td>'+ i  + '</td>' + 
                        '<td>' + date + '</td>' + 
                        '<td>' + GroupName + '</td>' +
                        '<td>' + Summary + '</td>' +
                        '<td>  <a onclick="deleteReport(\''+groupId+'\',\''+date+'\')" class="btn btn-danger"> <span class="glyphicon glyphicon-trash"></span></a> ' +
                              '<a class="btn btn-primary"> <span class="glyphicon glyphicon-pencil"></span></a>'
                        );

      $('#tab_logic').append('<tr id="addr'+ (i+1) +'" class="text-center"></tr>');
      i++; 
  };
  var addReportsFunc = function(data){
     //set all the groups
      var reports = jQuery.parseJSON(data);
      if(reports!=null){
        for (j = 0; j < reports.length; j++) {
          //Date, Submitter, GroupId, Summary, GroupName
          //summary = SudentId, Status, Comment, 
           addReportFunc(reports[j].Date, reports[j].GroupName, reports[j].Summary, reports[j].GroupId);  
        }
      }
  };

  //get all reports
  if(userName!=null){
    sendGetAllReportRequest(userName, addReportsFunc);
  }
  //add new report
  $("#add_row").click(function(){

     //sendAddNewReportRequest(userName, GroupId, GroupName, Summary, addReportFunc);
  });
   //log out button
  $("#logoutButton").click( function(){
    //note
    sessionStorage.removeItem('username');
  });

  //proxy data
  // addReportFunc("date",  "groupName", "Summary");

});