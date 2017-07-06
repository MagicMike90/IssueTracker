import express from 'express';
import bodyParser from 'body-parser';
import {MongoClient} from 'mongodb';
import Issue from './issue.js';
import 'babel-polyfill';
import SourceMapSupport from 'source-map-support';

SourceMapSupport.install();

const app = express();
app.use(express.static('static'));
app.use(bodyParser.json());

if (process.env.NODE_ENV !== 'production') {
    const webpack = require('webpack');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');

    const config = require('../webpack.config');
    config.entry.app.push('webpack-hot-middleware/client', 'webpack/hot/only-dev-server');
    config.plugins.push(new webpack.HotModuleReplacementPlugin());

    const bundler = webpack(config);
    app.use(webpackDevMiddleware(bundler, {
        noInfo: true
    }));
    app.use(webpackHotMiddleware(bundler, {
        log: console.log
    }));
}

app.get('/api/issues', (req, res) => {
    const filters = {};
    if(req.query.status) filters.status = req.query.status;
    
    db.collection('issues').find().toArray().then(issues => {
        const metadata = {
            total_count: issues.length
        };
        // throw new Error('Test!');
        res.json({
            _metadata: metadata,
            records: issues
        })
    }).catch(error => {
        console.log(error);
        res.status(500).json({
            message: `Internal Server Error: ${error}`
        });
    });
});

app.post('/api/issues', (req, res) => {

    const newIssue = req.body;
    // newIssue.id = issues.length + 1;
    newIssue.created = new Date();
    if (!newIssue.status)
        newIssue.status = 'New';

    const err = Issue.validateIssue(newIssue)
    if (err) {
        res.status(422).json({
            message: `Invalid requrest: ${err}`
        });
        return;
    }
    db.collection('issues').insertOne(Issue.cleanupIssue(newIssue)).then(result =>
        db.collection('issues').find({
            _id: result.insertedId
        }).limit(1).next()
    ).then(newIssue => {
        res.json(newIssue);
    }).catch(error => {
        console.log(error);
        res.status(500).json({
            message: `Internal Server Error: ${error}`
        });
    });
});


const server_port = 8080;
const url = 'mongodb://mongodb:27017/issuetracker';
let db;

MongoClient.connect(url).then(connection => {
    console.log('monogdb connected')
    db = connection;
    app.listen(server_port, () => {
        console.log('App started on port ' + server_port);
    });
}).catch(error => {
    console.log('ERROR:', error);
});
