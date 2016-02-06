(function(){
	var app=angular.module('myapp',[]);
	
	app.controller('AppCtrl',['$http',function($http){
		console.log('hello from controller.js');
		var list=this;
		
		var refresh = function(){
		$http.get('/appointmentlist').success(function(response){
			console.log("I got the data i requested");
			list.appointments=response;
			list.appointment="";
		});
		};
		
		refresh();
		
		var list=this;
		list.addAppointment = function() {
			console.log(this.appointment);
			console.log('in add appointment');
			$http.post('/appointmentlist',this.appointment).success(function(response){
				console.log(response);
				refresh();
			});
		};
		
		var list=this;
		list.remove = function(id){
			console.log(id);
			$http.delete('/appointmentlist/'+id).success(function(response){
				refresh();
			});
		};
		
		var list=this;
		list.edit=function(id){
			console.log(id);
			$http.get('/appointmentlist/'+id).success(function(response){
				list.appointment=response;
			});
		};
		
		var list=this;
		list.update=function(){
			console.log(list.appointment._id);
			$http.put('/appointmentlist/'+list.appointment._id,list.appointment).success(function(response){
				refresh();
			});
		};
		
		var list=this;
		list.deselect=function(){
			list.appointment="";
		}
		
	}]);
	
	})() ;