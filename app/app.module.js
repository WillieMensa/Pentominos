// The keyboard application
var app = angular.module('pentominoApp', []);

// Controller for blocks
app.controller('mainController', ['$scope', 'dataservice', function($scope, dataservice){
    $scope.partSize = 40;
    $scope.boardType = document.querySelector('#board').getAttribute('data-board-size');
    $scope.pentominos = dataservice.givePentominos($scope.boardType);
    $scope.getBoardSize = function() {
        var theStyle;
        switch ($scope.boardType) {
            case '6x10':
                theStyle = {
                    'width':6*$scope.partSize+'px',
                    'height':10*$scope.partSize+'px',
                }
                break;
            default:
                theStyle = {
                    'width':8*$scope.partSize+'px',
                    'height':8*$scope.partSize+'px',
                }
                break;
        }
        return theStyle;
    }
    $scope.getPentominoCss = function(pentomino) {
        // console.log(pentomino);
        return {
            'left':pentomino.position.x*$scope.partSize+'px',
            'top':pentomino.position.y*$scope.partSize+'px',
        }
    }
    $scope.getPartCss = function(pIndex, i) {
        // console.log(pentomino);
        var part = $scope.pentominos[pIndex].faces[$scope.pentominos[pIndex].face];
        return {
            'left':part[i][0]*$scope.partSize+'px',
            'top':part[i][1]*$scope.partSize+'px',
            'backgroundColor':$scope.pentominos[pIndex].color
        }
    }
    $scope.flipRotate = function(pIndex, i) {
        console.log($scope.pentominos[pIndex], i);
        switch (i) {
            case 0 :
                $scope.pentominos[pIndex].face = ($scope.pentominos[pIndex].face + 1) % $scope.pentominos[pIndex].faces.length;
                break;
            default:

        }
        console.log($scope.pentominos);
    }

    console.log($scope.pentominos);
}]);
