angular.module('pentominoApp')

// The terminal (input / output)
.directive('pentominos', ['dataservice', function(dataservice) {
	return {
		restrict: 'A',
        scope: false,
		templateUrl: 'app/components/pentominos.html',
        link: function($scope) {
            $scope.pentominos = [
                {
                    color : 'purple',
                    face : 0,
                    faces : [
                        [
                            [0,0],[1,0],[2,0],[0,1],[1,1]
                        ],[
                            [0,0],[1,0],[0,1],[1,1],[1,2]
                        ],[
                            [1,0],[2,0],[0,1],[1,1],[2,1]
                        ],[
                            [0,0],[0,1],[1,1],[0,2],[1,2]
                        ],[
                            [0,0],[1,0],[2,0],[1,1],[2,1]
                        ],[
                            [0,0],[1,0],[0,1],[1,1],[0,2]
                        ],[
                            [0,0],[1,0],[0,1],[1,1],[2,1]
                        ],[
                            [1,0],[0,1],[1,1],[0,2],[1,2]
                        ]
                    ],
                    name : 'b',
                    parts : 5,
                    position : {
                        x : 0,
                        y : 1
                    }
                },{
                    color : 'red',
                    face : 0,
                    faces : [
                        [
                            [0,0],[1,0],[2,0],[3,0],[4,0]
                        ],[
                            [0,0],[0,1],[0,2],[0,3],[0,4]
                        ]
                    ],
                    name : 'i',
                    parts : 5,
                    position : {
                        x : 0,
                        y : 0
                    }
                },{
                    color : 'green',
                    face : 0,
                    faces : [
                        [
                            [1,0],[0,1],[1,1],[2,1],[1,2]
                        ]
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
                        [
                            [0,0],[1,0],[0,1],[1,1]
                        ]
                    ],
                    name : 'o',
                    parts : 4,
                    position : {
                        x : 1,
                        y : 3
                    }
                }
            ];
            // $scope.pentominos = dataservice.givePentominos($scope.board.sizeType);

            $scope.methods = {
                getPentominoCss : function (pentomino) {
                    return {
                        'left':$scope.pentominos[pentomino].position.x*$scope.board.partSize+'px',
                        'top' :$scope.pentominos[pentomino].position.y*$scope.board.partSize+'px',
                    }
                },
                flipRotate : function (pentomino,part) {
                    switch (part) {
                        case 0 :
                            console.log('rotate', pentomino);
                            $scope.pentominos[pentomino].face = ($scope.pentominos[pentomino].face + 1) % $scope.pentominos[pentomino].faces.length;
                            break;
                        default:
                    }
                },
                getPartCss : function(pentomino,part) {
                    // console.log(pentomino);
                    p = $scope.pentominos[pentomino];
                    return {
                        'left':p.faces[p.face][part][0]*$scope.board.partSize+'px',
                        'top':p.faces[p.face][part][1]*$scope.board.partSize+'px',
                        'backgroundColor':p.color
                    }
                },
                getFace : function(pentomino){
                    return faces[face];
                }
            }
        },
        controller: function ($scope) {
            console.log($scope);
        }
		// controllerAs: 'settingsCtrl'
	};
}]);
