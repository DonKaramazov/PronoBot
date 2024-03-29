const mongoose = require('mongoose');

module.exports = {
    init: () => {
        const dbOptions = {
            useNewUrlParser: true,
            autoIndex: false,
            reconnectTries: Number.MAX_VALUE,
            reconnectInterval: 500,
            poolSize: 5,
            connectTimeoutMS: 10000,
            family : 4
        };

        mongoose.connect('mongodb://localhost:27017/PronoSpm',dbOptions);
        mongoose.set('useFindAndModify',false);
        mongoose.Promise = global.Promise;

        mongoose.connection.on('connected', () => {
            console.log('Mongoose connexion succés');
        });

        mongoose.connection.on('err', () => {
            console.error(`Mongoose echec de la connexion: \n ${err.stack} `);
        });

        mongoose.connection.on('disconnected', () => {
            console.log('Mongoose deconnexion');
        });
    }
};