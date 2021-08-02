/* eslint-disable */ 
const path = require( 'path' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );

module.exports = {
    mode: "development",
    devtool: 'inline-source-map',
    entry: {
        "index": "./public/js/index.js",
        "login": "./public/js/login.js",
        "register": "./public/js/register.js",
        "search-meeting": "./public/js/search-meeting.js",
        "add-meeting": "./public/js/add-meeting.js",
        "teams": "./public/js/teams.js",
        "add-teams": "./public/js/add-teams.js"
    },
    output: {
        path: path.join( __dirname, "dist" ),
        filename: "[name].bundle.js",
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: "babel-loader"
            },
            {
                test: /\.css$/i,
                use: [
                    "style-loader",
                    "css-loader"
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Home',
            filename: './index.html',
            template: path.join( __dirname, 'public', 'index.html' ),
            inject: true,
            chunks: [ 'index' ]
        }),
        new HtmlWebpackPlugin({
            title: 'Meeting',
            filename: './search-meeting.html',
            template: path.join( __dirname, 'public', 'search-meeting.html' ),
            inject: true,
            chunks: [ 'search-meeting' ]
        }),
        new HtmlWebpackPlugin({
            title: 'Add Meeting',
            filename: './add-meeting.html',
            template: path.join( __dirname, 'public', 'add-meeting.html' ),
            inject: true,
            chunks: [ 'add-meeting' ]
        }),
        new HtmlWebpackPlugin({
            title: 'Team',
            filename: './teams.html',
            template: path.join( __dirname, 'public', 'teams.html' ),
            inject: true,
            chunks: [ 'teams' ]
        }),
        new HtmlWebpackPlugin({
            title: 'Login',
            filename: './login.html',
            template: path.join( __dirname, 'public', 'login.html' ),
            inject: true,
            chunks: [ 'login' ]
        }),
        new HtmlWebpackPlugin({
            title: 'Register',
            filename: './register.html',
            template: path.join( __dirname, 'public', 'register.html' ),
            inject: true,
            chunks: [ 'register' ]
        }),
        new HtmlWebpackPlugin({
            title: 'Add Team',
            filename: './add-teams.html',
            template: path.join( __dirname, 'public', 'add-teams.html' ),
            inject: true,
            chunks: [ 'add-teams' ]
        })

    ]
}