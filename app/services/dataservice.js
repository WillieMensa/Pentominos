// The data for blocks
app.service('dataservice', function(){
    var pentominos = [
            {
                color : 'red',
                face : 0,
                faces : [
                    [
                        [0,0],[1,0],[2,0],[3,0],[4,0]
                    ],
                    [
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
                    x : 0,
                    y : 1
                }
            }
        ];
    return {
        givePentominos : function(boardType) {
            switch (boardType) {
                case boardType = '8x8':
                    return pentominos
                    break;
                case boardType = '6x10':
                    return pentominos.slice(-1)
                    break;
                default:
            }
        }
    };
});
