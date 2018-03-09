

const menuConfing =[
    {
        path: "/Rect",
        name: "方形节点",
        child:[
            {
                path: "/Rect/Rect",
                name:"各类方块"
            },
            {
                path:"/Rect/Text",
                name:"文本位置"
            }
        ]
    },
    {
        path: "/Text",
        name:"文本节点",
        // routes: [
        //     {
        //         path: "/tacos/bus",
        //         component: Bus
        //     },
        //     {
        //         path: "/tacos/cart",
        //         component: Rect
        //     }
        // ]
    }
];

export default menuConfing