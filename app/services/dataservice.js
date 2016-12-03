angular.module('pentominoApp')

// The data for blocks
.factory('dataservice',['$http', function($http){
    var self = this;
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
                case boardType = 'rectangle':
                    fileName = 'assets/data/rectangle-start.json';
                    break;
                default: // square
                    fileName = 'assets/data/square-start.json';
            }
			return $http.get(fileName)
				.then(function(response){
                    return response.data;
				});
		}
    }
}]);
