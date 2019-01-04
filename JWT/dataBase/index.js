const Sequelize = require('sequelize');
const fs = require('fs');
const resolve = require('path').resolve;
const DBName = 'jwtbase';
const DBUser = 'user';
const DBPass = 'user';

module.exports = (() => {
    let instance;
    function initConnection() {
        let client = new Sequelize(DBName, DBUser, DBPass, {
            host: 'localhost',
            dialect: 'mysql',
            operatorsAliases: false,
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
            }
        });
        let models = {};

        function getModels() {
            fs.readdir('./dataBase/models', (err, files) => {
                files.forEach(file => {
                    const modelName = file.split('.')[0];
                    models[modelName] = client.import(resolve(`./dataBase/models/${modelName}`));
                });
            });
        }

        return {
            getModel: (modelName) => models[modelName],
            setModels: () => {
                return getModels();
            }
        };
    }

    return {
        getInstance: () => {
            if (!instance) {
                instance = initConnection();
            }
            return instance;
        }
    }
})();