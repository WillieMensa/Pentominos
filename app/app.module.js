// The keyboard application
angular.module('pentominoApp', [])

// Controller for blocks
.controller('mainController', ['$scope', 'dataService' function($scope, dataService){
    var pentominos = [];
    $scope.initPentominos = function() {
        pentominoData = dataService.getData('8x8');
    }
}])

.service('dataService', function(){
    var pentominoFaces = [
        [
            // The | block
            [
                [0,0],[1,0],[2,0],[3,0],[4,0]
            ],
            [
                [0,0],[0,1],[0,2],[0,3],[0,4]
            ],
            // The . block
            [
                [0,0],[1,0],[0,1],[1,1]
            ]
        ]
    ];
	return {
        getData = function(boardType) {
            switch (boardType) {
                case boardType = '8x8':
                    return pentominoFaces
                    break;
                case boardType = '6x10':
                    return pentominoFaces.slice(-1)
                    break;
                default:

            }
        }
	};
});
