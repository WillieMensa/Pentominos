angular.module('pentominoApp')

// The data for blocks
.factory('dataservice',['$http', function($http){
    var self = this;
        solutions = {
            rectangles : [],
            square : []
        };
	return {
		getPentominos : function(){
			var fileName = 'assets/data/pentominos.json';
			return $http.get(fileName)
				.then(function(response){
                    return response.data;
				});
		},
        getColors : function(){
			var fileName = 'assets/data/colors.json';
			return $http.get(fileName)
				.then(function(response){
                    return response.data;
				});
		},
        getStartPosition : function(boardType){
			var fileName;
            switch (boardType) {
                case 'rectangle':
                    fileName = 'assets/data/rectangle-start.json';
                    break;
                default: // square
                    fileName = 'assets/data/square-start.json';
            }
			return $http.get(fileName)
				.then(function(response){
                    return response.data;
				});
		},
        saveSolution : function (pentominos) {
            var solution = {};
            for (var i = 0; i < pentominos.length; i++) {
                solution.face = pentominos[i].face;
                solution.position = pentominos[i].face;
            }
            // $scope.solutions[$scope.board.brdType].push(solution);
            console.table(solution);
        }
    }
}]);
