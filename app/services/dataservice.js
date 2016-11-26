angular.module('pentominoApp')

// The data for blocks
.factory('dataservice',['$http', function($http){
    var self = this;
    self.dataSlice = function (data, boardType) {
        switch (boardType) {
            case boardType = '6x10':
                return data.slice(0,-1)
            default: // square
                return data
        }
    };
	return {
		getPentominos : function(boardType){
			var fileName = 'assets/data/pentominos.json';
			return $http.get(fileName)
				.then(function(response){
                    return self.dataSlice(response.data, boardType);
				});
		},
        getColors : function(boardType){
			var fileName = 'assets/data/colors.json';
			return $http.get(fileName)
				.then(function(response){
                    return self.dataSlice(response.data, boardType);
				});
		},
        getStartPosition : function(boardType){
			var fileName = 'assets/data/square-start.json';
            switch (boardType) {
                case boardType = '6x10':
                    fileName = 'assets/data/rectangle-start.json';
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
