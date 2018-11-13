const express = require('express');
const bodyParser = require('body-parser');
const path = require("path");
const bitcore = require('bitcore-lib');
const Message = require('bitcore-message');
const request = require('request');
const Insight = require('bitcore-explorers').Insight;
let jsonParser = bodyParser.json();
let app = express();
let network = 'testnet';
app.use(express.static('public'));

app.get('/', function (req, res) {
    res.sendfile('homepage.html');
})
app.get('/create.html', function (req, res) {
    res.sendfile('create.html');

})

app.get('/verify.html', function (req, res) {
    res.sendfile('verify.html');
})

app.post('/api/create', jsonParser, function (req, res) {
    console.log(req.body);
    var privateKey = new bitcore.PrivateKey(req.body.privateKey);
    var sign = Message(req.body.data).sign(privateKey);
    var fullName = req.body.fullName;
    var issuerName = req.body.issuerName;
    var address = privateKey.toAddress(network);
    var addressTo = req.body.publicKey;
    request('https://testnet.blockchain.info/unspent?active=' + address, function (error, response, body) {
        if (error) {
            console.log(error);
        } else {
           
    
            let unspent_outputs = JSON.parse(body);
            let utxos = {
                address: address + "",
                txid: unspent_outputs.unspent_outputs[0].tx_hash_big_endian,
                vout: unspent_outputs.unspent_outputs[0].tx_output_n,
                scriptPubKey: unspent_outputs.unspent_outputs[0].script,
                satoshis: unspent_outputs.unspent_outputs[0].value
            }
            console.log(JSON.stringify(utxos))
            var transaction = new bitcore.Transaction()
            transaction.from(utxos);
            transaction.to(addressTo, 1000);
            transaction.fee(1000);
            transaction.addData(sign);
            transaction.change(address)
            transaction.sign(privateKey);
            transaction.serialize()
        
            var insight = new Insight(network);
            insight.broadcast(transaction, function(err, returnedTxId) {
                if (err) {
                    console.log(err)
                res.send(JSON.stringify({return: false}))
                } else {
                    res.send(JSON.stringify({return: true,
                        signature: sign, 
                        fullName: fullName, 
                        publicKey: addressTo, 
                        issuerName: issuerName,
                        txId : returnedTxId}))
                }
              })
               
        }
                })
})

app.post('/api/verify', jsonParser, function (req, res) {
    console.log(req.body);
    var data = req.body.data;
    var signature = req.body.signature;
    var publicKey = req.body.publicKey;
    var verified = new Message(data).verify(publicKey, signature);
    res.send(JSON.stringify({verified: verified}));
})

var server = app.listen(8888, function () {
        var host = server.address().address
        var port = server.address().port

        console.log("Ung dung Node.js dang hoat dong tai dia chi: http://%s:%s", host, port)
    });
