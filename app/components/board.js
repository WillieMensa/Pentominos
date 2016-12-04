angular.module('pentominoApp')

// The terminal (input / output)
.directive('board', [function() {
	return {
		restrict: 'A',
        scope: false,
		templateUrl: 'app/components/board.html',
        link: function($scope) {
            $scope.board = {
                fields : [],
                partSize : 40,
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
                solved : false,
                width : function() {
                    return $scope.board.brdTypes[$scope.board.brdType].w;
                },
                height : function() {
                    return $scope.board.brdTypes[$scope.board.brdType].h;
                },
                onBoard : function(x,y) {
                    return (x >= 0) && (x < this.width()) &&
                        (y >= 0) && (y < this.height());
                },
                theBoardCss : function () {
                    return {
                        'width':this.width()*this.partSize+'px',
                        'height':this.height()*this.partSize+'px'
                    }
                },
                setBoardFields : function() {
                    var w = $scope.board.width();
                    var h = $scope.board.height();
                    $scope.board.fields = [];
                    for (var y = 0; y < h; y++) {
                        $scope.board.fields.push([]);
                        for (var x = 0; x < w; x++) {
                            $scope.board.fields[y].push(0);
                        }
                    };
                },
                registerPiece : function(pentomino,onOff) {
                    var x, y;
                    for (var i = 0; i < pentomino.faces[pentomino.face].length; i++) {
                        x = pentomino.faces[pentomino.face][i][0]+pentomino.position.x;
                        y = pentomino.faces[pentomino.face][i][1]+pentomino.position.y;
                        if (this.onBoard(x,y)) {
                            this.fields[y][x] += onOff;
                        }

                    }
                },
                registerAllPieces : function() {
                    for (var i = 0; i < $scope.pentominos.length; i++) {
                        this.registerPiece($scope.pentominos[i],1);
                    }
                },
                isSolved : function() {
                    var solved = true;
                    for (var y = 0; y < $scope.board.height(); y++) {
                        for (var x = 0; x < $scope.board.width(); x++) {
                            solved = ($scope.board.fields[y][x] == 1) && solved;
                            if (!solved) {
                                break;
                            }
                        }
                    }
                    this.solved = solved;
                    if (solved) $scope.saveSolution();
                },
                cleanBoard : function() {
                    var w = $scope.board.width();
                    var h = $scope.board.height();
                    $scope.board.solved = false;
                    $scope.board.fields = [];
                    for (var y = 0; y < h; y++) {
                        $scope.board.fields.push([]);
                        for (var x = 0; x < w; x++) {
                            $scope.board.fields[y].push(0);
                        }
                    };
                }
            };
        },
		controllerAs: 'boardCtrl'
	};
}]);
