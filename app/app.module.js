// The keyboard application
var app = angular.module('pentominoApp', ['ngTouch']);

// Controller for blocks
app.controller('mainController', ['$scope', 'dataservice', function($scope, dataservice){

    // $scope.board = {};
    // $scope.board.brdType = 'square';
    $scope.currentPentomino = null;
    $scope.getStartPosition = function (boardType) {
        dataservice.getStartPosition(boardType).then(function(data) {
            for (var i = 0; i < $scope.pentominos.length; i++) {
                $scope.pentominos[i].face = data[i].face;
                $scope.pentominos[i].position = angular.copy(data[i].position);
            }
        }).then(function() {
            // $scope.board.cleanBoard();
            // $scope.board.registerAllPieces();
            console.log($scope.pentominos);
        });
    };
    dataservice.getPentominos().then(function(data) {
        $scope.pentominos = data;
        $scope.getStartPosition();
    });
    dataservice.getColors().then(function(data) {
        for (var i = 0; i < $scope.pentominos.length; i++) {
            $scope.pentominos[i].color = data[i].color;
        }
    });

}]);
