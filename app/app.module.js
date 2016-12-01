// The keyboard application
var app = angular.module('pentominoApp', ['ngTouch']);

// Controller for blocks
app.controller('mainController', ['$scope', 'dataservice', function($scope, dataservice){

    $scope.board = {};
    $scope.board.brdType = 'square';
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
        dataservice.getStartPosition($scope.board.brdType).then(function(data) {
            for (var i = 0; i < $scope.pentominos.length; i++) {
                $scope.pentominos[i].face = data[i].face;
                $scope.pentominos[i].position = data[i].position;
            }
            $scope.oPentomino = $scope.pentominos[12];
        }).then(function() {
            // $scope.board.cleanBoard();
            // $scope.board.registerAllPieces();
            console.log($scope.pentominos);
        });
    };
    dataservice.getPentominos($scope.board.brdType).then(function(data) {
        $scope.pentominos = data;
        $scope.getStartPosition();
    });
    dataservice.getColors($scope.board.brdType).then(function(data) {
        for (var i = 0; i < $scope.pentominos.length; i++) {
            $scope.pentominos[i].color = data[i].color;
        }
    });

}]);
