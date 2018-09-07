const path = require("path")
module.exports = {
    mode: "development",
    devtool: 'source-map',
    entry: "./src/index.ts",
    output: {
        path: path.resolve( __dirname, 'dist' ),
        filename: "whistle.js"
    },

    module:{
        rules:[
            { 
                test: /\.ts$/, 
                loader: "awesome-typescript-loader",
                exclude: /node_modules/
            },
            {
                test:/\.js$/,
                loader:"babel-loader",
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.ts','.json'],
    },
}