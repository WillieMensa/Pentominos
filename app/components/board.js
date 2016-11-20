angular.module('pentominoApp')

// The terminal (input / output)
.directive('board', ['dataservice', function(dataservice) {
	return {
		restrict: 'A',
        scope: false,
		templateUrl: 'app/components/board.html',
        link: function($scope) {
            $scope.board = {
                partSize : 40,
                sizeType : document.querySelector('#board').getAttribute('data-board-size'),
                brdType : 'square',
                brdTypes : {
                    'square' : {
                        w : 8,
                        h : 8
                    },
                    'rectangle' : {
                        w : 6,
                        h : 10
                    }
                },
                theBoardCss : function () {
                    return {
                        'width':this.brdTypes[this.brdType].w*this.partSize+'px',
                        'height':this.brdTypes[this.brdType].h*this.partSize+'px'
                    }
                }
            };
        },
        controller: function($scope) {
		},
		controllerAs: 'settingsCtrl'
	};
}]);
