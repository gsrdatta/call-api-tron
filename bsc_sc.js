const BSC_HELPER = require('./lib/bsc_help');
var acc1 = "0x99467e6D01c427d4296bcD57C7334b62888f9480";
var privateKey1 = "9de180c32ddd73dd914d254c9aed8f1211164526b3c6a74b03d52bf341ddde0a";
const fs = require('fs');
var Wallet = require('ethereumjs-wallet').default;
var EthUtil = require('ethereumjs-util');
// console.log(Wallet);


var main = async function() {
    // BSC_HELPER.getContracABI('0x488cde4f32845b914a4acedf45061092f2a9dac9');
    // var balance = await BSC_HELPER.getTokenBalance('testnet', '0x99467e6D01c427d4296bcD57C7334b62888f9480', '0x488cde4f32845b914a4acedf45061092f2a9dac9');
    // console.log('balance of ', balance);

    // let funcName = 'balanceOf(address)';
    // let funcParams = '0x99467e6D01c427d4296bcD57C7334b62888f9480';
    // var balance = await BSC_HELPER.callSmartContractFunction('testnet', '0x99467e6D01c427d4296bcD57C7334b62888f9480', '0x488cde4f32845b914a4acedf45061092f2a9dac9', funcName, funcParams);
    // console.log(funcName, balance);

    var web3 = await BSC_HELPER.initChain('testnet');
    var amountHex = web3.utils.toHex(1000000000000000000);
    let funcName = 'transfer';
    let funcParams = ['0x7EaBBb7dcE696e00a2644eE41Ceb01fB7b55204c', amountHex];
    var call = await BSC_HELPER.sendSmartContractFunction('testnet', '0x99467e6D01c427d4296bcD57C7334b62888f9480', '0x488cde4f32845b914a4acedf45061092f2a9dac9', funcName, funcParams, null, null, '9de180c32ddd73dd914d254c9aed8f1211164526b3c6a74b03d52bf341ddde0a');
    console.log(funcName, call);

}


main();