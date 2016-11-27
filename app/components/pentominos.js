angular.module('pentominoApp')

// The terminal (input / output)
.directive('pentominos', [function() {
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
                getPentominoCss : function (pentomino) {
                    var theCss = {
                        'left':pentomino.position.x*$scope.board.partSize+'px',
                        'top' :pentomino.position.y*$scope.board.partSize+'px',
                    };
                    return theCss;
                },
                // Returns the new face for a given face, action and blocktype
                flipRotate : function (pentomino, part) {
                    var rotable = [
                        [                       // rotate
                            [1,2,3,0,5,6,7,4],  // blyfn
                            [1,2,3,0],          // vw
                            [1,2,3,0],          // tu
                            [1,0,3,2],          // z
                            [1,0],              // i
                            [0]                 // xo not necessary
                        ],[                     // flip horizontally
                            [4,7,6,5,0,3,2,1],  // blyfn
                            [3,2,1,0],          // vw
                            [0,3,2,1],          // tu
                            [2,3,0,1],          // z
                            [0,1],              // i not necessary
                            [0]                 // xo not necessary
                        ],[                     // flip vertically
                            [6,5,4,7,2,1,0,3],  // blyfn
                            [1,0,3,2],          // vw
                            [2,1,0,3],          // tu
                            [2,3,0,1],          // z
                            [0,1],              // i not necessary
                            [0]                 // xo not necessary
                        ]];
                    pentomino.face = rotable[part][pentomino.type][pentomino.face];
                    $scope.board.isSolved();
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
                    if ((part < 3) && pentomino.type < 5) {
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
                    }
                }
            };
            $scope.board.registerAllPieces($scope.pentominos);
        },
        controller : function ($scope) {
        }
	};
}]);
