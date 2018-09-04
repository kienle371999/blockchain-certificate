$('#sign').click(function(){

    // read json
   var files = document.getElementById('myFile').files;
    if (files.length <= 0) {
      alert("File not found");
      return false;
    }else{
      var fr = new FileReader();
    fr.readAsText(files.item(0));
    fr.onload = function(e) { 
     let   result = e.target.result;
     var privateKey = $('#privateKey').val();
     console.log(result)
     let val = JSON.parse(result);
     console.log(val.fullname)
     $.ajax({
        url: "http://localhost:8888/api/signtureIssuer",
        type: "post",
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify({
            fullName : val.fullname,
            idStudent :val.idStudent,
            publicKey :val.publicKey,
            hash:val.hash,
            privateKey : privateKey
        }),
        success: function (res) {
            console.log(res);
            if(res.return==true){
                $('#check').append('<h4 >FullName:'+res.fullName+'|txtID:'+res.txId+'</h4>')
            }else{
                alert("erro")
            }
        }
})

    }
}
    //*****************
    /*let hash = $('#hash').val();
    let privateKey = $('#privateKey').val();
        $.ajax({
            url: "http://localhost:8888/api/signtureRecipient",
            type: "post",
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify({
                privateKey : privateKey,
                hash : hash
            }),
            success: function (res) {
                console.log(res);
                $('#sign').hide();
                $('#hash').hide();
                $('#privateKey').hide()
                $('#check').append('<h4 >Signture :'+res.signature+'</h4>');
            }
    })*/
        });
    