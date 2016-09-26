import config from './config/config';
import NodeUtils from './src/services/common/node-service';

const { example } = config;
if (!example) throw new Error('boilerplateExample configuration cannot be null/undefined');

const PORT = example.port;

if (NodeUtils.isProduction()) {

    const express = require('express');
    const path = require('path');
    const request = require('request');

    const app = express();

    // Configure static resources
    app.use(
        express.static(
            __dirname + '/dist'
        )
    );

    app.get('/get-distance', (req,res) => {
        var url = config.airportApi.baseUrl + "distance/" + req.query.fromAirportCode + "/" + req.query.toAirportCode;
        var queryParams = {user_key: config.airportApi.key};

        request.get({url: url, qs: queryParams, json: true}, (err, response, body) => {
            if (err) res.send(404);

            var kilometerToNauticalMile = 0.539957;
            body.distance = parseInt(body.distance.replace(',','')) * kilometerToNauticalMile;
            body.units = "nautical miles";
            res.json(body);
        });
    });

    // Configure server-side routing
    app.get('*', (req,res) => {
        const dist = path.join(
            __dirname, '/dist/index.html'
        );
        res.sendFile(dist);
    });

    // Open socket
    app.listen(PORT, () => {
        console.log(`Started Express server on port ${PORT}`);
    });

} else {

    const webpack = require('webpack');
    const WebpackDevServer = require('webpack-dev-server');
    const config = require('./webpack.config.js');

    new WebpackDevServer(webpack(config), {
        hot: true,
        historyApiFallback: true
    }).listen(PORT, 'localhost', (error, result) => {
        if (error) {
            console.log(error);
        }
        console.log(`Started WebpackDevServer on port ${PORT}`);
    });

}