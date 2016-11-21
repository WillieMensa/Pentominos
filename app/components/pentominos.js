angular.module('pentominoApp')

// The terminal (input / output)
.directive('pentominos', ['dataservice', function(dataservice) {
	return {
		restrict: 'A',
        scope: false,
		templateUrl: 'app/components/pentominos.html',
        link: function($scope) {

            $scope.methods = {
                self : this,
                startX : 0, startY : 0,
                pentoX : 0, pentoY : 0,
                x : 0, y : 0,
                pIndex : null,
                container : null,
                getPentominoCss : function (pentomino) {
                    return {
                        'left':pentomino.position.x*$scope.board.partSize+'px',
                        'top' :pentomino.position.y*$scope.board.partSize+'px',
                    }
                },
                flipRotate : function (pentomino, part) {
                    switch (part) {
                        case 0 :
                            pentomino.face = (pentomino.face + 1) % pentomino.faces.length;
                            break;
                        default:
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
                    console.log(event);
                    pentomino.drag = true;
                    // Prevent default dragging of selected content
                    // event.stopPropagation();
                    self.container = event.target.offsetParent.offsetParent;
                    self.container.style.zIndex = 100;
                    self.pentoX = self.container.offsetLeft;
                    self.pentoY = self.container.offsetTop;
                    self.startX = event.clientX - self.pentoX;
                    self.startY = event.clientY - self.pentoY;
                },
                doDrag : function(pentomino, event) {
                    if (pentomino.drag) {
                        // console.log(event);
                        self.x = event.clientX - self.startX;
                        self.y = event.clientY - self.startY;
                        self.container.style.left = self.x + 'px';
                        self.container.style.top = self.y + 'px';
                        // console.log(Math.round(self.y / $scope.board.partSize));
                    }
                },
                stopDrag : function(pentomino, event) {
                    if (pentomino.drag) {
                        pentomino.drag = false;
                        pentomino.position.x = Math.round(self.x / $scope.board.partSize);
                        pentomino.position.y = Math.round(self.y / $scope.board.partSize);
                        self.container.style.left = pentomino.position.x * $scope.board.partSize + 'px';
                        self.container.style.top = pentomino.position.y * $scope.board.partSize + 'px';
                        self.container.style.zIndex = '';
                    }
                }
            }
        },
        controller : function ($scope) {
        }
	};
}]);
