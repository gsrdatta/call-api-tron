var router = require('express').Router();
const config = require('../config');
const TronWeb = require('tronweb');
const HttpProvider = TronWeb.providers.HttpProvider;

var InitTronWeb = function(chainName, privateKey) {
    // return new Promise(async(resolve, reject) => {

    // })

    const fullNode = new HttpProvider(config.tronProvider[chainName].fullNode);
    const solidityNode = new HttpProvider(config.tronProvider[chainName].solidityNode);
    const eventServer = new HttpProvider(config.tronProvider[chainName].eventServer);
    if (privateKey && privateKey != '')
        return new TronWeb(fullNode, solidityNode, eventServer, privateKey);
    else
        return new TronWeb(fullNode, solidityNode, eventServer);
}

var freezeBalance = async function(tronWeb, amount, duration, resource, ownerAddress, receiverAddress, options, ownerPrivateKey) {
    // "amount" 1 || 20 || 53 || ... TRX
    // "duration" time freeze, min is 3 days .
    // "resource" must be either "BANDWIDTH" or "ENERGY".
    // "options" Optional, permission_id for multi-signature use. (Theo ví dụ trong document là 1)
    const tradeobj = await tronWeb.transactionBuilder.freezeBalance(tronWeb.toSun(amount), duration, resource, ownerAddress, receiverAddress, options);
    console.log('tradeobj', tradeobj);
    const signedtxn = await tronWeb.trx.sign(tradeobj, ownerPrivateKey);
    const receipt = await tronWeb.trx.sendRawTransaction(signedtxn);
    console.log('receipt', receipt);
    return receipt;
}

var unfreezeBalance = async function(tronWeb, resource, ownerAddress, receiverAddress, options, ownerPrivateKey){
    // "resource" must be either "BANDWIDTH" or "ENERGY".
    // "options" Optional, permission_id for multi-signature use. (Theo ví dụ trong document là 1)
    const tradeobj = await tronWeb.transactionBuilder.unfreezeBalance(resource, ownerAddress, receiverAddress, options);
    const signedtxn = await tronWeb.trx.sign(tradeobj, ownerPrivateKey);
    const receipt = await tronWeb.trx.sendRawTransaction(signedtxn);
    console.log('receipt', receipt);
    return receipt;
}

var sendTrx = async function(tronWeb, to, amount, from, options, ownerPrivateKey){
    // "options" Optional, permission_id for multi-signature use. (Theo ví dụ trong document là 1)
    const tradeobj = await tronWeb.transactionBuilder.sendTrx(to, tronWeb.toSun(amount), from, options);
    const signedtxn = await tronWeb.trx.sign(tradeobj, ownerPrivateKey);
    const receipt = await tronWeb.trx.sendRawTransaction(signedtxn);
    console.log('receipt', receipt);
    return receipt;
}

var sendToken = async function(tronWeb, to, amount, tokenID, from, options, ownerPrivateKey){
    // "options" Optional, permission_id for multi-signature use. (Theo ví dụ trong document là 1)
    const tradeobj = await tronWeb.transactionBuilder.sendToken(to, amount, tokenID, from, options);
    const signedtxn = await tronWeb.trx.sign(tradeobj, ownerPrivateKey);
    const receipt = await tronWeb.trx.sendRawTransaction(signedtxn);
    console.log('receipt', receipt);
    return receipt;
}



router.post('/tron', async function(req, res) {
    try {
        console.log(req.body);
        const tronWeb = InitTronWeb(req.body.chainName, null);
        switch (req.body.cate.toUpperCase()) {
            case 1:
            case 2:
            case 3:
                answer = "Low";
                break;

            case "TRONWEB":
                switch (req.body.method) {
                    case "createAccount":
                        var account = await tronWeb.createAccount();
                        res.json({ code: 1, mes: "OK", result: account });
                        break;
                    default:
                        answer = { code: -1, mes: "No method available" };
                        res.json(answer);
                }
                break;

            case "TRONWEB.TRX":
                switch (req.body.method) {
                    case "getAccount":
                        var account = await tronWeb.trx.getAccount(req.body.methodParams.address);
                        res.json({ code: 1, mes: "OK", result: account });
                        break;
                    default:
                        answer = { code: -1, mes: "No method available" };
                        res.json(answer);
                }
                break;

            case "TRONWEB.TRANSACTIONBUILDER":
                switch (req.body.method) {
                    case "freezeBalance":
                        var result = await freezeBalance(tronWeb, req.body.methodParams.amount, req.body.methodParams.duration, req.body.methodParams.resource, req.body.methodParams.ownerAddress, req.body.methodParams.receiverAddress, req.body.methodParams.options, req.body.privateKey);
                        res.json({ code: 1, mes: "OK", result: result });
                        break;

                    case "unfreezeBalance":
                        var result = await unfreezeBalance(tronWeb, req.body.methodParams.resource, req.body.methodParams.ownerAddress, req.body.methodParams.receiverAddress, req.body.methodParams.options, req.body.privateKey);
                        res.json({ code: 1, mes: "OK", result: result });
                        break;
                        
                    case "sendTrx":
                        var result = await sendTrx(tronWeb, req.body.methodParams.to, req.body.methodParams.amount, req.body.methodParams.from, req.body.methodParams.options, req.body.privateKey);
                        res.json({ code: 1, mes: "OK", result: result });
                        break;
                        
                    case "sendToken":
                        var result = await sendToken(tronWeb, req.body.methodParams.to, req.body.methodParams.amount, req.body.methodParams.tokenID, req.body.methodParams.from, req.body.methodParams.options, req.body.privateKey);
                        res.json({ code: 1, mes: "OK", result: result });
                        break;

                    default:
                        answer = { code: -1, mes: "No method available" };
                        res.json(answer);
                }
                break;

            case "TRONWEB.CONTRACT.USDT":
                answer = "Mid";
                break;

            default:
                answer = { code: -1, mes: "No cate name founded ." };
                res.json(answer);
        }
    } catch (err) {
        console.log(err);
        res.json({ status: false, err });
    }
})


module.exports = router