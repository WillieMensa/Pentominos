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
                    return this.brdTypes[this.brdType].w;
                },
                height : function() {
                    return this.brdTypes[this.brdType].h;
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
                    var w = this.width();
                    var h = this.height();
                    this.fields = [];
                    for (var y = 0; y < h; y++) {
                        this.fields.push([]);
                        for (var x = 0; x < w; x++) {
                            this.fields[y].push(0);
                        }
                    }
                },
                registerPiece : function(i,onOff) {
                    var x, y;
                    var pentomino = $scope.pentominos[i];
                    // console.log(pentomino.name);
                    for (var j = 0; j < pentomino.faces[pentomino.face].length; j++) {
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
                    this.solved = false;
                    this.fields = this.cleanBoard(0);
                    this.registerAllPieces();
                },
                boardIsFull : function() {
                    for (var y = 0; y < this.height(); y++) {
                        for (var x = 0; x < this.width(); x++) {
                            if (this.fields[y][x] !== 1) {
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
                        solutionString += this.pentomino2string(solution[i]);
                    }
                    return solutionString;
                },
                isNewSolution : function() {
                    var solutionString;
                    var isNewSolution = true;
                    var theLength = $scope.methods.pentominosLength();
                    var rotations = (this.brdType == 'square')? 4 : 2;
                    for (var flip = 0; flip < 2; flip++) {
                        for (var rotation = 0; rotation < rotations; rotation++) {
                            for (var i = 0; i < $scope.solutions[this.brdType].length; i++) {
                                solutionString = this.solution2String();
                                isNewSolution = isNewSolution && (solutions[this.brdType][i] !== solutionString);
                                if (!isNewSolution) return i;
                            }
                            $scope.methods.rotateBoard();
                        }
                        $scope.methods.flipBoardYAxis();
                    }
                    return solutionString;
                },
                isSolved : function() {
                    var boardIsFull = this.boardIsFull();
                    var solutionResult;
                    if (boardIsFull) {
                        solutionResult = this.isNewSolution();
                        this.solved = boardIsFull;
                        if (!isNaN(solutionResult)) {
                            $scope.currentSolution = solutionResult;
                            this.newSolution = false;
                        } else {
                            $scope.saveSolution(solutionResult);
                            $scope.solutions[this.brdType].push(solutionResult);
                            this.newSolution = true;
                        }
                    } else {
                        this.solved = false;
                    }
                },
                cleanBoard : function(content) {
                    var w = this.width();
                    var h = this.height();
                    var fields = [];
                    for (var y = 0; y < h; y++) {
                        fields.push([]);
                        for (var x = 0; x < w; x++) {
                            fields[y].push(content);
                        }
                    }
                    return fields;
                },
                findFirstEmpty : function () {
                    // lijkt op boardIsFull()
                    var w = this.width();
                    var h = this.height();
                    var x,y;
                    for (y = 0; y < h; y++) {
                        for (x = 0; x < w; x++) {
                            if (this.fields[y][x] === 0) return [x,y];
                        }
                    }
                    return false;
                },
                // Return true if no overlapping pieces and pieces are completely on the board
                isFitting : function () {
                    var sum = 0;
                    for (var y = 0; y < this.fields.length; y++) {
                        for (var x = 0; x < this.fields[y].length; x++) {
                            if (this.fields[y][x] > 1) {
                                return false;
                            } else {
                                sum += this.fields[y][x];
                            }
                        }
                    }
                    if ($scope.pentominos[12].onBoard === true) {
                        return ((sum - 4) % 5 === 0);
                    } else {
                        return (sum % 5 === 0);
                    }
                },
                logBoard : function () {
                    var board = [];
                    var w = this.width();
                    var h = this.height();
                    var pentomino;
                    var x,y;
                    board = this.cleanBoard(' ');
                    for (var i = 0; i < $scope.pentominos.length; i++) {
                        pentomino = $scope.pentominos[i];
                        for (var j = 0; j < pentomino.faces[pentomino.face].length; j++) {
                            x = pentomino.position.x + pentomino.faces[pentomino.face][j][0];
                            y = pentomino.position.y + pentomino.faces[pentomino.face][j][1];
                            if (this.onBoard(x,y)) {
                                board[y][x] = pentomino.name;
                            }
                        }
                    }
                    console.table(board);
                },
                findNextFit : function () {
                    console.clear();
                    console.log('findNextFit');
                    var firstEmpty = this.findFirstEmpty();
                    var exit = false;
                    if (firstEmpty && !exit) {
                        var theLength = $scope.methods.pentominosLength();
                        var boardWidth = this.width();
                        var boardHeight = this.height();
                        var pentomino;
                        for (var i = 0; i < theLength; i++) {
                            pentomino = $scope.pentominos[i];
                            if (!pentomino.onBoard) {
                                pentomino.onBoard = true;
                                for (var face = 0; face < pentomino.faces.length; face++) {
                                    $scope.methods.movePentomino(i,[0,this.height() + 1]);
                                    pentomino.face = face;
                                    $scope.methods.adjustDimensions(i);
                                    $scope.methods.movePentomino(i,firstEmpty);
                                    console.log(pentomino.name);
                                    // $scope.$applyAsync();
                                    if (this.isFitting()) {
                                        this.logBoard();
                                        this.findNextFit();
                                        this.logBoard();
                                        console.log('back');
                                        // $scope.methods.movePentomino(i,[0,this.height() + 1]);
                                    } else {
                                        // $scope.$apply();
                                    }
                                }
                                $scope.methods.movePentomino(i,[0,this.height() + 1]);
                                pentomino.onBoard = false;
                            }
                        }
                    } else {
                        exit = true;
                        console.log('boardIsFull');
                    }

                },
                autoSolve : function () {
                    // The x block can only have these 5 unique positions and it can't rotate
                    var startPositionsXblock = {
                        'square' : [[1,0],[1,1],[2,0],[2,1],[2,2]],
                        'rectangle' : [[1,0],[0,1],[1,1],[0,2],[1,2],[0,3],[1,3]],
                    };
                    var boardType = this.brdType;
                    var pentomino = $scope.pentominos[9];
                    $scope.settings.menuVisible = false;
                    $scope.methods.clearBoard();
                    // $scope.$applyAsync();
                    $scope.pentominos[9].onBoard = true;
                    for (var i = 0; i < startPositionsXblock[boardType].length; i++) {
                        $scope.methods.movePentomino(9,startPositionsXblock[boardType][i]);
                        this.findNextFit();
                    }
                    // console.table(this.fields);
                }
            };
        }
	};
}]);
