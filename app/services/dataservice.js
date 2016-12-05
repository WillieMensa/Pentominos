angular.module('pentominoApp')

// The data for blocks
.factory('dataservice',['$http', function($http){

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
        saveSolution : function (boardType, pentominos) {
            var solutions = this.getSolutions();
            var solution = '';
            var solution2string = function (solution) {
                if (solution) {
                    return '#' + solution.name + solution.face + solution.position.x + solution.position.y;
                } else {
                    return 'false';
                }
            };
            for (var i = 0; i < pentominos.length; i++) {
                solution += solution2string(pentominos[i]);
            }
            solutions[boardType].push(solution);
			localStorage.setItem("pentominos", JSON.stringify(solutions));
            console.table(solution);
            return solution;
        },
        getSolutions : function(){
            if (localStorage.getItem("pentominos")) {
                solutions = JSON.parse(localStorage.getItem("pentominos"));
            } else {
                solutions = {
                    rectangles : [],
                    square : []
                };
            }
            return solutions;
        },

    }
}]);
