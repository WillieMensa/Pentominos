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
                x : 0, y : 0,
                pIndex : null,
                dragStartPos : {},
                dragEndPos : {},
                container : null,
                part : null,
                resetVars : function() {
                    $scope.currentPentomino = null;
                    this.container.style.zIndex = '';
                    this.container = null;
                    this.part = null;
                    // this.startX = 0;
                    // this.startY = 0;
                    // this.x = 0;
                    // this.y = 0;
                },
                pentominosLength : function () {
                    return ($scope.board.brdType == 'rectangle') ? $scope.pentominos.length-1 : $scope.pentominos.length;
                },
                getPentominoCss : function (position) {
                    if (position) {
                        return {
                            'left':position.x*$scope.board.partSize+'px',
                            'top' :position.y*$scope.board.partSize+'px',
                        };
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
                    if (part === 0) {
                        pentomino.dimensions.reverse();
                    }
                },
                adjustDimensions : function(i) {
                    var pentomino = $scope.pentominos[i];
                    pentomino.dimensions = angular.copy(pentomino.initialDimensions);
                    if (pentomino.face % 2 == 1) {
                        pentomino.dimensions.reverse();
                    }
                },
                setPosition : function (block, position) {
                    var pentomino = $scope.pentominos[block];
                    pentomino.position.x = position[0];
                    pentomino.position.y = position[1];
                },
                isActive : function (i) {
                    return ($scope.pentominos.indexOf($scope.currentPentomino) === i);
                },
                getPartCss : function(pentomino, part) {
                    return {
                        'left':part[0]*$scope.board.partSize+'px',
                        'top':part[1]*$scope.board.partSize+'px',
                        'backgroundColor':pentomino.color
                    };
                },
                getClientPos : function (event) {
                    var clientX = (event.touches) ? event.touches[0].clientX : event.clientX;
                    var clientY = (event.touches) ? event.touches[0].clientY : event.clientY;
                    return {
                        x : clientX,
                        y : clientY
                    };
                },
                startDrag : function(pentomino, part, event) {
                    // event.stopPropagation();
                    var clientPos = this.getClientPos(event);
                    $scope.currentPentomino = pentomino;
                    this.part = part;
                    $scope.board.registerPiece($scope.pentominos.indexOf(pentomino),-1);
                    this.container = event.target.offsetParent.offsetParent;
                    this.container.style.zIndex = 100;
                    this.startX = clientPos.x - this.container.offsetLeft;
                    this.startY = clientPos.y - this.container.offsetTop;
                    this.x = clientPos.x - this.startX;
                    this.y = clientPos.y - this.startY;
                    this.dragStartPos.x = this.x;
                    this.dragStartPos.y = this.y;
                    // console.log('start', this.x, this.y);
                },
                doDrag : function(event) {
                    var clientPos = this.getClientPos(event);
                    if ($scope.currentPentomino) {
                        // console.log(event);
                        this.x = clientPos.x - this.startX;
                        this.y = clientPos.y - this.startY;
                        this.container.style.left = this.x + 'px';
                        this.container.style.top = this.y + 'px';
                        // console.log(Math.round(this.y / $scope.board.partSize));
                    }
                },
                isDragged : function() {
                    return ((Math.abs(this.dragEndPos.x - this.dragStartPos.x) > 19) || (Math.abs(this.dragEndPos.y - this.dragStartPos.y) > 19));
                },
                findFirstPartRight : function(i) {
                    var pentomino = $scope.pentominos[i];
                    var offsetRight = pentomino.dimensions[0];
                    var part = pentomino.faces[pentomino.face][0];
                    for (var j = 0; j < pentomino.faces[pentomino.face].length; j++) {
                        part = pentomino.faces[pentomino.face][j];
                        offsetRight = ((part[1] === 0) && (part[0] < offsetRight)) ? part[0] : offsetRight;
                    }
                    return offsetRight;
                },
                movePentomino : function (i,position,shiftLeft) {
                    var newPosition;
                    if (shiftLeft) { // If left top of pentomino is empty ___|
                        var xShift = this.findFirstPartRight(i);
                        newPosition = [position[0]-xShift,position[1]];
                    } else {
                        newPosition = position;
                    }
                    $scope.board.registerPiece(i,-1);
                    this.setPosition(i,newPosition);
                    $scope.board.registerPiece(i,1);
                    // console.table($scope.board.fields);
                },
                alignToGrid : function() {
                    $scope.currentPentomino.position.x = Math.round(this.x / $scope.board.partSize);
                    $scope.currentPentomino.position.y = Math.round(this.y / $scope.board.partSize);
                    this.container.style.left = $scope.currentPentomino.position.x * $scope.board.partSize + 'px';
                    this.container.style.top = $scope.currentPentomino.position.y * $scope.board.partSize + 'px';
                },
                stopDrag : function(event) {
                    this.dragEndPos.x = this.x;
                    this.dragEndPos.y = this.y;
                    if ($scope.currentPentomino) {
                        if (!this.isDragged()) {
                            if ((($scope.currentPentomino.type < 4) && (this.part < 3)) ||
                                (($scope.currentPentomino.type == 4) && (this.part < 1))) {
                                this.flipRotate($scope.currentPentomino, this.part);
                            }
                        }
                        this.alignToGrid();
                        $scope.board.registerPiece($scope.pentominos.indexOf($scope.currentPentomino),1);
                        $scope.board.isSolved();
                        this.resetVars();
                    }
                },
                showSolution : function () {
                    var solutionString = $scope.solutions[$scope.board.brdType][$scope.currentSolution];
                    var splitString = solutionString.substr(1).split('#');
                    var pentomino;
                    var theLength = this.pentominosLength();
                    for (var i = 0; i < theLength; i++) {
                        pentomino = $scope.pentominos[i];
                        pentomino.face = parseInt(splitString[i].charAt(1),10);
                        pentomino.position.x = parseInt(splitString[i].charAt(2));
                        pentomino.position.y = parseInt(splitString[i].charAt(3));
                        this.adjustDimensions(i);
                    }
                    $scope.board.registerPieces();
                },
                clearBoard : function () {
                    var theLength = this.pentominosLength();
                    var pentomino;
                    for (var i = 0; i < theLength; i++) {
                        pentomino = $scope.pentominos[i];
                        this.movePentomino(i,[0,$scope.board.height() + 1]);
                        pentomino.face = 0;
                        this.adjustDimensions(i);
                    }
                },
                mixBoard : function () {
                    var boardWidth = $scope.board.width();
                    var xPos, face;
                    var pentomino;
                    var theLength = this.pentominosLength();
                    for (var i = 0; i < theLength; i++) {
                        pentomino = $scope.pentominos[i];
                        xPos = Math.floor(Math.random() * $scope.board.width());
                        yPos = Math.floor(Math.random() * $scope.board.height());
                        face = Math.floor(Math.random() * pentomino.faces.length);
                        pentomino.position.x = xPos;
                        pentomino.position.y = yPos;
                        pentomino.face = face;
                        $scope.pentominos.adjustDimensions(i);
                    }
                    $scope.board.registerPieces();
                },
                flipBoardYAxis : function () {
                    var pentomino;
                    for (var i = 0; i < $scope.pentominos.length; i++) {
                        pentomino = $scope.pentominos[i];
                        this.flipRotate(pentomino,1);
                        pentomino.position.x = $scope.board.width() - pentomino.position.x - pentomino.dimensions[0];
                    }
                },
                // 90° clockwise rotation
                rotateSquareBoard : function () {
                    var pentomino;
                    var origin = {};
                    for (var i = 0; i < $scope.pentominos.length; i++) {
                        pentomino = $scope.pentominos[i];
                        // bottom left of current rectangle occupied by pentomino
                        origin.x = pentomino.position.x;
                        origin.y = pentomino.position.y + pentomino.dimensions[1];
                        // rotated position in board
                        pentomino.position.x = $scope.board.width() - origin.y;
                        pentomino.position.y = origin.x;
                        // rotated pentomino
                        this.flipRotate(pentomino,0);
                    }
                },
                shiftPieces : function (dx,dy) {
                    for (var i = 0; i < $scope.pentominos.length; i++) {
                        $scope.pentominos[i].position.y += 4;
                    }
                },
                rotateBoard : function () {
                    if ($scope.board.brdType == 'square') {
                        this.rotateSquareBoard();
                    } else {
                        // rotate twice and shift pentominos 4 positions down
                        for (var i = 0; i < 2; i++) this.rotateSquareBoard();
                        this.shiftPieces(0,4);
                    }
                    // console.log($scope.pentominos[12]);
                }
            };
        }
	};
}]);
