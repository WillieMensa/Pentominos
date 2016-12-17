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
                registerPiece : function(i,onOff) {
                    var x, y;
                    var pentomino = $scope.pentominos[i];
                    for (var j = 0; j < pentomino.faces[pentomino.face].length; j++) {
                        console.log(pentomino.name);
                        x = pentomino.faces[pentomino.face][j][0]+pentomino.position.x;
                        y = pentomino.faces[pentomino.face][j][1]+pentomino.position.y;
                        if (this.onBoard(x,y)) {
                            this.fields[y][x] += onOff;
                        }

                    }
                },
                registerAllPieces : function() {
                    for (var i = 0; i < $scope.pentominos.length; i++) {
                        this.registerPiece(i,1);
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
                },
                isFitting : function () {
                    console.log('fit');
                    return false;
                },
                findNextFit : function () {
                    console.log('findNextFit');
                    var theLength = $scope.methods.pentominosLength();
                    var boardWidth = $scope.board.width();
                    var boardHeight = $scope.board.height();
                    var pentomino;
                    for (var y = 0; y < boardHeight; i++) {
                        for (var x = 0; x < boardWidth; x++) {
                            for (var i = 0; i < theLength; i++) {
                                pentomino = $scope.pentominos[i];
                                for (var face = 0; face < pentomino.faces.length; face++) {
                                    $scope.methods.adjustDimensions(pentomino);
                                    $scope.methods.move(i,[x,y]);
                                    pentomino.onBoard = true;
                                    $scope.board.registerPiece(i,1);
                                    $scope.$applyAsync();
                                    if ($scope.board.isFitting()) {
                                        $scope.board.findNextFit();
                                    } else {

                                    }
                                }
                            }
                        }

                    }
                },
                autoSolve : function () {
                    // The x block can only have these 5 unique positions and it can't rotate
                    var startPositionsXblock = {
                        'square' : [[1,0],[1,1],[2,0],[2,1],[2,2]],
                        'rectangle' : [[1,0],[0,1],[1,1],[0,2],[1,2],[0,3],[1,3]],
                    };
                    var boardType = $scope.board.brdType;
                    var pentomino = $scope.pentominos[9];
                    $scope.settings.menuVisible = false;
                    $scope.methods.clearBoard();
                    $scope.pentominos[9].onBoard = true;
                    for (var i = 0; i < startPositionsXblock[boardType].length; i++) {
                        $scope.methods.move(i,startPositionsXblock[boardType][i]);
                        // $scope.board.registerPiece(i,-1);
                        // $scope.methods.setPosition(9,startPositionsXblock[boardType][i]);
                        // $scope.board.registerPiece(i,1);
                        $scope.board.findNextFit();
                    }
                    // console.table($scope.board.fields);
                }
            };
        }
	};
}]);
