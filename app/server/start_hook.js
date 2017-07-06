// this module automatically ignores libraries loaded from node_modules
require('babel-register')({
    presets: ['es2015-node6']
});
require('./server.js');
