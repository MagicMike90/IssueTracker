import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';
import { ObjectId } from 'mongodb';
import 'babel-polyfill';

import SourceMapSupport from 'source-map-support';
import path from 'path';

import Issue from './issue.js';



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

    const compiler = webpack(config);
    app.use(webpackDevMiddleware(compiler, {
        noInfo: true
    }));
    app.use(webpackHotMiddleware(compiler, {
        log: console.log
    }));

    console.log('Enable webpackDevMiddleware and webpackHotMiddleware');
}

app.get('/api/issues', (req, res) => {

    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    if (req.query.effort_lte || req.query.effort_gte) filter.effort = {};
    if (req.query.effort_lte) filter.effort.$lte = parseInt(req.query.effort_lte, 10);
    if (req.query.effort_gte) filter.effort.$gte = parseInt(req.query.effort_gte, 10);
    if (req.query.search) filter.$text = { $search: req.query.search };

    if (req.query._summary === undefined) {
        const offset = req.query._offset ? parseInt(req.query._offset, 10) : 0;
        let limit = req.query._limit ? parseInt(req.query._limit, 10) : 20;

        console.log('offset', offset);
        console.log('limit', limit);

        if (limit > 50) limit = 50;
        const cursor = db.collection('issues').find(filter).sort({ _id: 1 }).skip(offset).limit(limit);

        let totalCount;
        // ensures that the effects of skip() and limit() will be ignored
        cursor.count(false).then(result => {
            totalCount = result;
            return cursor.toArray();
        }).then(issues => {
            res.json({ metadata: { totalCount }, records: issues });
        }).catch(error => {
            console.log(error);
            res.status(500).json({ message: `Internal Server Error: ${error}` });
        });
    } else {
        console.log('doing aggregation', filter);
        db.collection('issues').aggregate([
            { $match: filter },
            {
                $group: {
                    _id: { owner: '$owner', status: '$status' }, count: {
                        $sum: 1
                    }
                }
            },
        ]).toArray()
            .then(results => {
                const stats = {};
                results.forEach(result => {
                    if (!stats[result._id.owner]) stats[result._id.owner] = {};
                    stats[result._id.owner][result._id.status] = result.count;
                });
                console.log('stats', stats);
                res.json(stats);
            })
            .catch(error => {
                console.log(error);
                res.status(500).json({ message: `Internal Server Error: ${error}` });
            });
    }
});
app.post('/api/issues', (req, res) => {
    const newIssue = req.body;
    newIssue.created = new Date();
    if (!newIssue.status) {
        newIssue.status = 'New';
    }

    const err = Issue.validateIssue(newIssue);
    if (err) {
        res.status(422).json({ message: `Invalid request: ${err}` });
        return;
    }

    db.collection('issues').insertOne(Issue.cleanupIssue(newIssue)).then(result =>
        db.collection('issues').find({ _id: result.insertedId }).limit(1)
        .next()
    )
    .then(savedIssue => {
        res.json(savedIssue);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error: ${error}` });
    });
});
app.get('/api/issues/:id', (req, res) => {
    let issueId;
    try {
        issueId = new ObjectId(req.params.id);
    } catch (error) {
        res.status(422).json({ message: `Invalid issue ID format: ${error}` });
        return;
    }
    db.collection('issues').find({ _id: issueId }).limit(1)
        .next()
        .then(issue => {
            if (!issue) res.status(404).json({ message: `No such issue: ${issueId}` });
            else res.json(issue);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: `Internal Server Error: ${error}` });
        });
});
// Add routes for handling PATCH request
app.put('/api/issues/:id', (req, res) => {
    let issueId;
    try {
        issueId = new ObjectId(req.params.id);
    } catch (error) {
        res.status(422).json({ message: `Invalid issue ID format: ${error}` });
        return;
    }
    const issue = req.body;

    // MongoDB update operation treats the ID specially, and leaves it
    // intact even if not present in the document that replaces the existing document.
    delete issue._id;

    const err = Issue.validateIssue(issue);
    if (err) {
        res.status(422).json({ message: `Invalid request: ${err}` });
        return;
    }
    db.collection('issues').update({ _id: issueId },
        Issue.convertIssue(issue)).then(() =>
            db.collection('issues').find({ _id: issueId }).limit(1).next()
        ).then(savedIssue => {
            res.json(savedIssue);
        }).catch(error => {
            console.log(error);
            res.status(500).json({ message: `Internal Server Error: ${error}` });
        });
});

// Server delete method
app.delete('/api/issues/:id', (req, res) => {
    let issueId;
    try {
        issueId = new ObjectId(req.params.id);
    } catch (error) {
        res.status(422).json({ message: `Invalid issue ID format: ${error}` });
        return;
    }
    db.collection('issues').deleteOne({ _id: issueId }).then((deleteResult) => {
        if (deleteResult.result.n === 1) res.json({ status: 'OK' });
        else res.json({ status: 'Warning: object not found' });
    }).catch(error => {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error: ${error}` });
    });
});

// For bulk delete
app.delete('/api/issues/', (req, res) => {

    let issueIds = req.body.issueIds

    try {
        issueIds = issueIds.map(id => new ObjectId(id));

        // for(let i = 0; i < issueIds.length; i++) {
        //     issueIds[i] =  new ObjectId( issueIds[i] );
        // }
    } catch (error) {
        res.status(422).json({
            message: `Invalid issue ID format: ${error}`
        });
        return;
    }
  
    db.collection('issues').deleteMany({ _id: {'$in':issueIds} }).then((deleteResult) => {
        console.log('deleteResult',deleteResult);
        if (deleteResult.result.n === issueIds.length) res.json({ status: 'OK' });
        else res.json({ status: 'Warning: object not found' });
    }).catch(error => {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error: ${error}` });
    });
});
// It has to be placed at the end of all routes
app.get('*', (req, res) => {
    console.log('route to no where');
    res.sendFile(path.resolve('static/index.html'));
});

const server_port = 8080;
// const url = 'mongodb://mongodb:27017/issuetracker';
const url = 'mongodb://localhost:27018/issuetracker';
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
