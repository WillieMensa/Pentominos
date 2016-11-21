// The keyboard application
var app = angular.module('pentominoApp', []);

// Controller for blocks
app.controller('mainController', ['$scope', 'dataservice', function($scope, dataservice){

    $scope.board = {};
    $scope.methods = {};
    dataservice.givePentominos($scope.board.sizeType).then(function(data) {
        $scope.pentominos = data;
        console.log(data);
    });

}]);
