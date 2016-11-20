// Draggable directive for the pentomino blocks
app.directive('draggable', function($document) {
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
        }

        function mouseup(event) {
            x = Math.round(x / scope.board.partSize) * scope.board.partSize;
            y = Math.round(y / scope.board.partSize) * scope.board.partSize;
            setCss(x,y,'auto');
            console.log(event);
            // scope.pentominos[]
            $document.unbind('mousemove', mousemove);
            $document.unbind('mouseup', mouseup);
        }
    }
});
