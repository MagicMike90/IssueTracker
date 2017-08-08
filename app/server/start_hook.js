// this module automatically ignores libraries loaded from node_modules
// automatically compile files on the fly
require('babel-register')({
    presets: ['es2015-node6']
});
require('./server.js');
