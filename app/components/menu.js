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
                $scope.showThisBoard = function(key) {
                    var threshold = 3;
                    if ($scope.solutions) {
                        switch (key) {
                            case 'square':
                                return true;
                            case 'rectangle':
                                return $scope.solutions['square'].length > threshold;
                            case 'beam':
                                return $scope.solutions['rectangle'].length > threshold;
                            case 'stick':
                                return $scope.solutions['beam'].length > threshold;
                            case 'twig':
                                return $scope.solutions['stick'].length > threshold;
                            default:
                                return false;
                        }
                        console.log($scope.board.boardTypes[key]);
                    }
                    return true;
                };
                $scope.toggleSubmenuBoards = function() {
                    $scope.settings.submenuBoardsVisible = !$scope.settings.submenuBoardsVisible;
                };
                $scope.setOpaqueBlocks = function() {
                    $scope.settings.opaqueBlocks = true;
                };
                $scope.setTransparentBlocks = function() {
                    $scope.settings.opaqueBlocks = false;
                };
                $scope.screenIsLargeEnough = function() {
                    var clw = document.querySelectorAll('html')[0].clientWidth;
                    var clh = document.querySelectorAll('html')[0].clientHeight;
                    return clw + clh > 1100;
                };
            }
        };
    }]);
