// The keyboard application
var app = angular.module('pentominoApp', []);

// Controller for blocks
app.controller('mainController', ['$scope', 'dataservice', function($scope, dataservice){

    $scope.board = {};
    // $scope.pentominos = {};
    $scope.pentominos = [
        {
            name : 'b',
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
            parts : 5,
            position : {
                x : 0,
                y : 1
            },
            drag : false
        },{
            name : 'c',
            color : 'brown',
            face : 2,
            faces : [
                [[0,0],[1,0],[0,1],[0,2],[1,2]],
                [[0,0],[1,0],[2,0],[0,1],[2,1]],
                [[0,0],[1,0],[1,1],[0,2],[1,2]],
                [[0,0],[2,0],[0,1],[1,1],[2,1]]
            ],
            parts : 5,
            position : {
                x : 4,
                y : 1
            },
            drag : false
        },{
            name : 'i',
            color : 'red',
            face : 0,
            faces : [
                [[0,0],[1,0],[2,0],[3,0],[4,0]],
                [[0,0],[0,1],[0,2],[0,3],[0,4]]
            ],
            parts : 5,
            position : {
                x : 0,
                y : 0
            },
            drag : false
        },{
            name : 't',
            color : 'yellow',
            face : 0,
            faces : [
                [[0,0],[1,0],[2,0],[1,1],[1,2]],
                [[2,0],[0,1],[1,1],[2,1],[2,2]],
                [[0,2],[1,0],[2,2],[1,1],[1,2]],
                [[0,0],[0,1],[1,1],[2,1],[0,2]]
            ],
            parts : 5,
            position : {
                x : 5,
                y : 0
            },
            drag : false
        },{
            name : 'x',
            color : 'green',
            face : 0,
            faces : [
                [[1,0],[0,1],[1,1],[2,1],[1,2]]
            ],
            parts : 5,
            position : {
                x : 2,
                y : 1
            },
            drag : false
        },{
            name : 'y',
            color : 'teal',
            face : 2,
            faces : [
                [[0,0],[0,1],[1,1],[0,2],[0,3]],
                [[0,0],[1,0],[2,0],[3,0],[2,1]],
                [[0,2],[1,0],[1,1],[1,2],[1,3]],
                [[1,0],[0,1],[1,1],[2,1],[3,1]],
                [[0,1],[1,0],[1,1],[1,2],[1,3]],
                [[2,0],[0,1],[1,1],[2,1],[3,1]],
                [[0,0],[0,1],[0,2],[1,2],[0,3]],
                [[0,0],[1,0],[2,0],[3,0],[1,1]]
            ],
            parts : 5,
            position : {
                x : 6,
                y : 1
            },
            drag : false
        },{
            name : 'o',
            color : 'blue',
            face : 0,
            faces : [
                [[0,0],[1,0],[0,1],[1,1]]
            ],
            parts : 4,
            position : {
                x : 1,
                y : 3
            },
            drag : false
        }
    ];
    $scope.methods = {};
    // $scope.pentominos = dataservice.givePentominos($scope.board.sizeType);

}]);
