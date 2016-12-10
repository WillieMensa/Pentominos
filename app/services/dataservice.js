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
        getSolutions : function(){
            if (localStorage.getItem("pentominos")) {
                solutions = JSON.parse(localStorage.getItem("pentominos"));
            } else {
                solutions = {
                    rectangle : [],
                    square : []
                };
            }
            return solutions;
        },
        saveSolution : function (boardType, solutionString) {
            var solutions = this.getSolutions();
                solutions[boardType].push(solutionString);
			    localStorage.setItem("pentominos", JSON.stringify(solutions));
                // console.table(solutionString);
        }

    };
}]);
