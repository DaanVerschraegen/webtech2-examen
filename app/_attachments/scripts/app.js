'use strict'

angular.module('movieApp', ['ngRoute'])

.config(function($routeProvider) {
	$routeProvider
		.when('/home', {
				templateUrl: 'assets/views/home.html',
                controller: 'homeCtrl'
		});
})
.controller('homeCtrl', function ($scope, filmSrv) {
    	
	$('#searchButton').on('click', function(e){
		
		$scope.films = '';
		var acteur = $('#acteurText').val();
		filmSrv.getFilmography(acteur).then(function(data){
			$scope.films = data;
			console.log($scope.films);
			opslaan();
		});
	});
})
.service('filmSrv', function($http, $q){
	
	this.getFilmography = function(acteur){
		
		var q = $q.defer();
		var url = 'http://theimdbapi.org/api/find/person?name=' + encodeURIComponent(acteur);
		console.log(url);
		$http.get(url).then(function(data){
			console.log(data.data[0].filmography);
			q.resolve(data.data[0].filmography);
		}, function error(err){
			console.log(err);
			q.reject(err);
		});
		
		return q.promise;
	};
});
function opslaan(){
	
	var acteur = $("#acteur").val();
	var filmography = $("#filmography").val();
	var doc = {};
	
	doc.acteur = acteur;
	doc.filmography = filmography;
	var json = JSON.stringify(doc);
	console.log(json);
	
	$.ajax({
		type:			'PUT',
		url:				'../../' + acteur,
		data:			json,
		contentType: 	'application/json',
		async:			true,
		success:		function(data){

		},
		error:		function(XMLHttpRequest, textStatus, errorThrown){
			console.log(errorThrown); 
		}
	});
}