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
                newSolution : false,
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
                theHeaderCss : function () {
                    return {
                        'width':this.width()*this.partSize+'px'
                    };
                },
                theBoardCss : function () {
                    return {
                        'width':this.width()*this.partSize+'px',
                        'height':this.height()*this.partSize+'px'
                    };
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
                    }
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
                registerPieces : function () {
                    $scope.board.cleanBoard();
                    $scope.board.registerAllPieces();
                },
                boardIsFull : function() {
                    for (var y = 0; y < $scope.board.height(); y++) {
                        for (var x = 0; x < $scope.board.width(); x++) {
                            if ($scope.board.fields[y][x] !== 1) {
                                return false;
                            }
                        }
                    }
                    return true;
                },
                pentomino2string : function (pentomino) {
                    if (pentomino) {
                        return '#' + pentomino.name + pentomino.face + pentomino.position.x + pentomino.position.y;
                    } else {
                        return 'false';
                    }
                },
                solution2String : function () {
                    var solution = $scope.pentominos;
                    var solutionString = "";
                    var theLength = $scope.methods.pentominosLength();
                    for (var i = 0; i < theLength; i++) {
                        solutionString += $scope.board.pentomino2string(solution[i]);
                    }
                    return solutionString;
                },
                isNewSolution : function() {
                    var solutionString;
                    var isNewSolution = true;
                    var theLength = $scope.methods.pentominosLength();
                    var rotations = ($scope.board.brdType == 'square')? 4 : 2;
                    for (var flip = 0; flip < 2; flip++) {
                        for (var rotation = 0; rotation < rotations; rotation++) {
                            for (var i = 0; i < $scope.solutions[$scope.board.brdType].length; i++) {
                                solutionString = $scope.board.solution2String();
                                isNewSolution = isNewSolution && (solutions[$scope.board.brdType][i] !== solutionString);
                                if (!isNewSolution) return i;
                            }
                            $scope.methods.rotateBoard();
                        }
                        $scope.methods.flipBoardYAxis();
                    }
                    return solutionString;
                },
                isSolved : function() {
                    var boardIsFull = $scope.board.boardIsFull();
                    var solutionResult;
                    if (boardIsFull) {
                        solutionResult = $scope.board.isNewSolution();
                        this.solved = boardIsFull;
                        if (!isNaN(solutionResult)) {
                            $scope.currentSolution = solutionResult;
                            this.newSolution = false;
                        } else {
                            $scope.saveSolution(solutionResult);
                            $scope.solutions[$scope.board.brdType].push(solutionResult);
                            this.newSolution = true;
                        }
                    } else {
                        this.solved = false;
                    }
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
                    }
                }
            };
        }
	};
}]);
