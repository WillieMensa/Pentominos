// The keyboard application
var app = angular.module('pentominoApp', []);

// Controller for blocks
app.controller('mainController', ['$scope', 'dataservice', function($scope, dataservice){

    $scope.board = {};
    $scope.pentominos = {};
    $scope.methods = {};
    // $scope.pentominos = dataservice.givePentominos($scope.board.sizeType);

}]);
