angular.module('pentominoApp')

// Draggable directive for the pentomino blocks
.directive('draggable', function($document) {
    return function(scope, element, attr) {
        var startX = 0, startY = 0,
            pentoX = 0, pentoY = 0,
            x = 0, y = 0;
            pIndex = null;
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
            pIndex = element[0].offsetParent.dataset.pentominoIndex - 0;
            console.log('clicked %O', scope.pentominos[pIndex].position);
        });

        function setCss(x,y,z) {
            container.css({
                left: x + 'px',
                top: y + 'px',
                zIndex: z
            });
        }

        function mousemove(event) {
            x = event.clientX - startX;
            y = event.clientY - startY;
            setCss(x,y,100);
            console.log('dragged');
        }

        function mouseup(event) {
            var normalize = function (amount) {
                return Math.round(amount / scope.board.partSize)
            }
            x = normalize(x) * scope.board.partSize;
            y = normalize(y) * scope.board.partSize;
            setCss(x,y,'auto');
            scope.pentominos[pIndex].position.x = normalize(x);
            scope.pentominos[pIndex].position.y = normalize(y);
            $document.off('mousemove', mousemove);
            $document.off('mouseup', mouseup);
            console.log('released %O', scope.pentominos[pIndex].position);
        }
    }
});
