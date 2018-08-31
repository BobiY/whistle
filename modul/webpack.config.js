const path = require("path")
module.exports = {
    mode: "development",
    devtool: 'source-map',
    entry: "./src/index",
    output: {
        path: path.resolve( __dirname, 'dist' ),
        filename: "whistle.js"
    },

    module:{
        rules:[
            {
                test:/\.js$/,
                loader:"babel-loader",
                exclude: /node_modules/
            }
        ]
    }
}