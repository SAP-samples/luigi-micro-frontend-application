const path = require('path');

module.exports = {
    entry: './src/luigi-config/luigi-config.es6.js',
    output: {
        filename: 'luigi-config.js',
        path: path.resolve(__dirname, 'public'),
    },
};
