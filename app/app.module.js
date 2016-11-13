// The keyboard application
var app = angular.module('pentominoApp', []);

// Controller for blocks
app.controller('mainController', ['$scope', 'dataservice', function($scope, dataservice){
    var partSize = 40
    $scope.boardType = document.querySelector('#board').getAttribute('data-board-size');
    $scope.pentominos = dataservice.givePentominos($scope.boardType);
    $scope.getBoardSize = function() {
        var theStyle;
        switch ($scope.boardType) {
            case '6x10':
                theStyle = {
                    'width':6*partSize+'px',
                    'height':10*partSize+'px',
                }
                break;
            default:
                theStyle = {
                    'width':8*partSize+'px',
                    'height':8*partSize+'px',
                }
                break;
        }
        return theStyle;
    }
    $scope.redrawBoard = function () {
    }
    $scope.getPentominoCss = function(pentomino) {
        // console.log(pentomino);
        return {
            'left':pentomino.position.x*partSize+'px',
            'top':pentomino.position.y*partSize+'px',
        }
    }
    $scope.getPartCss = function(pentomino, i) {
        // console.log(pentomino);
        var part = pentomino.faces[pentomino.face];
        return {
            'left':part[i][0]*partSize+'px',
            'top':part[i][1]*partSize+'px',
            'backgroundColor':pentomino.color
        }
    }

    console.log($scope.pentominos);
}])

.directive('draggable', function($document) {
    return function(scope, element, attr) {
        var startX = 0,
        startY = 0,
        x = 0,
        y = 0;
        var container = null;

        element.css({
            position: 'relative',
            cursor: 'pointer'
        });

        element.on('mousedown', function(event) {
            // Prevent default dragging of selected content
            event.preventDefault();
            startX = event.screenX - x;
            startY = event.screenY - y;
            // startX = event.screenX - x;
            // startY = event.screenY - y;
            $document.on('mousemove', mousemove);
            $document.on('mouseup', mouseup);
            container = attr.$$element.parent();
            console.log(element);
        });

        function mousemove(event) {
            y = event.screenY - startY;
            x = event.screenX - startX;
            console.log("x: " + x + " y: " + y)
            container.css({
                top: y + 'px',
                left: x + 'px'
            });
        }

        function mouseup() {
            $document.unbind('mousemove', mousemove);
            $document.unbind('mouseup', mouseup);
        }
    }
});
