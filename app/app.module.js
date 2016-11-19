// The keyboard application
var app = angular.module('pentominoApp', []);

// Controller for blocks
app.controller('mainController', ['$scope', 'dataservice', function($scope, dataservice){
    $scope.board = {
        partSize : 40,
        sizeType : document.querySelector('#board').getAttribute('data-board-size'),
        brdType : 'square',
        brdTypes : {
            'square' : {
                w : 8,
                h : 8
            },
            'rectangle' : {
                w : 6,
                h : 10
            }
        },
        theBoardCss : function () {
            return{
                'width':this.brdTypes[this.brdType].w*this.partSize+'px',
                'height':this.brdTypes[this.brdType].h*this.partSize+'px'
            }
        }
    };

    $scope.pentominos = dataservice.givePentominos($scope.board.sizeType);
    $scope.getPentominoCss = function(pentomino) {
        // console.log(pentomino);
        return {
            'left':pentomino.position.x*$scope.board.partSize+'px',
            'top':pentomino.position.y*$scope.board.partSize+'px',
        }
    }
    $scope.getPartCss = function(part,pIndex) {
        // console.log(pentomino);
        return {
            'left':part[0]*$scope.board.partSize+'px',
            'top':part[1]*$scope.board.partSize+'px',
            'backgroundColor':$scope.pentominos[pIndex].color
        }
    }
    $scope.flipRotate = function(pIndex, i) {
        console.log($scope.pentominos[pIndex], i);
        switch (i) {
            case 0 :
                console.log('rotate', pIndex);
                $scope.pentominos[pIndex].face = ($scope.pentominos[pIndex].face + 1) % $scope.pentominos[pIndex].faces.length;
                break;
            default:

        }
        console.log($scope.pentominos[pIndex]);
    }

    console.log($scope.pentominos);
}]);
