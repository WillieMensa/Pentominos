// The keyboard application
var app = angular.module('pentominoApp', ['ngTouch']);

// Controller for blocks
app.controller('mainController', ['$scope', '$timeout', 'dataservice', function($scope, $timeout, dataservice){

    // $scope.board = {};
    // $scope.board.brdType = 'square';
    $scope.pentominos = {};
    $scope.solutions = dataservice.getSolutions();
    $scope.currentPentomino = null;
    $scope.saveSolution = function () {
        $scope.solutions[$scope.board.brdType].push(dataservice.saveSolution($scope.board.brdType, $scope.pentominos));
    }
    $scope.getStartPosition = function (brdType) {
        $scope.board.brdType = (brdType) ? brdType : $scope.board.brdType;
        var boardType = $scope.board.brdType;
        dataservice.getStartPosition(boardType).then(function(data) {
            if ($scope.pentominos) {
                for (var i = 0; i < $scope.pentominos.length; i++) {
                    $scope.pentominos[i].face = data[i].face;
                    $scope.pentominos[i].position = angular.copy(data[i].position);
                }
            }
            $scope.methods.registerPieces();
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
