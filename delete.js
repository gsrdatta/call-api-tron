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



// DUC_HELPER.hello();
var main = async function() {
    // var xxx = await DUC_HELPER.createWallet(wallet);
    // console.log('xxx', xxx);
    // var obj = JSON.parse(fs.readFileSync("./wallet-store/Thuong.dat"));
    var obj = (fs.readFileSync("./wallet-store/Thuong.dat").toString());
    var openWallet = await DUC_HELPER.openWallet(obj);
    // var getbalance = await DUC_HELPER.getBalance(openWallet.client);
    // console.log('getbalance', getbalance);


    // var createAddress = await DUC_HELPER.createAddress(obj);
    // console.log('createAddress', createAddress);

    // var getMainAddresses = await DUC_HELPER.getMainAddresses(obj, {});
    // console.log('getMainAddresses', getMainAddresses);

    // var getTxHistory = await DUC_HELPER.getTxHistory(obj, {});
    // console.log('getTxHistory', getTxHistory);

    /// Kiểm tra định dạng ví

    // tạo giao dịch chuyển tiền
    var getTxProposals = await DUC_HELPER.getTxProposals(openWallet.client, {});
    console.log('getTxProposals', getTxProposals);


}
main();