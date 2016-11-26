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
                resetParams : function() {
                    this.x = 0;
                    this.y = 0;
                },
                getPentominoCss : function (pentomino) {
                    return {
                        'left':pentomino.position.x*$scope.board.partSize+'px',
                        'top' :pentomino.position.y*$scope.board.partSize+'px',
                    }
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
                    if (part < 3) {
                        pentomino.face = rotable[part][pentomino.type][pentomino.face];
                    }
                },
                getPartCss : function(pentomino, part) {
                    return {
                        'left':part[0]*$scope.board.partSize+'px',
                        'top':part[1]*$scope.board.partSize+'px',
                        'backgroundColor':pentomino.color
                    }
                },
                startDrag : function(pentomino, event) {
                    $scope.currentPentomino = pentomino;
                    console.log(JSON.stringify($scope.pentominos));
                    // Prevent default dragging of selected content
                    event.stopPropagation();
                    this.container = event.target.offsetParent.offsetParent;
                    this.container.style.zIndex = 100;
                    this.pentoX = this.container.offsetLeft;
                    this.pentoY = this.container.offsetTop;
                    this.startX = event.clientX - this.pentoX;
                    this.startY = event.clientY - this.pentoY;
                    this.x = event.clientX - this.startX;
                    this.y = event.clientY - this.startY;
                    // console.log(this);
                },
                doDrag : function(event) {
                    if ($scope.currentPentomino) {
                        // console.log(event);
                        this.x = event.clientX - this.startX;
                        this.y = event.clientY - this.startY;
                        this.container.style.left = this.x + 'px';
                        this.container.style.top = this.y + 'px';
                        // console.log(Math.round(this.y / $scope.board.partSize));
                    }
                },
                stopDrag : function(pentomino, event) {
                    if ($scope.currentPentomino) {
                        pentomino.position.x = Math.round(this.x / $scope.board.partSize);
                        pentomino.position.y = Math.round(this.y / $scope.board.partSize);
                        this.container.style.left = pentomino.position.x * $scope.board.partSize + 'px';
                        this.container.style.top = pentomino.position.y * $scope.board.partSize + 'px';
                        this.container.style.zIndex = '';
                        this.container = null;
                        $scope.currentPentomino = null;
                        this.resetParams();
                    }
                }
            }
        },
        controller : function ($scope) {
        }
	};
}]);
