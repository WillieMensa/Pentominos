// The keyboard application
var app = angular.module('pentominoApp', ['ngTouch']);

// Controller for blocks
app.controller('mainController', ['$scope', '$timeout', 'dataservice', function($scope, $timeout, dataservice){


    $scope.board = {};
    $scope.currentPentomino = null;

}]);
