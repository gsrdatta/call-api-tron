const DUC_HELPER = require('./lib/duc_help');
var Address = require('bitcore-lib');
var fs = require('fs');

var wallet = {
        name: "vi 1", // tên hiển thị trong wallet.ducatus.io
        user: 'user1', // Tên người dùng
        opts: {
            coin: 'duc',
            network: 'livenet',
            account: 0,
            n: 1
        }
    }
    // var xxx = JSON.parse(fs.readFileSync("./wallet-store/user1.txt"));
    // console.log(typeof xxx);
console.log(fs.readFileSync("./wallet-store/abcxyz.txt").toString());
console.log(fs.readFileSync("./wallet-store/Thuong.dat").toString());
console.log(fs.readFileSync("./wallet-store/Thuong-secret.dat").toString());

// DUC_HELPER.hello();
var main = async function() {
    // var xxx = await DUC_HELPER.createWallet(wallet);
    // console.log('xxx', xxx);
    // var obj = JSON.parse(fs.readFileSync("./wallet-store/Thuong.dat"));
    var obj = (fs.readFileSync("./wallet-store/Thuong.dat").toString());
    var openWallet = await DUC_HELPER.openWallet(obj);
    // console.log('openWallet', openWallet);
    // var getbalance = await DUC_HELPER.getBalance(openWallet.client);
    // console.log('getbalance', getbalance);


    // var createAddress = await DUC_HELPER.createAddress(openWallet.client);
    // console.log('createAddress', createAddress);

    // var getMainAddresses = await DUC_HELPER.getMainAddresses(obj, {});
    // console.log('getMainAddresses', getMainAddresses);

    // var getTxHistory = await DUC_HELPER.getTxHistory(obj, {});
    // console.log('getTxHistory', getTxHistory);

    /// Kiểm tra định dạng ví

    // tạo giao dịch chuyển tiền
    var options = {
        outputs: [{
            toAddress: 'M5t5xNYH7sfUmS8dH5xYzmt1c786Ho4PHz',
            amount: 1000000,
        }],
        feePerKb: 10000,
        excludeUnconfirmedUtxos: true,
    };
    var createTxProposal = await DUC_HELPER.createTxProposal(openWallet.client, options);
    console.log('createTxProposal', createTxProposal);
    // var publishTxProposal = await DUC_HELPER.publishTxProposal(openWallet.client, createTxProposal.result);
    // console.log('publishTxProposal', publishTxProposal);
    // var pushSignatures = await DUC_HELPER.pushSignatures(openWallet.client, publishTxProposal.result, JSON.parse(fs.readFileSync("./wallet-store/Thuong-secret.dat")));
    // console.log('pushSignatures', pushSignatures);
    // var broadcastTxProposal = await DUC_HELPER.broadcastTxProposal(openWallet.client, pushSignatures.result);
    // console.log('broadcastTxProposal', broadcastTxProposal);

};
// main();