const Web3 = require('web3');
var Tx = require('ethereumjs-tx').Transaction;
const Common = require('ethereumjs-common');

// mainnet
// const web3 = new Web3('https://bsc-dataseed1.binance.org:443');

// testnet
// const web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545');

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

module.exports.getBalance = async function(chain ,address) {
    var web3 = await BSC_HELPER.initChain(chain);
    var balance = await web3.eth.getBalance(address);
    return web3.utils.fromWei(balance, 'ether');
    // console.log('balance', balance);
    // console.log(web3.utils.fromWei(balance, 'ether'));
}

module.exports.createAccount = async function(chain){
    var web3 = await BSC_HELPER.initChain(chain);
    const account = await web3.eth.accounts.create();
    return account;
}

module.exports.getTransactionCount = async function(web3, address){
    // var web3 = await BSC_HELPER.initChain(chain);
    var count = await web3.eth.getTransactionCount(address);
    return count;
}

module.exports.sendSignedTransaction = async function(chain, from, to , amount, gasPrice, gasLimit, privateKey){
    // try{    
        var web3 = await BSC_HELPER.initChain(chain);
        var nonce = await BSC_HELPER.getTransactionCount(web3, from);
        var rawTransaction = {
            "nonce": web3.utils.toHex(nonce),
            "from": from,
            "gasPrice": web3.utils.toHex(web3.utils.toWei('30', 'gwei')),
            "gasLimit": web3.utils.toHex(21000),
            "to": to,
            "value": web3.utils.toHex(amount) ,
            // "chainId": 56 //remember to change this
        };

        if(gasPrice != null && gasPrice != ''){
            rawTransaction.gasPrice = gasPrice;
        }

        if(gasLimit != null && gasLimit != ''){
            rawTransaction.gasLimit = gasLimit;
        }

        // if(chain == "testnet"){
        //     rawTransaction.chainId = 97;
        // }

        var privKey = Buffer.from(privateKey, 'hex');
        const common = Common.default.forCustomChain('mainnet', {
            name: 'Binance Smart Chain Testnet',
            networkId: 97,
            chainId: 97,
            url: "https://testnet.bscscan.com"
        }, 'petersburg');
        
        var tx = new Tx(rawTransaction, { common: common });
        // console.log(tx.getChainId());
        console.log('rawTransaction', tx);
        tx.sign(privKey);
        console.log('sign', tx);
        var serializedTx = tx.serialize();
        // console.log('serializedTx', serializedTx);
        web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex')).then((err, result) => {
            console.log(err, result);
        });
        // console.log('Txn Sent and hash is ', result);
    // }catch(err){
    //     console.log('co loi roi'. err);
    // }
    


}


