
var addStatistic = function(newData){
 // Area Chart  
    Morris.Area({
        element: 'morris-area-chart',
        data: newData,
        xkey: 'period',
        ykeys: ['Present', 'Late', 'Missing'],
        labels: ['Present', 'Late', 'Missing'],
        pointSize: 4,
        hideHover: 'auto',
        resize: true
    });
}


var refreshFunc = function(data){

	// var statistics = jQuery.parseJSON(data);
	
	// var newData = [];

	// // for(j=0; j<statistics.length; j++){
	// //  	var IssueDate = statistics[j].IssueDate;
	// //  	var StudentsPresent = statistics[j].StudentsPresent;
	// //  	var StudentsLate = statistics[j].StudentsLate;
	// //  	var StudentsMissing = statistics[j].StudentsMissing;

	// //  	console.log(IssueDate,StudentsPresent,StudentsLate,StudentsMissing);
	// //  	var date =
	// //  	// if(IssueDate != null){
	// //  	// 	if(IssueDate.split("-")[1] ==  '03' ){
	// //  	// 		date = console.log(IssueDate.split("-")[2])+" Q1";
	// //  	// 	}else if(IssueDate.split("-")[1] == '06'){
	// // 		// 	date = console.log(IssueDate.split("-")[2])+" Q2";
	// //  	// 	}else if(IssueDate.split("-")[1] == '09'){
	// // 		// 	date = console.log(IssueDate.split("-")[2])+" Q3";
	// //  	// 	}else{
	// //  	// 		date = console.log(IssueDate.split("-")[2])+" Q4";
	// //  	// 	}
	// //  	// }

	// //  	console.log("haaaaaaaaaaaaaa",date, StudentsPresent, StudentsLate, StudentsMissing);
	// //  	var oneStatistic = {
	// //  		period: date,
 // //            Present: StudentsPresent,
 // //            Late: StudentsLate,
 // //            Missing: StudentsMissing
	// //  	};

	// //  	newData.push(oneStatistic);
	// // }


	//  	var oneStatistic = {
	//  		 period: '2010 Q1',
 //            Present: 1,
 //            Late: 1,
 //            Missing: 1
	//  	};

	//  	newData.push(oneStatistic);

	//  	var oneStatistic = {
 //            period: '2010 Q2',
 //            Present: 2,
 //            Late: 2,
 //            Missing: 2
	//  	};

	//  	newData.push(oneStatistic);

	//  	var oneStatistic = {
 //            period: '2010 Q3',
 //            Present: 3,
 //            Late: 3,
 //            Missing: 3
	//  	};

	//  	 newData.push(oneStatistic);

	//  	 	 	var oneStatistic = {
 //            period: '2010 Q3',
 //            Present: 3,
 //            Late: 3,
 //            Missing: 3
	//  	};

	//  	 newData.push(oneStatistic);

	//  	 	 	var oneStatistic = {
 //            period: '2011 Q1',
 //            Present: 3,
 //            Late: 1,
 //            Missing: 4
	//  	};

	//  	 newData.push(oneStatistic);

	//  	 	 	var oneStatistic = {
 //            period: '2011 Q2',
 //            Present: 6,
 //            Late: 3,
 //            Missing: 2
	//  	};

	//  	 newData.push(oneStatistic);


	//  	 	 	var oneStatistic = {
 //            period: '2011 Q3',
 //            Present: 9,
 //            Late: 2,
 //            Missing: 1
	//  	};

	//  	 newData.push(oneStatistic);


	//  	 	 	var oneStatistic = {
 //            period: '2011 Q4',
 //            Present: 10,
 //            Late: 13,
 //            Missing: 12
	//  	};

	//  	 newData.push(oneStatistic);


	// addStatistic(newData)
}




$(document).ready(function(){
	//sessionStorage.setItem('username',"victor");
	//sessionStorage.removeItem('username');

	var userName = sessionStorage.getItem('username');

	if(userName==null ||userName=="logout"){
		$("#logoutButton").hide();
	}else{
		$("#loginButton").hide();
		$("#signupButton").hide();
		$("#userName").html(userName);

		// $("#title").html("Welcome back, " + userName);
		// $("#subtitle").hide();
	}
	
	$("#logoutButton").click( function(){
		sessionStorage.removeItem('username');
	});

	if(userName!=null)
		sendGetAllStatistics(userName,refreshFunc);

	

});



