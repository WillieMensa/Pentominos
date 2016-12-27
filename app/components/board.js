angular.module('pentominoApp')

// The terminal (input / output)
.directive('board', ['$timeout', function($timeout) {
	return {
		restrict: 'A',
        scope: false,
		templateUrl: 'app/components/board.html',
        link: function($scope) {
            $scope.board = {
                self : this,
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
                positionsTried : 0,
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
                    if (pentomino && pentomino.faces) {
                        for (var j = 0; j < pentomino.faces[pentomino.face].length; j++) {
                            x = pentomino.faces[pentomino.face][j][0]+pentomino.position.x;
                            y = pentomino.faces[pentomino.face][j][1]+pentomino.position.y;
                            if (this.onBoard(x,y)) {
                                this.fields[y][x] += onOff;
                            }

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
                    var solutionString = this.solution2String();
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
                isHole : function (xy) {
                    var holeSize = 0;
                    var minHoleSize = ($scope.pentominos[12].onBoard || this.brdType === 'rectangle') ? 5 : 4;
                    var w = this.width();
                    var h = this.height();
                    var label = 'a';
                    var board = angular.copy(this.fields);
                    // var x = xy[0];
                    var y = xy[1];
                    function countDown(xy) {
                        var y = xy[1];
                        while ((y < h) && (board[y][xy[0]] === 0) && (holeSize < minHoleSize)) {
                            board[y][xy[0]] = label;
                            holeSize++;
                            // console.table(board);
                            countLeft([xy[0]-1,y]);
                            countRight([xy[0]+1,y]);
                            y++;
                        }
                    }
                    function countRight(xy) {
                        var x = xy[0];
                        while ((x < w) && (board[xy[1]][x] === 0) && (holeSize < minHoleSize)) {
                            board[xy[1]][x] = label;
                            holeSize++;
                            // console.table(board);
                            countDown([x,xy[1]+1]);
                            x++;
                        }
                    }
                    function countLeft(xy) {
                        var x = xy[0];
                        while ((x >= 0) && (board[xy[1]][x] === 0) && (holeSize < minHoleSize)) {
                            board[xy[1]][x] = label;
                            holeSize++;
                            // console.table(board);
                            countDown([x,xy[1]+1]);
                            x--;
                        }
                    }
                    countRight(xy);
                    return (holeSize < minHoleSize);
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
                updateScreen : function () {
                    if ($scope) {
                        // $scope.$digest();
                        $scope.$applyAsync();
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
                    // $scope.board.updateScreen();
                    console.table(this.fields);
                    console.table(board);
                    confirm('doorgaan?');
                },
                stashPentomino : function (i) {
                    $scope.methods.movePentomino(i,[0,this.height() + 1]);
                    $scope.pentominos[i].onBoard = false;
                    this.logBoard();
                },
                findNextFit : function () {
                    var firstEmpty, hasHole, theLength, pentomino, shiftLeft = true;
                    if (!$scope.board.isSolved()) {
                        firstEmpty = $scope.board.findFirstEmpty();
                        hasHole = $scope.board.isHole(firstEmpty);
                        if (!hasHole) {
                            theLength = $scope.methods.pentominosLength();
                            for (var i = 0; i < theLength; i++) {
                                pentomino = $scope.pentominos[i];
                                if (!pentomino.onBoard) {
                                    $scope.lastPentomino = i;
                                    for (var face = 0; face < pentomino.faces.length; face++) {
                                        $scope.board.positionsTried++;
                                        pentomino.face = face;
                                        $scope.methods.adjustDimensions(i);
                                        $scope.methods.movePentomino(i,firstEmpty,shiftLeft);
                                        pentomino.onBoard = true;
                                        $scope.board.logBoard();
                                        if ($scope.board.isFitting()) {
                                            $scope.board.findNextFit();
                                            // $scope.board.updateScreen();
                                            // $scope.board.findNextFit();
                                            $scope.board.stashPentomino(i);
                                            $scope.board.logBoard();
                                            console.clear();
                                        } else {
                                            $scope.board.stashPentomino(i);
                                            $scope.board.logBoard();
                                        }
                                    }
                                }
                            }
                        } else {
                            $scope.board.stashPentomino($scope.lastPentomino);
                            $scope.board.logBoard();
                        }
                    } else {
                        $scope.board.stashPentomino($scope.lastPentomino);
                        $scope.board.logBoard();
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
                    $scope.$watchGroup($scope.pentominos, $scope.board.updateScreen);
                    $scope.settings.menuVisible = false;
                    $scope.methods.clearBoard();
                    // $scope.$applyAsync();
                    $scope.pentominos[9].onBoard = true;
                    for (var i = 0; i < startPositionsXblock[boardType].length; i++) {
                        $scope.methods.movePentomino(9,startPositionsXblock[boardType][i]);
                        $scope.lastPentomino = 9;
                        $scope.board.findNextFit();
                        console.log(this.positionsTried);
                    }
                    // console.table(this.fields);
                }
            };
        }
	};
}]);
