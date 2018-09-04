
var tx = '8c0c3dc672132aa1d2ae03e581ed9f88774b2f74e495424c22b68fe4e2b13c19';

$.ajax({
    url: ,
    type: "get",

    success: function (result) {
        console.log(result.responseText)
    }
});
$.get('https://testnet.blockexplorer.com/api/tx/03bb3def664346247c5a16422247f84cd8defcdd0595470b4a15e8fe995e7512').
    then(function (d) {
        console.log(JSON.stringify(d))
         console.log(d.vin[0].addr) 
         console.log(d.vout[0].scriptPubKey.asm)
         console.log(d.vout[0].scriptPubKey.addresses[0])
         console.log(JSON.stringify(d))
        });
$.ajax({
    url: "http://localhost:8888/api/signture",
    type: "post",
    dataType: 'json',
    contentType: 'application/json',
    data: JSON.stringify({
        id: 1,
        name: "giang",
    }),
    success: function (result) {
        console.log(result)
    }
});
$.get('https://api.blockcypher.com/v1/btc-testnet/txs/8c0c3dc672132aa1d2ae03e581ed9f88774b2f74e495424c22b68fe4e2b13c19').
    then(function (d) { console.log(d) });
$.get('https://api.blockcypher.com/v1/btc/main/txs/8c0c3dc672132aa1d2ae03e581ed9f88774b2f74e495424c22b68fe4e2b13c19').then(function (d) { console.log(d) });
{ "txid": "8c0c3dc672132aa1d2ae03e581ed9f88774b2f74e495424c22b68fe4e2b13c19", "version": 1, "locktime": 0, "vin": [{ "txid": "73c59f77e8378a501cc1447351620efede29a40f51f998381bf605279e89fcaa", "vout": 1, "sequence": 4294967295, "n": 0, "scriptSig": { "hex": "483045022100aaa1ec67d9928b684f8ca4448df1a679b41cfae8e8ed19ab3da40bf7316f222202204c26c7571e88592d64fa0a989d53cf1fca2a75231fefbec879a5c36b0bb3eb7c012103fc0f3a8e2b81d4dd81b9c8bc1dc2c3c930054bb4c4d6ba3db7cfa574e88c9d8d", "asm": "3045022100aaa1ec67d9928b684f8ca4448df1a679b41cfae8e8ed19ab3da40bf7316f222202204c26c7571e88592d64fa0a989d53cf1fca2a75231fefbec879a5c36b0bb3eb7c[ALL] 03fc0f3a8e2b81d4dd81b9c8bc1dc2c3c930054bb4c4d6ba3db7cfa574e88c9d8d" }, "addr": "mqqbCE2NpYKrD1awzyWuSGDi8xyQQNDDWy", "valueSat": 30300, "value": 0.000303, "doubleSpentTxID": null }], "vout": [{ "value": "0.00000000", "n": 0, "scriptPubKey": { "hex": "6a145468697320697320746573746e6574203a292929", "asm": "OP_RETURN 5468697320697320746573746e6574203a292929" }, "spentTxId": null, "spentIndex": null, "spentHeight": null }], "blockhash": "000000000000002d19bcdb015d0881995c4ee814af6940e7aecc6cd52c20249b", "blockheight": 1384609, "confirmations": 23969, "time": 1534757389, "blocktime": 1534757389, "valueOut": 0, "size": 189, "valueIn": 0.000303, "fees": 0.000303 }