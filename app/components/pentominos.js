angular.module('pentominoApp')

// The terminal (input / output)
.directive('pentominos', ['dataservice', function(dataservice) {
	return {
		restrict: 'A',
        scope: false,
		templateUrl: 'app/components/pentominos.html',
        link: function($scope) {
            // $scope.pentominos = dataservice.givePentominos($scope.board.sizeType);

            $scope.methods = {
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
                }
            }
        }
	};
}]);
