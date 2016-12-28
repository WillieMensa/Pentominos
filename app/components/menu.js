angular.module('pentominoApp')

// The terminal (input / output)
.directive('menu', [function() {
	return {
		restrict: 'A',
        scope: false,
		templateUrl: 'app/components/menu.html',
        link: function($scope) {
            $scope.showTheMenu = function() {
                $scope.settings.menuVisible = true;
                $scope.settings.submenuBoardsVisible = false;
            };
            $scope.hideTheMenu = function() {
                $scope.settings.menuVisible = false;
            };
            $scope.toggleSubmenuBoards = function() {
                $scope.settings.submenuBoardsVisible = !$scope.settings.submenuBoardsVisible;
            };
            $scope.setOpaqueBlocks = function () {
                $scope.settings.opaqueBlocks = true;
            };
            $scope.setTransparentBlocks = function () {
                $scope.settings.opaqueBlocks = false;
            };
        }
	};
}]);
