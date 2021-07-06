const config = require('../config');
const TronWeb = require('tronweb');
const HttpProvider = TronWeb.providers.HttpProvider;


class TRC_HELPER {
    static tether_ABI = [{ "constant": false, "inputs": [{ "name": "tokens_sold", "type": "uint256" }, { "name": "min_trx", "type": "uint256" }, { "name": "deadline", "type": "uint256" }, { "name": "recipient", "type": "address" }], "name": "tokenToTrxTransferInput", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "name", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "spender", "type": "address" }, { "name": "value", "type": "uint256" }], "name": "approve", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "trx_bought", "type": "uint256" }, { "name": "max_tokens", "type": "uint256" }, { "name": "deadline", "type": "uint256" }, { "name": "recipient", "type": "address" }], "name": "tokenToTrxTransferOutput", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "from", "type": "address" }, { "name": "to", "type": "address" }, { "name": "value", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "spender", "type": "address" }, { "name": "addedValue", "type": "uint256" }], "name": "increaseAllowance", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "min_liquidity", "type": "uint256" }, { "name": "max_tokens", "type": "uint256" }, { "name": "deadline", "type": "uint256" }], "name": "addLiquidity", "outputs": [{ "name": "", "type": "uint256" }], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": false, "inputs": [{ "name": "min_tokens", "type": "uint256" }, { "name": "deadline", "type": "uint256" }], "name": "trxToTokenSwapInput", "outputs": [{ "name": "", "type": "uint256" }], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": false, "inputs": [{ "name": "token_addr", "type": "address" }], "name": "setup", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "owner", "type": "address" }], "name": "balanceOf", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "tokens_bought", "type": "uint256" }, { "name": "deadline", "type": "uint256" }, { "name": "recipient", "type": "address" }], "name": "trxToTokenTransferOutput", "outputs": [{ "name": "", "type": "uint256" }], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": true, "inputs": [{ "name": "input_amount", "type": "uint256" }, { "name": "input_reserve", "type": "uint256" }, { "name": "output_reserve", "type": "uint256" }], "name": "getInputPrice", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "tokens_sold", "type": "uint256" }], "name": "getTokenToTrxInputPrice", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "factoryAddress", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "trx_sold", "type": "uint256" }], "name": "getTrxToTokenInputPrice", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "tokens_bought", "type": "uint256" }, { "name": "max_tokens_sold", "type": "uint256" }, { "name": "max_trx_sold", "type": "uint256" }, { "name": "deadline", "type": "uint256" }, { "name": "recipient", "type": "address" }, { "name": "exchange_addr", "type": "address" }], "name": "tokenToExchangeTransferOutput", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "tokens_sold", "type": "uint256" }, { "name": "min_trx", "type": "uint256" }, { "name": "deadline", "type": "uint256" }], "name": "tokenToTrxSwapInput", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "trx_bought", "type": "uint256" }, { "name": "max_tokens", "type": "uint256" }, { "name": "deadline", "type": "uint256" }], "name": "tokenToTrxSwapOutput", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "tokenAddress", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "spender", "type": "address" }, { "name": "subtractedValue", "type": "uint256" }], "name": "decreaseAllowance", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "tokens_bought", "type": "uint256" }], "name": "getTrxToTokenOutputPrice", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "tokens_bought", "type": "uint256" }, { "name": "deadline", "type": "uint256" }], "name": "trxToTokenSwapOutput", "outputs": [{ "name": "", "type": "uint256" }], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": false, "inputs": [{ "name": "to", "type": "address" }, { "name": "value", "type": "uint256" }], "name": "transfer", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "tokens_bought", "type": "uint256" }, { "name": "max_tokens_sold", "type": "uint256" }, { "name": "max_trx_sold", "type": "uint256" }, { "name": "deadline", "type": "uint256" }, { "name": "token_addr", "type": "address" }], "name": "tokenToTokenSwapOutput", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "tokens_sold", "type": "uint256" }, { "name": "min_tokens_bought", "type": "uint256" }, { "name": "min_trx_bought", "type": "uint256" }, { "name": "deadline", "type": "uint256" }, { "name": "exchange_addr", "type": "address" }], "name": "tokenToExchangeSwapInput", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "min_tokens", "type": "uint256" }, { "name": "deadline", "type": "uint256" }, { "name": "recipient", "type": "address" }], "name": "trxToTokenTransferInput", "outputs": [{ "name": "", "type": "uint256" }], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": true, "inputs": [{ "name": "owner", "type": "address" }, { "name": "spender", "type": "address" }], "name": "allowance", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "tokens_sold", "type": "uint256" }, { "name": "min_tokens_bought", "type": "uint256" }, { "name": "min_trx_bought", "type": "uint256" }, { "name": "deadline", "type": "uint256" }, { "name": "token_addr", "type": "address" }], "name": "tokenToTokenSwapInput", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "tokens_bought", "type": "uint256" }, { "name": "max_tokens_sold", "type": "uint256" }, { "name": "max_trx_sold", "type": "uint256" }, { "name": "deadline", "type": "uint256" }, { "name": "exchange_addr", "type": "address" }], "name": "tokenToExchangeSwapOutput", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "tokens_sold", "type": "uint256" }, { "name": "min_tokens_bought", "type": "uint256" }, { "name": "min_trx_bought", "type": "uint256" }, { "name": "deadline", "type": "uint256" }, { "name": "recipient", "type": "address" }, { "name": "exchange_addr", "type": "address" }], "name": "tokenToExchangeTransferInput", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "trx_bought", "type": "uint256" }], "name": "getTokenToTrxOutputPrice", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "tokens_bought", "type": "uint256" }, { "name": "max_tokens_sold", "type": "uint256" }, { "name": "max_trx_sold", "type": "uint256" }, { "name": "deadline", "type": "uint256" }, { "name": "recipient", "type": "address" }, { "name": "token_addr", "type": "address" }], "name": "tokenToTokenTransferOutput", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "tokens_sold", "type": "uint256" }, { "name": "min_tokens_bought", "type": "uint256" }, { "name": "min_trx_bought", "type": "uint256" }, { "name": "deadline", "type": "uint256" }, { "name": "recipient", "type": "address" }, { "name": "token_addr", "type": "address" }], "name": "tokenToTokenTransferInput", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "amount", "type": "uint256" }, { "name": "min_trx", "type": "uint256" }, { "name": "min_tokens", "type": "uint256" }, { "name": "deadline", "type": "uint256" }], "name": "removeLiquidity", "outputs": [{ "name": "", "type": "uint256" }, { "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "output_amount", "type": "uint256" }, { "name": "input_reserve", "type": "uint256" }, { "name": "output_reserve", "type": "uint256" }], "name": "getOutputPrice", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "payable": true, "stateMutability": "payable", "type": "fallback" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "buyer", "type": "address" }, { "indexed": true, "name": "trx_sold", "type": "uint256" }, { "indexed": true, "name": "tokens_bought", "type": "uint256" }], "name": "TokenPurchase", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "buyer", "type": "address" }, { "indexed": true, "name": "tokens_sold", "type": "uint256" }, { "indexed": true, "name": "trx_bought", "type": "uint256" }], "name": "TrxPurchase", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "provider", "type": "address" }, { "indexed": true, "name": "trx_amount", "type": "uint256" }, { "indexed": true, "name": "token_amount", "type": "uint256" }], "name": "AddLiquidity", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "provider", "type": "address" }, { "indexed": true, "name": "trx_amount", "type": "uint256" }, { "indexed": true, "name": "token_amount", "type": "uint256" }], "name": "RemoveLiquidity", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "operator", "type": "address" }, { "indexed": true, "name": "trx_balance", "type": "uint256" }, { "indexed": true, "name": "token_balance", "type": "uint256" }], "name": "Snapshot", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "from", "type": "address" }, { "indexed": true, "name": "to", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "owner", "type": "address" }, { "indexed": true, "name": "spender", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" }], "name": "Approval", "type": "event" }];
    constructor(walletObj) {

    }

};
module.exports = TRC_HELPER;

module.exports.initChain = async function(chainName, privateKey) {
    return new Promise((resolve) => {
        const fullNode = new HttpProvider(config.tronProvider[chainName].fullNode);
        const solidityNode = new HttpProvider(config.tronProvider[chainName].solidityNode);
        const eventServer = new HttpProvider(config.tronProvider[chainName].eventServer);
        if (privateKey && privateKey != '') {
            var xxx = new TronWeb(fullNode, solidityNode, eventServer, privateKey);
            resolve(xxx);
        } else {
            var xxx = new TronWeb(fullNode, solidityNode, eventServer);
            resolve(xxx);
        }
    })

}

module.exports.InitContract = async function(tronWeb, contractAddress, ABI) {
    let res = await tronWeb.contract(ABI, contractAddress);
    return res;
}

module.exports.contract_Call_Method = async(tronWeb, contractAddress, ABI, funcName, parameter, issuerAddress) => {
    // console.log(ABI);
    var contract = await TRC_HELPER.InitContract(tronWeb, contractAddress, ABI);
    // console.log(contract.methods);
    // var parameter = [{ type: 'uint256', value: '1000000' }];
    let res = null;
    if (parameter.length == 0) {
        res = await contract[funcName]().call({ _isConstant: true, from: issuerAddress });
    } else if (parameter.length == 1) {
        res = await contract[funcName](parameter[0]).call({ _isConstant: true, from: issuerAddress });
    } else if (parameter.length == 2) {
        res = await contract[funcName](parameter[0], parameter[1]).call({ _isConstant: true, from: issuerAddress });
    } else if (parameter.length == 3) {
        res = await contract[funcName](parameter[0], parameter[1], parameter[2]).call({ _isConstant: true, from: issuerAddress });
    } else if (parameter.length == 4) {
        res = await contract[funcName](parameter[0], parameter[1], parameter[2], parameter[3]).call({ _isConstant: true, from: issuerAddress });
    } else if (parameter.length == 5) {
        res = await contract[funcName](parameter[0], parameter[1], parameter[2], parameter[3], parameter[4]).call({ _isConstant: true, from: issuerAddress });
    } else if (parameter.length == 6) {
        res = await contract[funcName](parameter[0], parameter[1], parameter[2], parameter[3], parameter[4], parameter[5]).call({ _isConstant: true, from: issuerAddress });
    }
    // let res = await contract[funcName](1000000, 'fewafewa', ).call({ _isConstant: true, from: issuerAddress });
    // console.log(res, tronWeb.toDecimal(res));
    return res;
}

module.exports.contract_Send_Method = async(tronWeb, contractAddress, funcName, options, funcParams, issuerAddress) => {
    // options = {
    //     // feeLimit: 1000000000,
    //     feeLimit: 40000000,
    //     callValue: 0
    // };
    // var parameter = [{ type: 'uint256', value: '1000000' }];
    const tradeobj = await tronWeb.transactionBuilder.triggerSmartContract(tronWeb.address.toHex(contractAddress), funcName, options,
        funcParams, tronWeb.address.toHex(issuerAddress));
    return tradeobj;
}

module.exports.JUST_SWAP_trxToTokenSwapOutput = async(tronWeb, contractAddress, ) => {
    var funcName = "trxToTokenSwapOutput(uint256, uint256)";
    var parameter = [{ type: 'uint256', value: 1000000 }, { type: 'uint256', value: 1629357245290 }];
    const options = {
        // feeLimit: 1000000000,
        feeLimit: 40000000,
        callValue: 25000000
    };
    var funcName = "trxToTokenSwapOutput(uint256, uint256)";
    var parameter = [{ type: 'uint256', value: 1000000 }, { type: 'uint256', value: 1629357245290 }];
    const tradeobj = await tronWeb.transactionBuilder.triggerSmartContract(tronWeb.address.toHex(contractAddress), funcName, options,
        parameter, tronWeb.address.toHex(issuerAddress));
    // console.log(tradeobj);
    const signedtxn = await tronWeb.trx.sign(tradeobj.transaction, issuerPrivateKey);
    // console.log('signedtxn', signedtxn);
    const receipt = await tronWeb.trx.sendRawTransaction(signedtxn);
    console.log('receipt', receipt);
    return receipt;
}