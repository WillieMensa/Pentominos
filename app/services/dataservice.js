// The data for blocks
app.factory('dataservice', function(){
    var pentominos = [
            {
                color : 'purple',
                face : 0,
                faces : [
                    [
                        [0,0],[1,0],[2,0],[0,1],[1,1]
                    ],[
                        [0,0],[1,0],[0,1],[1,1],[1,2]
                    ],[
                        [1,0],[2,0],[0,1],[1,1],[2,1]
                    ],[
                        [0,0],[0,1],[1,1],[0,2],[1,2]
                    ],[
                        [0,0],[1,0],[2,0],[1,1],[2,1]
                    ],[
                        [0,0],[1,0],[0,1],[1,1],[0,2]
                    ],[
                        [0,0],[1,0],[0,1],[1,1],[2,1]
                    ],[
                        [1,0],[0,1],[1,1],[0,2],[1,2]
                    ]
                ],
                name : 'b',
                parts : 5,
                position : {
                    x : 0,
                    y : 1
                }
            },{
                color : 'red',
                face : 0,
                faces : [
                    [
                        [0,0],[1,0],[2,0],[3,0],[4,0]
                    ],[
                        [0,0],[0,1],[0,2],[0,3],[0,4]
                    ]
                ],
                name : 'i',
                parts : 5,
                position : {
                    x : 0,
                    y : 0
                }
            },{
                color : 'green',
                face : 0,
                faces : [
                    [
                        [1,0],[0,1],[1,1],[2,1],[1,2]
                    ]
                ],
                name : 'x',
                parts : 5,
                position : {
                    x : 2,
                    y : 1
                }
            },{
                color : 'blue',
                face : 0,
                faces : [
                    [
                        [0,0],[1,0],[0,1],[1,1]
                    ]
                ],
                name : 'o',
                parts : 4,
                position : {
                    x : 1,
                    y : 3
                }
            }
        ];
    return {
        givePentominos : function(boardType) {
            switch (boardType) {
                case boardType = 'square':
                    return pentominos
                    break;
                case boardType = 'rectangle':
                    return pentominos.slice(0,-1)
                    break;
                default:
            }
        }
    };
});
