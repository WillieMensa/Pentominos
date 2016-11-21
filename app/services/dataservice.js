angular.module('pentominoApp')

// The data for blocks
.factory('dataservice', function($http){
	return {
		givePentominos : function(boardType){
			var fileName = 'assets/data/pentominos.json';
			return $http.get(fileName)
				.then(function(response){
                    switch (boardType) {
                        case boardType = '6x10':
                            return response.data.slice(0,-1)
                        default: // square
                            return response.data
                    }
				});
		}
    }
});
