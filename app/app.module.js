// The keyboard application
var app = angular.module('pentominoApp', []);

// Controller for blocks
app.controller('mainController', ['$scope', 'dataservice', function($scope, dataservice){
    $scope.partSize = 40;
    $scope.pentominos = dataservice.givePentominos('8x8');

    console.log($scope.pentominos);
}]);
