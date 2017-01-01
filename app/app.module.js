// The keyboard application
var app = angular.module('pentominoApp', ['ngTouch']);

// Controller for blocks
app.controller('mainController', ['$scope', '$timeout', 'dataservice', function($scope, $timeout, dataservice){

    // $scope.board = {};
    // $scope.board.boardType = 'square';
    $scope.settings = {
        menuVisible : false,
        submenuBoardsVisible : false,
        opaqueBlocks : true,
        solutionsShown : false,
        scale : 1
    };
    $scope.getScale = function() {
        var scale = Math.min(document.querySelectorAll("html")[0].clientWidth / document.querySelectorAll("#board")[0].clientWidth, 1);
        scale = Math.floor(scale * 10) / 10;
        $scope.settings.scale = scale;
        return {
            'transformOrigin': 'top',
            '-webkit-transform': 'scale('+scale+', '+scale+')',
            '-ms-transform': 'scale('+scale+', '+scale+')',
            'transform': 'scale('+scale+', '+scale+')'
        };
    };
    $scope.pentominos = {};
    // $scope.solutions = dataservice.getSolutions($scope.board.boardTypes);
    $scope.currentSolution = 0;
    $scope.currentPentomino = null;
    $scope.lastPentomino = null; // for autoSolve
    $scope.saveSolution = function (solutionString) {
        dataservice.saveSolution($scope.board.boardTypes, $scope.board.boardType, solutionString);
    };
    $scope.getStartPosition = function (boardType) {
        $scope.settings.menuVisible = false;
        $scope.settings.solutionsShown = false;
        $scope.board.boardType = (boardType) ? boardType : $scope.board.boardType;
        var brdType = $scope.board.boardType;
        var pentomino;
        dataservice.getStartPosition(brdType).then(function(data) {
            if ($scope.pentominos) {
                for (var i = 0; i < $scope.pentominos.length; i++) {
                    pentomino = $scope.pentominos[i];
                    pentomino.face = data[i].face;
                    pentomino.position = angular.copy(data[i].position);
                    if (!pentomino.initialDimensions) {
                        pentomino.initialDimensions = angular.copy(pentomino.dimensions);
                    } else {
                        pentomino.dimensions = angular.copy(pentomino.initialDimensions);
                    }
                    if ($scope.methods) {
                        $scope.methods.adjustDimensions(i);
                    }
                }
            }
            $scope.board.registerPieces();
            $scope.currentSolution = 0;
        });
    };
    dataservice.getPentominos().then(function(data) {
        $scope.pentominos = data;
        dataservice.getColors().then(function(data) {
            for (var i = 0; i < $scope.pentominos.length; i++) {
                $scope.pentominos[i].color = data[i].color;
            }
            $scope.getStartPosition();
            $scope.solutions = dataservice.getSolutions($scope.board.boardTypes);
        });
    });

}]);
