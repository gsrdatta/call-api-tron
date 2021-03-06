var Client = require('ducatus-wallet-client/index').default;
var BitcoreLib = require('bitcore-lib');
var fs = require('fs');
const config = require('../config');

var BWS_INSTANCE_URL = 'https://ducws.rocknblock.io/bws/api/';
global.__basedir = config.__basedir;

class DUC_HELPER {
    constructor(walletObj) {
        this.client = new Client({
            baseUrl: BWS_INSTANCE_URL,
            verbose: false,
        });
        if ((typeof walletObj) == "string")
            walletObj = JSON.parse(walletObj);
    }

    openWallet() {

    }

};
module.exports = DUC_HELPER;

// // var wallet = {
// //     name: "Phong",        // tên hiển thị trong wallet.ducatus.io
// //     user: 'Phong',        // Tên người dùng
// //     opts: {
// //         coin: 'duc',
// //         network: 'livenet',
// //         account: 0,
// //         n: 1
// //     }
// // }
module.exports.createWallet = function(wallet) {
    return new Promise((resolve, reject) => {
        // Generates a new extended private key
        var key = Client.Key.create();
        // Client to connect ducatus wallet server
        var client = new Client({
            baseUrl: BWS_INSTANCE_URL,
            verbose: false,

        });

        client.credentials = key.createCredentials(wallet.name, wallet.opts);
        client.createWallet(wallet.name, wallet.user, 1, 1, { coin: wallet.opts.coin, network: wallet.opts.network }, function(err, secret) {
            if (err) {
                console.log('error: ', err);
                return
            };
            // Handle err
            console.log('Wallet Created. Share this secret with your copayers: ' + secret);
            var secret = {
                file: __basedir + '/wallet-store/' + wallet.user + '-secret.txt',
                value: JSON.stringify(key)
            };
            var w_res = {
                file: __basedir + '/wallet-store/' + wallet.user + '.txt',
                value: client.toString()
            }
            fs.writeFileSync(secret.file, secret.value);
            fs.writeFileSync(w_res.file, w_res.value);

            // Join_Wallet(secret, wallet);
            resolve({ secret: secret, wallet: w_res });
        });
    });

}


module.exports.openWallet = function(walletObj) {
    return new Promise((resolve, reject) => {
        try {
            // Client to connect ducatus wallet server
            var client = new Client({
                baseUrl: BWS_INSTANCE_URL,
                verbose: false,

            });
            if ((typeof walletObj) == "string")
                walletObj = JSON.parse(walletObj);
            client.fromObj(walletObj);
            client.openWallet(async(err, res) => {
                if (err) {
                    resolve({ code: -1, err: err });
                } else {
                    resolve({ code: 1, client: client, result: res });
                }
            });
        } catch (err) {
            resolve({ code: -1, err: err });
        }

    });

}

module.exports.getBalance = function(client) {
    return new Promise(async(resolve, reject) => {
        client.getBalance((err, res) => {
            if (err) {
                resolve({ code: -1, err: err });
            } else {
                resolve({ code: 1, result: res });
            }
        });
    });
}

module.exports.getMainAddresses = function(client, options) {
    return new Promise(async(resolve, reject) => {
        client.getMainAddresses(options, (err, res) => {
            if (err) {
                resolve({ code: -1, err: err });
            } else {
                resolve({ code: 1, result: res });
            }
        });
    });
}

module.exports.createAddress = function(client) {
    return new Promise(async(resolve, reject) => {
        client.createAddress((err, res) => {
            if (err) {
                resolve({ code: -1, err: err });
            } else {
                resolve({ code: 1, result: res });
            }
        });
    });
}

module.exports.getTxHistory = function(client, options) {
    return new Promise(async(resolve, reject) => {
        client.getTxHistory(options, (err, res) => {
            if (err) {
                resolve({ code: -1, err: err });
            } else {
                resolve({ code: 1, result: res });
            }
        });
    });
}

// /**
// * Create a transaction proposal
// *
// * @param {Object} opts
// * @param {string} opts.txProposalId - Optional. If provided it will be used as this TX proposal ID. Should be unique in the scope of the wallet.
// * @param {Array} opts.outputs - List of outputs.
// * @param {string} opts.outputs[].toAddress - Destination address.
// * @param {number} opts.outputs[].amount - Amount to transfer in satoshi.
// * @param {string} opts.outputs[].message - A message to attach to this output.
// * @param {string} opts.message - A message to attach to this transaction.
// * @param {number} opts.feeLevel[='normal'] - Optional. Specify the fee level for this TX ('priority', 'normal', 'economy', 'superEconomy').
// * @param {number} opts.feePerKb - Optional. Specify the fee per KB for this TX (in satoshi).
// * @param {string} opts.changeAddress - Optional. Use this address as the change address for the tx. The address should belong to the wallet. In the case of singleAddress wallets, the first main address will be used.
// * @param {Boolean} opts.sendMax - Optional. Send maximum amount of funds that make sense under the specified fee/feePerKb conditions. (defaults to false).
// * @param {string} opts.payProUrl - Optional. Paypro URL for peers to verify TX
// * @param {Boolean} opts.excludeUnconfirmedUtxos[=false] - Optional. Do not use UTXOs of unconfirmed transactions as inputs
// * @param {Boolean} opts.validateOutputs[=true] - Optional. Perform validation on outputs.
// * @param {Boolean} opts.dryRun[=false] - Optional. Simulate the action but do not change server state.
// * @param {Array} opts.inputs - Optional. Inputs for this TX
// * @param {number} opts.fee - Optional. Use an fixed fee for this TX (only when opts.inputs is specified)
// * @param {Boolean} opts.noShuffleOutputs - Optional. If set, TX outputs won't be shuffled. Defaults to false
// * @returns {Callback} cb - Return error or the transaction proposal
// * @param {String} baseUrl - Optional. ONLY FOR TESTING
// */
module.exports.createTxProposal = async function(client, options) {
    return new Promise(async(resolve, reject) => {
        // options = {
        //     outputs: [{
        //         toAddress: 'M5t5xNYH7sfUmS8dH5xYzmt1c786Ho4PHz',
        //         amount: 1000000,
        //     }],
        //     feePerKb: 10000,
        //     excludeUnconfirmedUtxos: true,
        // };
        if ((typeof options) == "string")
            options = JSON.parse(options);
        client.createTxProposal(options, (err, tx) => {
            if (err) {
                resolve({ code: -1, err: err });
            } else {
                resolve({ code: 1, result: tx });
            }
        });
    });

}

module.exports.getTxProposals = async function(client, options) {
    return new Promise(async(resolve, reject) => {
        client.getTxProposals(options, (err, res) => {
            if (err) {
                resolve({ code: -1, err: err });
            } else {
                resolve({ code: 1, result: res });
            }
        });
    });
}

module.exports.removeTxProposal = async function(client, txp) {
    return new Promise(async(resolve, reject) => {
        client.removeTxProposal(txp, (err, res) => {
            if (err) {
                resolve({ code: -1, err: err });
            } else {
                resolve({ code: 1, result: res });
            }
        });
    });
}

module.exports.publishTxProposal = async function(client, tx) {
    return new Promise(async(resolve, reject) => {
        client.publishTxProposal({ txp: tx }, (err, publishTxProposal) => {
            if (err) {
                resolve({ code: -1, err: err });
            } else {
                resolve({ code: 1, result: publishTxProposal });
            }
        });
    });

}

module.exports.pushSignatures = async function(client, publishTxProposal, secretObj) {
    return new Promise(async(resolve, reject) => {
        if ((typeof secretObj) == "string")
            secretObj = JSON.parse(secretObj);
        var key = Client.Key.fromObj(secretObj);
        var signatures = key.sign(client.getRootPath(), publishTxProposal);
        client.pushSignatures(publishTxProposal, signatures, (err, txs) => {
            if (err) {
                resolve({ code: -1, err: err });
            } else {
                resolve({ code: 1, result: txs });
            }
        });
    });

}

module.exports.broadcastTxProposal = async function(client, txs) {
    return new Promise(async(resolve, reject) => {
        client.broadcastTxProposal(txs, (err, signTxProposal_res) => {
            if (err) {
                resolve({ code: -1, err: err });
            } else {
                resolve({ code: 1, result: signTxProposal_res });
            }
        });
    });

}

// module.exports.BitcoreLib



module.exports.hello = function() {
    console.log(__dirname);
    console.log(__basedir);
}