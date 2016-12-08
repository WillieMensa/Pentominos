// The keyboard application
var app = angular.module('pentominoApp', ['ngTouch']);

// Controller for blocks
app.controller('mainController', ['$scope', '$timeout', 'dataservice', function($scope, $timeout, dataservice){

    // $scope.board = {};
    // $scope.board.brdType = 'square';
    $scope.pentominos = {};
    $scope.solutions = dataservice.getSolutions();
    $scope.currentSolution = 0;
    $scope.currentPentomino = null;
    $scope.saveSolution = function () {
        return dataservice.saveSolution($scope.board.brdType, $scope.pentominos);
    }
    $scope.getStartPosition = function (brdType) {
        $scope.board.brdType = (brdType) ? brdType : $scope.board.brdType;
        var boardType = $scope.board.brdType;
        var pentomino;
        dataservice.getStartPosition(boardType).then(function(data) {
            if ($scope.pentominos) {
                for (var i = 0; i < $scope.pentominos.length; i++) {
                    pentomino = $scope.pentominos[i];
                    pentomino.face = data[i].face;
                    pentomino.position = angular.copy(data[i].position);
                    if (!pentomino.initialDimensions) {
                        pentomino.initialDimensions = angular.copy(pentomino.dimensions);
                    } else {
                        pentomino.dimensions = angular.copy(pentomino.initialDimensions);
                    }
                    $scope.methods.adjustDimensions(pentomino);
                }
            }
            $scope.methods.registerPieces();
            $scope.currentSolution = 0;
        });
    }
    dataservice.getPentominos().then(function(data) {
        $scope.pentominos = data;
        dataservice.getColors().then(function(data) {
            for (var i = 0; i < $scope.pentominos.length; i++) {
                $scope.pentominos[i].color = data[i].color;
            }
            $scope.getStartPosition();
            $scope.solutions = dataservice.getSolutions();
        });
    });

}]);
