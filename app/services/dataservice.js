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
        getSolutions : function(boardTypes) {
            // Convert old solutions
            var convert = function(solutions) {
                    var convertedSolutions = {};
                    for (var boardType in solutions) {
                        if (solutions.hasOwnProperty(boardType)) {
                            if (solutions[boardType].length) {
                                for (var i = 0; i < solutions[boardType].length; i++) {
                                    solutions[boardType][i] = solutions[boardType][i].split('#');
                                    solutions[boardType][i].shift();
                                    for (var j = 0; j < solutions[boardType][i].length; j++) {
                                        solutions[boardType][i][j] = solutions[boardType][i][j].split('');
                                        solutions[boardType][i][j] = solutions[boardType][i][j].join('_')
                                    }
                                    solutions[boardType][i] = '#' + solutions[boardType][i].join('#');
                                }
                            }
                        }
                        convertedSolutions[boardType] = solutions[boardType];
                    }
                    return convertedSolutions;
                };

            if (localStorage.getItem("pentominos2")) {
                solutions = JSON.parse(localStorage.getItem("pentominos2"));
            } else {
                if (localStorage.getItem("pentominos")) {
                    solutions = JSON.parse(localStorage.getItem("pentominos"));
                    solutions = convert(solutions);
                    localStorage.setItem("pentominos2", JSON.stringify(solutions));
                    localStorage.removeItem("pentominos");
                } else {
                    solutions = {};
                }
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
