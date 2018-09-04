const express = require('express');
const bodyParser = require('body-parser');
const path = require("path");
const bitcore = require('bitcore-lib');
const Message = require('bitcore-message');
const request = require('request');
const Insight = require('bitcore-explorers').Insight;
let jsonParser = bodyParser.json();
let app = express();
let network = 'testnet'
app.use(express.static('public'));

app.get('/create.html', function (req, res) {
    res.sendfile(path.join('create.html'));

})
app.get('/verify.html', function (req, res) {
    res.sendfile(path.join('verify.html'));
})
app.get('/createSignature.html', function (req, res) {
    res.sendfile(path.join('createSignature.html'));
})
app.get('/createSignatureIssuer.html', function (req, res) {
    res.sendfile(path.join('createSignatureIssuer.html'));
})

app.post('/api/signtureRecipient', jsonParser, function (req, res) {
    console.log(req.body);
    let privateKey = new bitcore.PrivateKey(req.body.privateKey);

    let hash = req.body.hash;

    console.log(hash);
    let sign = Message(hash.toString()).sign(privateKey);
    res.send(JSON.stringify({ signature: sign }));
})
app.post('/api/signture', jsonParser, function (req, res) {
    console.log(req.body);
    var fullName = req.body.fullName;
    var hash = req.body.hash;
    var addressIssuser = req.body.publickeyIssuer;//
    var addressRecipient = req.body.publickeyRecipient;//
    var signatureIssuser = req.body.signatureIssuser;
    console.log(signatureIssuser);
    var signatureRecipient = req.body.signatureRecipient;
    var verifiedRecipient = Message(hash).verify(addressRecipient, signatureRecipient);

    var verifiedIssuser = Message(hash).verify(addressIssuser, signatureIssuser);
    console.log(verifiedIssuser);
    res.send(JSON.stringify({ signatureIssuser: verifiedIssuser, signatureRecipient: verifiedRecipient, hash: hash }));
})
app.post('/api/signtureIssuer', jsonParser, function (req, res) {
    console.log(req.body);
    
    let privateKey = new bitcore.PrivateKey(req.body.privateKey);
    var sign = Message(req.body.hash).sign(privateKey);
    var fullName = req.body.fullName;
    var publicKey = privateKey.toAddress(network);
    var addrTo = req.body.publicKey;
    console.log(addrTo);
    request('https://testnet.blockchain.info/unspent?active=' + publicKey, function (error, response, body) {
        if (error) {
            console.log(error);
        } else {
           
    
            let unspent_outputs = JSON.parse(body);
            let utxos = {
                address: publicKey + "",
                txid: unspent_outputs.unspent_outputs[0].tx_hash_big_endian,
                vout: unspent_outputs.unspent_outputs[0].tx_output_n,
                scriptPubKey: unspent_outputs.unspent_outputs[0].script,
                satoshis: unspent_outputs.unspent_outputs[0].value
            }
            console.log(JSON.stringify(utxos))
            let tx = new bitcore.Transaction()
            tx.from(utxos);

            tx.to(addrTo, 10000)
            tx.addData(sign);
            tx.change(publicKey)
            tx.sign(privateKey);
         
            tx.serialize()
           // let bufStr = Buffer.from(tx.toString(), 'utf8');
            //console.log(bufStr + "");
            var insight = new Insight(network);
            insight.broadcast(tx, function(err, returnedTxId) {
                if (err) {
                    console.log(err)
                res.send(JSON.stringify({return: false}))
                } else {
                    res.send(JSON.stringify({return: true,fullName :fullName,publicKey:addrTo, txId : returnedTxId}))
                }
              })
               
        }
                })




            


        })

    var server = app.listen(8888, function () {
        var host = server.address().address
        var port = server.address().port

        console.log("Ung dung Node.js dang hoat dong tai dia chi: http://%s:%s", host, port)
    });
