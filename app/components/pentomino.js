angular.module('pentominoApp')

// The terminal (input / output)
.directive('pentomino', [function() {
	return {
		restrict: 'A',
		templateUrl: 'app/components/pentomino.html',
		controller: function($scope) {
            var color = 'red',
                face = 0,
                faceCount = 1,
                position = {
                    x : 0,
                    y : 0
                },
                faces = [];
            $scope.getFace = function(){
                return faces[face];
            };
		},
		controllerAs: 'pentominoCtrl'
	};
}]);
