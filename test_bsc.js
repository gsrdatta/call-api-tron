
const BSC_HELPER = require('./lib/bsc_help');
var acc1 = "0x7EaBBb7dcE696e00a2644eE41Ceb01fB7b55204c";
var privateKey1 = "9ab22714d758b2a1a885eba813a6b7f132b1b437f707953a32ecb40d5b3cdc21";

var main = async function() {
    // var balance = await BSC_HELPER.getBalance("testnet","0x7EaBBb7dcE696e00a2644eE41Ceb01fB7b55204c");
    // console.log('balance', balance);

    // var account = await BSC_HELPER.createAccount("testnet");
    // console.log('create account', account);

    // var count = await BSC_HELPER.getTransactionCount("testnet", '0x7EaBBb7dcE696e00a2644eE41Ceb01fB7b55204c');
    // console.log('getTransactionCount', count);

    // var result = await BSC_HELPER.sendSignedTransaction('testnet', acc1, '0xf620d56DC0Cc7C22eedac4e8Fb36D893299A2c24' , 10000000000000000, null, null, privateKey1);
    // console.log('Txn Sent and hash is ', result);

    var getTransactionReceipt = await BSC_HELPER.getTransactionReceipt("testnet", '0xe4b4c36cfb33c3535fcd2b5b0a6db38b545808a0a25c7b02cdf739f5d9253bbe');
    console.log('getTransactionReceipt', getTransactionReceipt);
}


main();