// MODULE
var moviePosterApp = angular.module('moviePosterApp', ['ngRoute', 'ngResource']);

// ROUTES
moviePosterApp.config(function ($routeProvider) {
   
    $routeProvider
    
    .when('/', {
        templateUrl: 'pages/home.htm',
        controller: 'homeController'
    })
    
    .when('/search', {
        templateUrl: 'pages/moviePanel.htm',
        controller: 'movieController'
    })
    
    
});

// SERVICES
moviePosterApp.service('movieService', function() {
   
    this.movie = "";
    
});

// CONTROLLERS
moviePosterApp.controller('homeController', ['$scope', 'movieService', function($scope, movieService) {
    
    $scope.movie = movieService.movie;
    $scope.$watch('movie', function() {
       movieService.movie = $scope.movie; 
    });
    
}]);

moviePosterApp.controller('movieController', ['$scope', '$resource', 'movieService', function($scope, $resource,  movieService) {
    
    $scope.movie = movieService.movie;
    $scope.api_key = 'f2c99cf74ee4c4214605f5ac1bc00fc6';
    $scope.imagePath = 'http://image.tmdb.org/t/p/w500';
    $scope.movieAPI = $resource("https://api.themoviedb.org/3/search/movie", { callback: "JSON_CALLBACK" }, { get: { method: "JSONP" }});
    
    $scope.movieResult = $scope.movieAPI.get({ query: $scope.movie, api_key: $scope.api_key });
    
    
}]);
