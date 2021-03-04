var Web3 = require('web3');
var provider = 'http://212.24.108.89:8546';
var web3Provider = new Web3.providers.HttpProvider(provider);
var web3 = new Web3(web3Provider);
web3.eth.getBlockNumber().then((result) => {
    console.log("Latest Ethereum Block is ", result);
});

var main = async function() {
    var result = await web3.eth.getBalance(('0x4441A4f4e640b22D496b6d5D1Ed51fEDE7F75AAE').toUpperCase());
    console.log('transaction ', result);
}


main();