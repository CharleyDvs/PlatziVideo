import express from 'express';
import dotenv from 'dotenv';
import webpack from 'webpack';

dotenv.config();

const { ENV, PORT } = process.env;
const app = express();

if (ENV === 'development') {
    console.log('Development Config');
    const webpackConfig = require('../../webpack.config');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');
    const compiler = webpack(webpackConfig);
    const { publicPath } = webpackConfig.output;
    const serverConfig = {
        serverSideRender: true,
        publicPath
    };

    app.use(webpackDevMiddleware(compiler, serverConfig));
    app.use(webpackHotMiddleware(compiler));
}

app.get('*', (req, res) => {
    console.log('Hello')
    res.send(`
        <!DOCTYPE html>
        <html>
            <head>
            <link href="assets/app.css" rel="stylesheet" type="text/css">
                <title>Platzi Video</title>
            </head>
            <body>
                <div id="app"></div>
                <script src="assets/app.js" type="text/javascript"></script>
            </body>
        </html>
    `);
});

app.listen(PORT, err => {
    if (err) {
        console.log(err);
    } else {
        console.log('Server running on port 3000');
    }
});