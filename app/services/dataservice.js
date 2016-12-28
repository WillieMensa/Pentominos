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
			var fileName = 'assets/data/start-'+boardType+'.json';
			return $http.get(fileName)
				.then(function(response){
                    return response.data;
				});
		},
        getSolutions : function(boardTypes){
            if (localStorage.getItem("pentominos2")) {
                solutions = JSON.parse(localStorage.getItem("pentominos2"));
            } else {
                solutions = {};
            }
            for (var type in boardTypes) {
                if (boardTypes.hasOwnProperty(type)) {
                    if (!solutions.hasOwnProperty(type)) {
                        solutions[type] = [];
                    }
                }
            }
            return solutions;
        },
        saveSolution : function (boardTypes, boardType, solutionString) {
            var solutions = this.getSolutions(boardTypes);
                solutions[boardType].push(solutionString);
			    localStorage.setItem("pentominos2", JSON.stringify(solutions));
                // console.table(solutionString);
        }

    };
}]);
