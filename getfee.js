const { async } = require('regenerator-runtime');
const TronWeb = require('tronweb');
const HttpProvider = TronWeb.providers.HttpProvider;
const fullNode = new HttpProvider("https://api.shasta.trongrid.io");
const solidityNode = new HttpProvider("https://api.shasta.trongrid.io");
const eventServer = new HttpProvider("https://api.shasta.trongrid.io");
const privateKey = "614334bea511d67a0b7fcaa2378e14d418062d55ef0449c319d8e9366ec9dc65";
const tronWeb = new TronWeb(fullNode, solidityNode, eventServer);

var freezeBalance = async function(amount, duration, resource, ownerAddress, receiverAddress, options, ownerPrivateKey) {
    // "duration" time freeze, min is 3 days .
    // "resource" must be either "BANDWIDTH" or "ENERGY".
    // "options" Optional, permission_id for multi-signature use. (Theo ví dụ trong document là 1)
    const tradeobj = await tronWeb.transactionBuilder.freezeBalance(tronWeb.toSun(amount), duration, resource, ownerAddress, receiverAddress, options);
    console.log('tradeobj', tradeobj);
    const signedtxn = await tronWeb.trx.sign(tradeobj, ownerPrivateKey);
    const receipt = await tronWeb.trx.sendRawTransaction(signedtxn);
    console.log('receipt', receipt);
}

var transferTether = async function (){
    const options = {
        feeLimit: 1000000000,
        callValue: 0
    };
    var parameter = [{type:'address',value:'TZHXa9oDr9LFamcDEz8ATeQht6xSnyqLVa'},{type:'uint256',value:1600000}];
    const tradeobj = await tronWeb.transactionBuilder.triggerSmartContract(tronWeb.address.toHex("TFJ3yTZQZi4GFZk2ZhZd57azaY7S2ezaoE"), "transfer(address,uint256)", options,
    parameter,tronWeb.address.toHex("TJ19Gts3y5vH6Ld5oeNvRDA4GtyBM8EYbB"));
    console.log('tradeobj', tradeobj.transaction.raw_data.contract[0].parameter.value);
    const signedtxn = await tronWeb.trx.sign(tradeobj.transaction, privateKey);
    console.log('signedtxn', signedtxn);
    const receipt = await tronWeb.trx.sendRawTransaction(signedtxn);
    console.log('receipt', receipt);
}

var createAccount = async function() {
    var account = await tronWeb.createAccount();
    console.log('account', account);
}

var Main = async function() {
    var account = await tronWeb.trx.getAccount();
    console.log('account', account);
    // var contractInstant = tronWeb.contract().at("TFJ3yTZQZi4GFZk2ZhZd57azaY7S2ezaoE");
    // var callData = contractInstant.transfer('TJL5mE1L6h5GMQetM3zKqmwRm97xYn2vYN', 2000);
    // console.log(callData);

}

// Main();
// freezeBalance(100, 3, "ENERGY", "TJ19Gts3y5vH6Ld5oeNvRDA4GtyBM8EYbB", "TJL5mE1L6h5GMQetM3zKqmwRm97xYn2vYN", 1, privateKey);
// createAccount();
transferTether();