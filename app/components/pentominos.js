angular.module('pentominoApp')

// The terminal (input / output)
.directive('pentominos', ['dataservice', function(dataservice) {
	return {
		restrict: 'A',
        scope: false,
		templateUrl: 'app/components/pentominos.html',
        link: function($scope) {

            $scope.methods = {
                startX : 0, startY : 0,
                pentoX : 0, pentoY : 0,
                x : 0, y : 0,
                pIndex : null,
                container : null,
                resetVars : function() {
                    $scope.currentPentomino = null;
                    this.container.style.zIndex = '';
                    this.container = null;
                    this.x = 0;
                    this.y = 0;
                },
                getPentominoCss : function (position) {
                    if (position) {
                        return {
                            'left':position.x*$scope.board.partSize+'px',
                            'top' :position.y*$scope.board.partSize+'px',
                        }
                    }
                },
                // Returns the new face index for a given face, action and blocktype
                flipRotate : function (pentomino, part) {
                    var rotable = [
                        [                       // rotate
                            [1,2,3,0,5,6,7,4],  // blyfn
                            [1,2,3,0],          // vw
                            [1,2,3,0],          // tu
                            [1,0,3,2],          // z
                            [1,0],              // i
                            [0]                 // xo not necessary
                        ],[                     // flip around yAxis
                            [4,7,6,5,0,3,2,1],  // blyfn
                            [3,2,1,0],          // vw
                            [0,3,2,1],          // tu
                            [2,3,0,1],          // z
                            [0,1],              // i not necessary
                            [0]                 // xo not necessary
                        ],[                     // flip around xAxis
                            [6,5,4,7,2,1,0,3],  // blyfn
                            [1,0,3,2],          // vw
                            [2,1,0,3],          // tu
                            [2,3,0,1],          // z
                            [0,1],              // i not necessary
                            [0]                 // xo not necessary
                        ]];
                    pentomino.face = rotable[part][pentomino.type][pentomino.face];
                    // switch the dimensions if pentomino is rotated;
                    if (part == 0) {
                        pentomino.dimensions.reverse();
                    }
                    console.log(pentomino);
                },
                adjustDimensions : function(pentomino) {
                    pentomino.dimensions = angular.copy(pentomino.initialDimensions);
                    if (pentomino.face % 2 == 1) {
                        pentomino.dimensions.reverse();
                    }
                },
                getPartCss : function(pentomino, part) {
                    return {
                        'left':part[0]*$scope.board.partSize+'px',
                        'top':part[1]*$scope.board.partSize+'px',
                        'backgroundColor':pentomino.color
                    }
                },
                startDrag : function(pentomino, part, event) {
                    // event.stopPropagation();
                    $scope.board.registerPiece(pentomino,-1);
                    if (((pentomino.type < 4) && (part < 3)) ||
                        ((pentomino.type == 4) && (part < 1))) {
                        this.flipRotate(pentomino, part);
                        $scope.board.registerPiece(pentomino,1);
                        $scope.board.isSolved();
                    } else {
                        $scope.currentPentomino = pentomino;
                        this.container = event.target.offsetParent.offsetParent;
                        this.container.style.zIndex = 100;
                        this.pentoX = this.container.offsetLeft;
                        this.pentoY = this.container.offsetTop;
                        this.startX = event.pageX - this.pentoX;
                        this.startY = event.pageY - this.pentoY;
                        this.x = event.pageX - this.startX;
                        this.y = event.pageY - this.startY;
                    }
                },
                doDrag : function(event) {
                    if ($scope.currentPentomino) {
                        // console.log(event);
                        this.x = event.pageX - this.startX;
                        this.y = event.pageY - this.startY;
                        this.container.style.left = this.x + 'px';
                        this.container.style.top = this.y + 'px';
                        // console.log(Math.round(this.y / $scope.board.partSize));
                    }
                },
                stopDrag : function(event) {
                    if ($scope.currentPentomino) {
                        $scope.currentPentomino.position.x = Math.round(this.x / $scope.board.partSize);
                        $scope.currentPentomino.position.y = Math.round(this.y / $scope.board.partSize);
                        this.container.style.left = $scope.currentPentomino.position.x * $scope.board.partSize + 'px';
                        this.container.style.top = $scope.currentPentomino.position.y * $scope.board.partSize + 'px';
                        $scope.board.registerPiece($scope.currentPentomino,1);
                        $scope.board.isSolved();
                        this.resetVars();
                        console.table($scope.board.fields);
                    }
                },
                showSolution : function (solutionString) {
                    var splitString = solutionString.substr(1).split('#');
                    for (var i = 0; i < splitString.length; i++) {
                        $scope.pentominos[i].face = parseInt(splitString[i].charAt(1),10);
                        $scope.pentominos[i].position.x = parseInt(splitString[i].charAt(2));;
                        $scope.pentominos[i].position.y = parseInt(splitString[i].charAt(3));;
                    }
                    $scope.methods.registerPieces();
                },
                clearBoard : function () {
                    var boardWidth = $scope.board.width();
                    var xPos;
                    for (var i = 0; i < $scope.pentominos.length; i++) {
                        xPos = $scope.pentominos[i].position.x;
                        $scope.methods.flipRotate($scope.pentominos[i], 1);
                        if (xPos < $scope.board.width()/2) {
                            $scope.pentominos[i].position.x = -2 * $scope.pentominos[i].position.x;
                        } else {
                            $scope.pentominos[i].position.x += 2 * (boardWidth - xPos);
                        }
                    }
                },
                mixBoard : function () {
                    var boardWidth = $scope.board.width();
                    var xPos, face;
                    var pentomino;
                    for (var i = 0; i < $scope.pentominos.length; i++) {
                        pentomino = $scope.pentominos[i];
                        xPos = Math.floor(Math.random() * $scope.board.width());
                        yPos = Math.floor(Math.random() * $scope.board.height());
                        face = Math.floor(Math.random() * pentomino.faces.length);
                        pentomino.position.x = xPos;
                        pentomino.position.y = yPos;
                        pentomino.face = face;
                        $scope.methods.adjustDimensions(pentomino);
                    }
                    $scope.methods.registerPieces();
                    console.table($scope.board.fields);
                },
                flipBoardYAxis : function () {
                    var pentomino;
                    for (var i = 0; i < $scope.pentominos.length; i++) {
                        pentomino = $scope.pentominos[i]
                        $scope.methods.flipRotate(pentomino,1);
                        pentomino.position.x = $scope.board.width() - pentomino.position.x - pentomino.dimensions[0];
                    }
                },
                registerPieces : function () {
                    $scope.board.cleanBoard();
                    $scope.board.registerAllPieces();
                }
            };
            // $scope.methods.registerPieces();

        },
        controller : function ($scope) {

        }
	};
}]);
