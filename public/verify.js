var result ;
$('#verify').click(function(){
   
    var tx = $('#tx').val()
    var files = document.getElementById('myFile').files;
    if (files.length <= 0) {
      alert("File not found");
      return false;
    }else{
      var fr = new FileReader();
    fr.readAsText(files.item(0));
    fr.onload = function(e) { 
        result = e.target.result;
      alert(CryptoJS.SHA256(result))
      checkSignture(CryptoJS.SHA256(result).toString(),tx)
     
      
      
    }
    
    }
    
   
   
   })
   function hexToASCII(str1)
   {
      var hex  = str1.toString();
      var str = '';
      for (var n = 0; n < hex.length; n += 2) {
          str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
      }
      return str;
   }
function checkPublickey(hash){
    return publickeytx===publickeyJson;
}
function checkSignture(hash,tx){
    $.get('https://testnet.blockexplorer.com/api/tx/'+tx).
    then(function (d) {
        console.log(d)
         console.log(d.vin[0].addr) 
         var  publickeyIssuer =d.vin[0].addr;
         var hexsignature =d.vout[1].scriptPubKey.asm;
         var signatureRecipient = $('#signatureRecipient').val();
         hexsignature=  hexsignature.toString().substr(10,hexsignature.length-1);
         var signature = hexToASCII( hexsignature);
         console.log(hexToASCII( hexsignature))
         if(d.vin[0].addr!=undefined&&d.vout[0].scriptPubKey.asm!=undefined&&d.vout[0].scriptPubKey.addresses[0]!=undefined){
         $.ajax({
            url: "http://localhost:8888/api/signture",
            type: "post",
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify({
                publickeyIssuer:publickeyIssuer,
                publickeyRecipient:d.vout[0].scriptPubKey.addresses[0],
                signatureIssuser:signature ,
                signatureRecipient:signatureRecipient,
                hash: hash,
            }),
            success: function (res) {
                console.log(res);
              console.log(res.signatureIssuser);
              
            if(res.signatureIssuser&&res.signatureRecipient){
                $('#verify').hide();
        $('#tx').hide();
        $('#signatureRecipient').hide();
        $('#myFile').hide();
        var val = JSON.parse(result);
        console.log(result)
       
       $('#check').append('<h4 >Recipient information</h4>')
       $('#check').append('<h4 >Full name :'+val.recipient.fullname+'</h4>');
       $('#check').append('<h4 >ID :'+val.recipient.id+'</h4>');
       $('#check').append('<h4 >Course:'+val.recipient.course+'</h4>');
       $('#check').append('<h4 >Recipient publickey:'+val.recipient.publickey+'</h4>');
       $('#check').append('<h4 >Certificate information</h4>');
       $('#check').append('<h4 >Certificate name :'+val.certificate.certificateName+'</h4>');
       $('#check').append('<h4 >Description :'+val.certificate.description+'</h4>');
       $('#check').append('<h4 >Time :'+val.certificate.time+'</h4>');
       $('#check').append('<h4 >Certificate information</h4>');
       $('#check').append('<h4 >IssuerName :'+val.issuer.issuerName+'</h4>');
       $('#check').append('<h4 >Issued by :'+val.issuer.issuedBy+'</h4>');
       $('#check').append('<h4 >Issuer publickey:'+val.issuer.issuerPublickey+'</h4>');
            }
            
           
           
             
             
            }
        
        });
    }else{
           //hhhh
           
           


    }
        });
    
  
}
