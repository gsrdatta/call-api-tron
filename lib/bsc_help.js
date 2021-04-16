const Web3 = require('web3');
var Tx = require('ethereumjs-tx').Transaction;
const Common = require('ethereumjs-common');

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

module.exports.initChain = async function(chain){
    return new Promise((resolve)=> {
        var xxx;
        if(chain == 'mainnet'){
            xxx = new Web3('https://bsc-dataseed1.binance.org:443');
        }else if(xxx == "testnet"){
            xxx = new Web3('https://data-seed-prebsc-2-s1.binance.org:8545');
        }else{
            xxx = new Web3('https://data-seed-prebsc-2-s1.binance.org:8545');
        }
        resolve(xxx);
    })
    
}

module.exports.getBalance = async function(web3 ,address) {
    // var web3 = await BSC_HELPER.initChain(chain);
    var balance = await web3.eth.getBalance(address);
    return web3.utils.fromWei(balance, 'ether');
    // console.log(web3.utils.fromWei(balance, 'ether'));
}

module.exports.createAccount = async function(web3){
    // var web3 = await BSC_HELPER.initChain(chain);
    const account = await web3.eth.accounts.create();
    return account;
}

module.exports.getTransactionCount = async function(web3, address){
    var count = await web3.eth.getTransactionCount(address);
    return count;
}

module.exports.sendSignedTransaction = async function(web3, chain, from, to , amount, gasPrice, gasLimit, privateKey){
    // var web3 = await BSC_HELPER.initChain(chain);
    var nonce = await BSC_HELPER.getTransactionCount(web3, from);
    var rawTransaction = {
        "nonce": web3.utils.toHex(nonce),
        "from": from,
        "gasPrice": web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
        "gasLimit": web3.utils.toHex(21000),
        "to": to,
        "value": web3.utils.toHex(amount) ,
        // "chainId": 56 //remember to change this
    };

    if(gasPrice != null && gasPrice != ''){
        rawTransaction.gasPrice = web3.utils.toHex(gasPrice);
    }

    if(gasLimit != null && gasLimit != ''){
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
    if(chain == "mainnet"){
        tx = new Tx(rawTransaction, { common: common_Mainnet });
    }else{
        tx = new Tx(rawTransaction, { common: common_Testnet });
    }

    // console.log('rawTransaction', tx);
    tx.sign(privKey);
    // console.log('sign', tx);
    var serializedTx = tx.serialize();
    // console.log('serializedTx', serializedTx);

    // web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex')).then((err, result) => {
    //     console.log(err, result);
    // });

    var result = await web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'));
    return result;
    // console.log('Txn Sent and hash is ', result);

}


module.exports.getTransaction = async function(web3, txhash){
    var res = await web3.eth.getTransaction(txhash);
    return res;
}

module.exports.getTransactionReceipt = async function(web3, txhash){
    var res = await web3.eth.getTransactionReceipt(txhash);
    return res;
}
