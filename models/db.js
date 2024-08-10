const mongoose = require('mongoose');

module.exports.connect = uri => {
    /* eslint-disable no-console */
    mongoose.connect(uri).then(() => console.log('Database Connected Successfully.'));
    mongoose.Promise = global.Promise;

    mongoose.connection.on('error', err => {
        console.error(`Mongoose connection error: ${err}`);
        process.exit(1);
    });

};
