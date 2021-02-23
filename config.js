const ip = require("ip").address();
console.log(process.env.PORT);
var port = process.env.PORT || 2000;

var publicPath = '';
var databaseCF = {
    connectStr: 'mongodb://45.32.126.133:27118/dapp-level',
    options: {
        // keepAlive: true,
        // reconnectTries: Number.MAX_VALUE,
        // useMongoClient: true,
        useCreateIndex: true,
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        replicaSet: 'rs0',
        user: 'levelapp',
        pass: 'levelapp!@#@123'
    }

}

if (ip == '45.32.126.133') {
    console.log(' o server');
    databaseCF = {
        connectStr: 'mongodb://45.32.126.133:27118/dapp-level',
        options: {
            keepAlive: true,
            reconnectTries: Number.MAX_VALUE,
            // useMongoClient: true,
            useCreateIndex: true,
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
            replicaSet: 'rs0',
            user: 'levelapp',
            pass: 'levelapp!@#@123'
        }
    }
    publicPath = '/home/demo-app/';
}


module.exports = {
    port: port,
    trxChain: 'shasta',
    secret: 'yolo_kameyoko_lololo',
    'database': databaseCF,
    'privateIP': ip,
    'allowIP': '127.0.0.1',
    tronProvider: {
        mainnet: {
            coinContract: 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t',
            coinDecimal: 6,
            fullNode: "https://api.trongrid.io",
            solidityNode: "https://api.trongrid.io",
            eventServer: "https://api.trongrid.io"
        },
        shasta: {
            coinContract: 'TFJ3yTZQZi4GFZk2ZhZd57azaY7S2ezaoE',
            coinDecimal: 6,
            fullNode: "https://api.shasta.trongrid.io",
            solidityNode: "https://api.shasta.trongrid.io",
            eventServer: "https://api.shasta.trongrid.io",
            tokenContract: 'TXdXvDcQDkwF7NwkrkaLbGgd31RuvfjRHC',
            tokenDecimal: 18,
        },
        nile: {
            fullNode: "https://api.nileex.io",
            solidityNode: "https://api.nileex.io",
            eventServer: "https://event.nileex.io"
        }
    }
};