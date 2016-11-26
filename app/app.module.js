// The keyboard application
var app = angular.module('pentominoApp', []);

// Controller for blocks
app.controller('mainController', ['$scope', 'dataservice', function($scope, dataservice){

    $scope.board = {};
    $scope.currentPentomino = null;
    dataservice.getPentominos($scope.board.sizeType).then(function(data) {
        $scope.pentominos = data;
    });
    dataservice.getColors($scope.board.sizeType).then(function(data) {
        for (var i = 0; i < $scope.pentominos.length; i++) {
            $scope.pentominos[i].color = data[i].color;
        }
    });
    dataservice.getStartPosition($scope.board.sizeType).then(function(data) {
        for (var i = 0; i < $scope.pentominos.length; i++) {
            $scope.pentominos[i].face = data[i].face;
            $scope.pentominos[i].position = data[i].position;
        }
        console.log(data);
    });

}]);
