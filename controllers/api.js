var router = require('express').Router();
const config = require('../config');
const TronWeb = require('tronweb');
const HttpProvider = TronWeb.providers.HttpProvider;
const DUC_HELPER = require('../lib/duc_help');
const BSC_HELPER = require('../lib/bsc_help');

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

var unfreezeBalance = async function(tronWeb, resource, ownerAddress, receiverAddress, options, ownerPrivateKey) {
    // "resource" must be either "BANDWIDTH" or "ENERGY".
    // "options" Optional, permission_id for multi-signature use. (Theo ví dụ trong document là 1)
    const tradeobj = await tronWeb.transactionBuilder.unfreezeBalance(resource, ownerAddress, receiverAddress, options);
    const signedtxn = await tronWeb.trx.sign(tradeobj, ownerPrivateKey);
    const receipt = await tronWeb.trx.sendRawTransaction(signedtxn);
    console.log('receipt', receipt);
    return receipt;
}

var sendTrx = async function(tronWeb, to, amount, from, options, ownerPrivateKey) {
    // "options" Optional, permission_id for multi-signature use. (Theo ví dụ trong document là 1)
    const tradeobj = await tronWeb.transactionBuilder.sendTrx(to, tronWeb.toSun(amount), from, options);
    const signedtxn = await tronWeb.trx.sign(tradeobj, ownerPrivateKey);
    const receipt = await tronWeb.trx.sendRawTransaction(signedtxn);
    console.log('receipt', receipt);
    return receipt;
}

var sendToken = async function(tronWeb, to, amount, tokenID, from, options, ownerPrivateKey) {
    // "options" Optional, permission_id for multi-signature use. (Theo ví dụ trong document là 1)
    const tradeobj = await tronWeb.transactionBuilder.sendToken(to, amount, tokenID, from, options);
    const signedtxn = await tronWeb.trx.sign(tradeobj, ownerPrivateKey);
    const receipt = await tronWeb.trx.sendRawTransaction(signedtxn);
    console.log('receipt', receipt);
    return receipt;
}

class TetherContract {
    constructor() {
        this.ABI = "";
        this.address = "";
        this.decimal = 6;
    }

    async InitContract(tronWeb, address, ABI) {
        this.ABI = ABI;
        this.address = address;
        let res = await tronWeb.contract().at(this.address);
        return res;
    }

    static async method_Transfer(tronWeb, contractAddress, receiver, amount, issuerAddress, issuerPrivateKey) {
        //  contractAddress	The smart contract address.	hexString
        //  function	Function call, must not leave a blank space	String -> here is "transfer(address,uint256)"
        //  amount is token number * 10^(token decimal 6, 18, ....)
        //  issuerAddress Address that triggers the contract.	hexString

        var parameter = [{ type: 'address', value: receiver }, { type: 'uint256', value: amount }];
        // var parameter = [{type:'address',value:'TZHXa9oDr9LFamcDEz8ATeQht6xSnyqLVa'},{type:'uint256',value:1600000}];
        const options = {
            // feeLimit: 1000000000,
            feeLimit: 40000000,
            callValue: 0
        };

        const tradeobj = await tronWeb.transactionBuilder.triggerSmartContract(tronWeb.address.toHex(contractAddress), "transfer(address,uint256)", options,
            parameter, tronWeb.address.toHex(issuerAddress));
        // console.log('tradeobj', tradeobj.transaction.raw_data.contract[0].parameter.value);
        const signedtxn = await tronWeb.trx.sign(tradeobj.transaction, issuerPrivateKey);
        // console.log('signedtxn', signedtxn);
        const receipt = await tronWeb.trx.sendRawTransaction(signedtxn);
        console.log('receipt', receipt);
        return receipt;
    }

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
                switch (req.body.method) {
                    case "transfer":
                        //  req.body.methodParams : contractAddress, receiver, amount, issuerAddress
                        var result = await TetherContract.method_Transfer(tronWeb, req.body.methodParams.contractAddress, req.body.methodParams.receiver, req.body.methodParams.amount, req.body.methodParams.issuerAddress, req.body.privateKey);
                        res.json({ code: 1, mes: "OK", result: result });
                        break;

                    default:
                        answer = { code: -1, mes: "No method available" };
                        res.json(answer);
                }
                break;

            default:
                answer = { code: -1, mes: "No cate name founded ." };
                res.json(answer);
        }
    } catch (err) {
        console.log(err);
        res.json({ code: -1, mes: err });
    }
})


router.post('/duc-ws', async(req, res, next) => {
    try {
        console.log(req.body);
        switch (req.body.method.toUpperCase()) {
            case "CREATE_WALLET":
                var result = await DUC_HELPER.createWallet(req.body.methodParams.wallet);
                res.json({ code: 1, result: result });
                break;

            case "GET_BALANCE":
                var openWallet = await DUC_HELPER.openWallet(req.body.methodParams.wallet);
                var getbalance = await DUC_HELPER.getBalance(openWallet.client);
                res.json(getbalance);
                break;

            case "CREATE_ADDRESS":
                var openWallet = await DUC_HELPER.openWallet(req.body.methodParams.wallet);
                var createAddress = await DUC_HELPER.createAddress(openWallet.client);
                res.json(createAddress);
                break;

            case "GET_MAIN_ADDRESS":
                var openWallet = await DUC_HELPER.openWallet(req.body.methodParams.wallet);
                var getMainAddresses = await DUC_HELPER.getMainAddresses(openWallet.client, req.body.methodParams.options);
                res.json(getMainAddresses);
                break;

            case "GET_TX_HISTORY":
                var openWallet = await DUC_HELPER.openWallet(req.body.methodParams.wallet);
                var getTxHistory = await DUC_HELPER.getTxHistory(openWallet.client, req.body.methodParams.options);
                res.json(getTxHistory);
                break;

            case "SEND_DUC":
                var openWallet = await DUC_HELPER.openWallet(req.body.methodParams.wallet);
                var createTxProposal = await DUC_HELPER.createTxProposal(openWallet.client, req.body.methodParams.options);
                if (createTxProposal.code == -1)
                    return res.json(createTxProposal);
                var publishTxProposal = await DUC_HELPER.publishTxProposal(openWallet.client, createTxProposal.result);
                var pushSignatures = await DUC_HELPER.pushSignatures(openWallet.client, publishTxProposal.result, req.body.methodParams.secret);
                var broadcastTxProposal = await DUC_HELPER.broadcastTxProposal(openWallet.client, pushSignatures.result);
                res.json(broadcastTxProposal);
                break;

            default:
                answer = { code: -1, mes: "No method founded ." };
                res.json(answer);
        }

    } catch (err) {
        console.log(err);
        res.json({ code: -1, mes: err });
    }
});


router.post('/bsc', async(req, res) => {
    try {
        switch (req.body.cate.toUpperCase()) {

            case "WEB3.ETH.ACCOUNTS":
                var web3 = await BSC_HELPER.initChain(req.body.chainName);
                switch (req.body.method) {
                    case "createAccount":
                        var account = await BSC_HELPER.createAccount(web3);
                        res.json({ code: 1, mes: "OK", result: account });
                        break;
                    default:
                        answer = { code: -1, mes: "No method available" };
                        res.json(answer);
                }
                break;

            case "WEB3.ETH":
                var web3 = await BSC_HELPER.initChain(req.body.chainName);
                switch (req.body.method.toUpperCase()) {
                    case "GETBALANCE":
                        var balance = await BSC_HELPER.getBalance(web3, req.body.methodParams.address);
                        res.json({ code: 1, mes: "OK", result: balance });
                        break;

                    case "GETTRANSACTION":
                        var tran = await BSC_HELPER.getTransaction(web3, req.body.methodParams.hash);
                        res.json({ code: 1, mes: "OK", result: tran });
                        break;

                    case "GETTRANSACTIONRECEIPT":
                        var tran = await BSC_HELPER.getTransactionReceipt(web3, req.body.methodParams.hash);
                        res.json({ code: 1, mes: "OK", result: tran });
                        break;

                    case "SENDSIGNEDTRANSACTION":
                        var tran = await BSC_HELPER.sendSignedTransaction(web3, req.body.chainName, req.body.methodParams.from, req.body.methodParams.to,
                            req.body.methodParams.amount, req.body.methodParams.gasPrice, req.body.methodParams.gasLimit, req.body.methodParams.privateKey);
                        res.json({ code: 1, mes: "OK", result: tran });
                        break;


                    default:
                        answer = { code: -1, mes: "No method available" };
                        res.json(answer);
                }
                break;

            case "SMARTCONTRACT":
                var web3 = await BSC_HELPER.initChain(req.body.chainName);
                switch (req.body.method.toUpperCase()) {
                    case "BALANCEOF":
                        var funcName = 'balanceOf';
                        var funcParams = req.body.methodParams.address;
                        var balance = await BSC_HELPER.callSmartContractFunction(req.body.chainName, req.body.methodParams.address, req.body.methodParams.tokenAddress, funcName, funcParams);
                        console.log(funcName, balance);
                        res.json({ code: 1, mes: "OK", result: balance });
                        break;

                    case "TRANSFER":
                        var tokenABI = await BSC_HELPER.getContracABI(req.body.methodParams.tokenAddress);
                        var myContract = new web3.eth.Contract(tokenABI, req.body.methodParams.tokenAddress, {});
                        var decimals = await myContract.methods['decimals']().call({ from: req.body.methodParams.address });
                        var amountHex = "0x"+ (req.body.methodParams.amount * 10 ** decimals).toString(16);
                        amountHex = web3.utils.toBN(amountHex).toString();
                        // console.log('amountHex', amountHex);
                        var funcName = 'transfer';
                        var funcParams = [req.body.methodParams.receiver, amountHex];

                        var data = await myContract.methods[funcName](funcParams[0], funcParams[1]).encodeABI();
                        var gasAmount = await myContract.methods[funcName](funcParams[0], funcParams[1]).estimateGas({ gas: 5000000, from : req.body.methodParams.address });
                        // console.log(data, '\n', gasAmount);
                        var gasLimit = parseInt(gasAmount * 1.05);

                        var tran = await BSC_HELPER.xxxSendSignedTrans(req.body.chainName, web3, req.body.methodParams.address, req.body.methodParams.tokenAddress, req.body.methodParams.gasPrice, gasLimit, 0, data, req.body.methodParams.privateKey);
                        // var tran = await BSC_HELPER.sendSmartContractFunction(req.body.chainName, req.body.methodParams.address, req.body.methodParams.tokenAddress, funcName, funcParams, req.body.methodParams.gasPrice, req.body.methodParams.gasLimit, req.body.methodParams.privateKey);
                        console.log(funcName, tran);
                        res.json({ code: 1, mes: "OK", result: tran });
                        break;


                    default:
                        answer = { code: -1, mes: "No method available" };
                        res.json(answer);
                }
                break;

            default:
                answer = { code: -1, mes: "No cate name founded ." };
                res.json(answer);

        }
    } catch (err) {
        console.log(err);
        res.json({ code: -1, mes: err });
    }
})

module.exports = router