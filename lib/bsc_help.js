const Web3 = require('web3');
var Tx = require('ethereumjs-tx').Transaction;
const Common = require('ethereumjs-common');
const https = require('https');
var Contract = require('web3-eth-contract');

// mainnet
// const web3 = new Web3('https://bsc-dataseed1.binance.org:443');
const common_Mainnet = Common.default.forCustomChain('mainnet', {
    name: 'Binance Smart Chain',
    networkId: 56,
    chainId: 56,
    url: "https://bscscan.com"
}, 'petersburg');

// testnet
// const web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545');
const common_Testnet = Common.default.forCustomChain('mainnet', {
    name: 'Binance Smart Chain Testnet',
    networkId: 97,
    chainId: 97,
    url: "https://testnet.bscscan.com"
}, 'petersburg');


class BSC_HELPER {
    constructor(walletObj) {

    }

    openWallet() {

    }

};
module.exports = BSC_HELPER;

module.exports.initChain = async function(chain) {
    return new Promise((resolve) => {
        var xxx;
        if (chain == 'mainnet') {
            xxx = new Web3('https://bsc-dataseed1.binance.org:443');
        } else if (xxx == "testnet") {
            xxx = new Web3('https://data-seed-prebsc-2-s1.binance.org:8545');
        } else {
            xxx = new Web3('https://data-seed-prebsc-2-s1.binance.org:8545');
        }
        resolve(xxx);
    })

}

module.exports.getBalance = async function(web3, address) {
    // var web3 = await BSC_HELPER.initChain(chain);
    var balance = await web3.eth.getBalance(address);
    return web3.utils.fromWei(balance, 'ether');
    // console.log(web3.utils.fromWei(balance, 'ether'));
}

module.exports.createAccount = async function(web3) {
    // var web3 = await BSC_HELPER.initChain(chain);
    const account = await web3.eth.accounts.create();
    return account;
}

module.exports.getTransactionCount = async function(web3, address) {
    var count = await web3.eth.getTransactionCount(address);
    return count;
}

module.exports.sendSignedTransaction = async function(web3, chain, from, to, amount, gasPrice, gasLimit, privateKey) {
    // var web3 = await BSC_HELPER.initChain(chain);
    var nonce = await BSC_HELPER.getTransactionCount(web3, from);
    var rawTransaction = {
        "nonce": web3.utils.toHex(nonce),
        "from": from,
        "gasPrice": web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
        "gasLimit": web3.utils.toHex(21000),
        "to": to,
        "value": web3.utils.toHex(amount),
        // "chainId": 56 //remember to change this
    };

    if (gasPrice != null && gasPrice != '') {
        rawTransaction.gasPrice = web3.utils.toHex(gasPrice);
    }

    if (gasLimit != null && gasLimit != '') {
        rawTransaction.gasLimit = web3.utils.toHex(gasLimit);
    }


    var privKey = Buffer.from(privateKey, 'hex');
    const common = Common.default.forCustomChain('mainnet', {
        name: 'Binance Smart Chain Testnet',
        networkId: 97,
        chainId: 97,
        url: "https://testnet.bscscan.com"
    }, 'petersburg');

    var tx;
    if (chain == "mainnet") {
        tx = new Tx(rawTransaction, { common: common_Mainnet });
    } else {
        tx = new Tx(rawTransaction, { common: common_Testnet });
    }

    try {
        // console.log('rawTransaction', tx);
        tx.sign(privKey);
        // console.log('sign', tx);
        var serializedTx = tx.serialize();
        // console.log('serializedTx', serializedTx);

        // web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex')).then((err, result) => {
        //     console.log(err, result);
        // });

        var result = await web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'));
        console.log('Txn Sent and hash is ', result);
        return result;

    } catch (err) {
        // console.log('err !!');
        return null;
    }



}


module.exports.getTransaction = async function(web3, txhash) {
    var res = await web3.eth.getTransaction(txhash);
    return res;
}

module.exports.getTransactionReceipt = async function(web3, txhash) {
    var res = await web3.eth.getTransactionReceipt(txhash);
    return res;
}

///////// for smart contract 
module.exports.getContracABI = async function(chain, address) {
    var path = 'https://api-testnet.bscscan.com/api?module=contract&action=getabi&address=' + address + '&format=raw';
    if(chain == "mainnet")
        path = 'https://api.bscscan.com/api?module=contract&action=getabi&address=' + address + '&format=raw&apikey=W86WE61N6XZ63C7YGECJPWPT1IN994HWNE';
    return new Promise((resolve, reject) => {
        https.get(path, (resp) => {
            let data = '';

            // A chunk of data has been received.
            resp.on('data', (chunk) => {
                data += chunk;
            });

            // The whole response has been received. Print out the result.
            resp.on('end', () => {
                // console.log('request data', JSON.parse(data));
                resolve(JSON.parse(data));
            });

        }).on("error", (err) => {
            console.log("Error: " + err.message);
            reject(err);
        });
    });
    //0x488cde4f32845b914a4acedf45061092f2a9dac9
}

module.exports.getTokenBalance = async function(chain, address, tokenAddress) {
    return new Promise(async(resolve, reject) => {
        var web3 = await BSC_HELPER.initChain(chain);
        var tokenABI = await BSC_HELPER.getContracABI(chain, tokenAddress);
        var myContract = new web3.eth.Contract(tokenABI, tokenAddress, {
            from: address, // default from address
            gasPrice: '20000000000' // default gas price in wei, 20 gwei in this case
        });
        // console.log('myContract', myContract);
        myContract.methods.balanceOf(address).call({ from: address }, function(err, res) {
            // console.log('balance of ', address, ' is : ', err, res);
            if (err) {
                console.log("Error: " + err);
                reject(null);
            } else {
                resolve(res);
            }
        });
    });

}


module.exports.xxxSendSignedTrans = async function(chain, web3, fromAdd, toAdd, gasPrice, gasLimit, value, data, privateKey) {
    var nonce = await BSC_HELPER.getTransactionCount(web3, fromAdd);
    var rawTransaction = {
        "nonce": web3.utils.toHex(nonce),
        "from": fromAdd,
        "gasPrice": web3.utils.toHex(web3.utils.toWei('20', 'gwei')),
        "gasLimit": web3.utils.toHex(210000),
        "to": toAdd,
        "value": web3.utils.toHex(value),
    };

    if (data != null && data != '') {
        rawTransaction.data = data;
    }

    if (gasPrice != null && gasPrice != '') {
        rawTransaction.gasPrice = web3.utils.toHex(gasPrice);
    }

    if (gasLimit != null && gasLimit != '') {
        rawTransaction.gasLimit = web3.utils.toHex(gasLimit);
    }

    var privKey = Buffer.from(privateKey, 'hex');
    var tx;
    if (chain == "mainnet") {
        tx = new Tx(rawTransaction, { common: common_Mainnet });
    } else {
        tx = new Tx(rawTransaction, { common: common_Testnet });
    }

    try {
        // console.log('rawTransaction', tx);
        tx.sign(privKey);
        // console.log('sign', tx);
        var serializedTx = tx.serialize();
        // console.log('serializedTx', serializedTx);
        var result = await web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'));
        // console.log('Txn xxxSendSignedTrans is ', result);
        return result;

    } catch (err) {
        console.log('err !!', err);
        return null;
    }
}
module.exports.callSmartContractFunction = async function(chain, address, tokenAddress, funcName, funcParams) {
    return new Promise(async(resolve, reject) => {
        var web3 = await BSC_HELPER.initChain(chain);
        var tokenABI = await BSC_HELPER.getContracABI(chain, tokenAddress);
        var myContract = new web3.eth.Contract(tokenABI, tokenAddress, {
            // from: address, // default from address
            // gasPrice: '20000000000' // default gas price in wei, 20 gwei in this case
        });
        // console.log('myContract', myContract);
        myContract.methods[funcName](funcParams).call({ from: address }, function(err, res) {
            // console.log('balance of ', address, ' is : ', err, res);
            if (err) {
                console.log("Error: " + err);
                reject(null);
            } else {
                resolve(res);
            }
        });
    });
}

module.exports.sendSmartContractFunction = async function(chain, address, tokenAddress, funcName, funcParams, gasPrice, gasLimit, privateKey) {
    return new Promise(async(resolve, reject) => {
        var web3 = await BSC_HELPER.initChain(chain);
        var tokenABI = await BSC_HELPER.getContracABI(chain, tokenAddress);
        var myContract = new web3.eth.Contract(tokenABI, tokenAddress, {});

        // myContract.methods[funcName](funcParams).call({ from: address }, function(err, res) {
        //     // console.log('balance of ', address, ' is : ', err, res);
        //     if (err) {
        //         console.log("Error: " + err);
        //         reject(null);
        //     } else {
        //         resolve(res);
        //     }
        // });

        // console.log('myContract.methods[funcName]', myContract.methods['transferFrom']('0x99467e6D01c427d4296bcD57C7334b62888f9480', '0x7EaBBb7dcE696e00a2644eE41Ceb01fB7b55204c', web3.utils.toHex(1000000000000000000)).encodeABI());

        var data = null;
        if (funcParams.length == 1)
            data = myContract.methods[funcName](funcParams[0]).encodeABI();
        if (funcParams.length == 2)
            data = myContract.methods[funcName](funcParams[0], funcParams[1]).encodeABI();
        if (funcParams.length == 3)
            data = myContract.methods[funcName](funcParams[0], funcParams[1], funcParams[2]).encodeABI();
        if (funcParams.length == 4)
            data = myContract.methods[funcName](funcParams[0], funcParams[1], funcParams[2], funcParams[3]).encodeABI();
        if (funcParams.length == 5)
            data = myContract.methods[funcName](funcParams[0], funcParams[1], funcParams[2], funcParams[3], funcParams[4]).encodeABI();
        console.log(data);
        // myContract.methods.transfer('0x7EaBBb7dcE696e00a2644eE41Ceb01fB7b55204c', web3.utils.toHex(1000000000000000000)).estimateGas({ gas: 5000000 }, function(error, gasAmount) {
        //     // if(gasAmount == 5000000)
        //     //     console.log('Method ran out of gas');
        //     console.log('estimateGas', error, gasAmount);
        // });

        var xxx = await BSC_HELPER.xxxSendSignedTrans(chain, web3, address, tokenAddress, gasPrice, gasLimit, 0, data, privateKey);
        resolve(xxx);
        // var nonce = await BSC_HELPER.getTransactionCount(web3, address);
        // var rawTransaction = {
        //     "nonce": web3.utils.toHex(nonce),
        //     "from": address,
        //     "gasPrice": web3.utils.toHex(web3.utils.toWei('20', 'gwei')),
        //     "gasLimit": web3.utils.toHex(210000),
        //     "to": tokenAddress,
        //     "value": "0x0",
        //     "data": data,
        //     // "data": contract.transfer.getData("0xCb...", 10, { from: "0x26..." }),
        //     // "chainId": 56 //remember to change this
        // };

        // if (gasPrice != null && gasPrice != '') {
        //     rawTransaction.gasPrice = web3.utils.toHex(gasPrice);
        // }

        // if (gasLimit != null && gasLimit != '') {
        //     rawTransaction.gasLimit = web3.utils.toHex(gasLimit);
        // }


        // var privKey = Buffer.from(privateKey, 'hex');
        // var tx;
        // if (chain == "mainnet") {
        //     tx = new Tx(rawTransaction, { common: common_Mainnet });
        // } else {
        //     tx = new Tx(rawTransaction, { common: common_Testnet });
        // }

        // try {
        //     // console.log('rawTransaction', tx);
        //     tx.sign(privKey);
        //     // console.log('sign', tx);
        //     var serializedTx = tx.serialize();
        //     // console.log('serializedTx', serializedTx);

        //     // web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex')).then((err, result) => {
        //     //     console.log(err, result);
        //     // });

        //     var result = await web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'));
        //     console.log('Txn Sent and hash is ', result);
        //     return result;

        // } catch (err) {
        //     console.log('err !!', err);
        //     return null;
        // }

    });
}