// The keyboard application
var app = angular.module('pentominoApp', []);

// Controller for blocks
app.controller('mainController', ['$scope', 'dataservice', function($scope, dataservice){
    $scope.partSize = 40
    $scope.boardType = document.querySelector('#board').getAttribute('data-board-size');
    $scope.pentominos = dataservice.givePentominos($scope.boardType);
    $scope.getBoardSize = function() {
        var theStyle;
        switch ($scope.boardType) {
            case '6x10':
                theStyle = {
                    'width':6*$scope.partSize+'px',
                    'height':10*$scope.partSize+'px',
                }
                break;
            default:
                theStyle = {
                    'width':8*$scope.partSize+'px',
                    'height':8*$scope.partSize+'px',
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
            'left':pentomino.position.x*$scope.partSize+'px',
            'top':pentomino.position.y*$scope.partSize+'px',
        }
    }
    $scope.getPartCss = function(pentomino, i) {
        // console.log(pentomino);
        var part = pentomino.faces[pentomino.face];
        return {
            'left':part[i][0]*$scope.partSize+'px',
            'top':part[i][1]*$scope.partSize+'px',
            'backgroundColor':pentomino.color
        }
    }

    console.log($scope.pentominos);
}])

.directive('draggable', function($document) {
    return function(scope, element, attr) {
        var startX = 0, startY = 0,
            pentoX = 0, pentoY = 0,
            x = 0, y = 0;
        var container = null;

        element.css({
            position: 'relative',
            cursor: 'pointer'
        });

        element.on('mousedown', function(event) {
            // Prevent default dragging of selected content
            event.preventDefault();
            pentoX = attr.$$element.parent()[0].offsetLeft;
            pentoY = attr.$$element.parent()[0].offsetTop;
            startX = event.clientX - pentoX;
            startY = event.clientY - pentoY;
            $document.on('mousemove', mousemove);
            $document.on('mouseup', mouseup);
            container = attr.$$element.parent();
            // console.log(container);
        });

        function mousemove(event) {
            x = event.clientX - startX;
            y = event.clientY - startY;
            // console.log("x: " + x + " y: " + y)
            container.css({
                left: x + 'px',
                top: y + 'px'
            });
        }

        function mouseup(event) {
            console.log(x,y);
            $document.unbind('mousemove', mousemove);
            $document.unbind('mouseup', mouseup);
        }
    }
});
