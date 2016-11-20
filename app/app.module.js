// The keyboard application
var app = angular.module('pentominoApp', []);

// Controller for blocks
app.controller('mainController', ['$scope', 'dataservice', function($scope, dataservice){

    $scope.board = {};
    // $scope.pentominos = {};
    $scope.pentominos = [
        {
            color : 'purple',
            face : 0,
            faces : [
                [[0,0],[1,0],[2,0],[0,1],[1,1]],
                [[0,0],[1,0],[0,1],[1,1],[1,2]],
                [[1,0],[2,0],[0,1],[1,1],[2,1]],
                [[0,0],[0,1],[1,1],[0,2],[1,2]],
                [[0,0],[1,0],[2,0],[1,1],[2,1]],
                [[0,0],[1,0],[0,1],[1,1],[0,2]],
                [[0,0],[1,0],[0,1],[1,1],[2,1]],
                [[1,0],[0,1],[1,1],[0,2],[1,2]]
            ],
            name : 'b',
            parts : 5,
            position : {
                x : 0,
                y : 1
            }
        },{
            color : 'brown',
            face : 2,
            faces : [
                [[0,0],[1,0],[0,1],[0,2],[1,2]],
                [[0,0],[1,0],[2,0],[0,1],[2,1]],
                [[0,0],[1,0],[1,1],[0,2],[1,2]],
                [[0,0],[2,0],[0,1],[1,1],[2,1]]
            ],
            name : 'c',
            parts : 5,
            position : {
                x : 4,
                y : 1
            }
        },{
            color : 'red',
            face : 0,
            faces : [
                [[0,0],[1,0],[2,0],[3,0],[4,0]],
                [[0,0],[0,1],[0,2],[0,3],[0,4]]
            ],
            name : 'i',
            parts : 5,
            position : {
                x : 0,
                y : 0
            }
        },{
            color : 'yellow',
            face : 0,
            faces : [
                [[0,0],[1,0],[2,0],[1,1],[1,2]],
                [[2,0],[0,1],[1,1],[2,1],[2,2]],
                [[0,2],[1,0],[2,2],[1,1],[1,2]],
                [[0,0],[0,1],[1,1],[2,1],[0,2]]
            ],
            name : 't',
            parts : 5,
            position : {
                x : 5,
                y : 0
            }
        },{
            color : 'green',
            face : 0,
            faces : [
                [[1,0],[0,1],[1,1],[2,1],[1,2]]
            ],
            name : 'x',
            parts : 5,
            position : {
                x : 2,
                y : 1
            }
        },{
            color : 'blue',
            face : 0,
            faces : [
                [[0,0],[1,0],[0,1],[1,1]]
            ],
            name : 'o',
            parts : 4,
            position : {
                x : 1,
                y : 3
            }
        }
    ];
    $scope.methods = {};
    // $scope.pentominos = dataservice.givePentominos($scope.board.sizeType);

}]);
