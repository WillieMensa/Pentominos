// The keyboard application
var app = angular.module('pentominoApp', ['ngTouch']);

// Controller for blocks
app.controller('mainController', ['$scope', 'dataservice', function($scope, dataservice){

    // $scope.board = {};
    $scope.currentPentomino = null;
    $scope.oPentomino = null;
    $scope.getStartPosition = function () {
        if ($scope.oPentomino) {
            if ($scope.board.brdType == 'square') {
                $scope.pentominos.push($scope.oPentomino);
            } else {
                $scope.oPentomino = $scope.pentominos.pop();
            }
        }
        dataservice.getStartPosition('square').then(function(data) {
            for (var i = 0; i < $scope.pentominos.length; i++) {
                $scope.pentominos[i].face = data[i].face;
                $scope.pentominos[i].position = data[i].position;
            }
        });
    };
    dataservice.getPentominos('square').then(function(data) {
        $scope.pentominos = data;
    });
    dataservice.getColors('square').then(function(data) {
        for (var i = 0; i < $scope.pentominos.length; i++) {
            $scope.pentominos[i].color = data[i].color;
        }
    });
    $scope.getStartPosition();
    $scope.board.registerAllPieces();

}]);
