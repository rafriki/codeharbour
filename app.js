angular
	.module('chatApp', ['ngRoute', 'firebase'])
	.config(routeConfig)
	.controller('homeCtrl', homeCtrl)
	.controller('chatCtrl', chatCtrl)
	.factory('Attendees', Attendees);

function routeConfig ($routeProvider) {
	$routeProvider
		.when('/', {
			controller: 'homeCtrl',
			controllerAs: 'vm',
			templateUrl: 'templates/home.html',
			resolve: {
				people: function (Attendees){
					return Attendees;
				}
			}
		})
		.when('/chat/:user', {
			controller: 'chatCtrl',
			controllerAs: 'vm',
			templateUrl: 'templates/chat.html',
			resolve: {
				user: function ($route){
					return $route.current.params.user;
				}
			}
		});
}

function homeCtrl (people){
	this.users = people.data.results.collection1;
}

function chatCtrl(user, $firebaseArray){

	var vm = this;
	var ref = new Firebase("https://codeharbour.firebaseio.com/comments");

	vm.user = user;

	vm.comments = $firebaseArray(ref);

	vm.addComment = addComment;

	function addComment () {

		vm.comments.$add({
			author: vm.user,
			body: vm.comment,
			timestamp: Firebase.ServerValue.TIMESTAMP
		});

		vm.comment = '';
	}

}

function Attendees($http){
	var endpoint = 'https://www.kimonolabs.com/api/3oypcdao?apikey=46b2db81b154f04b23d73aa566f54653';

	return $http.get(endpoint)
		.then(function(res){
			return res;
		});
}