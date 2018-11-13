$('#sign').click(function(){

  // read json
 var files = document.getElementById('myFile').files;
  if (files.length <= 0) {
    alert("File not found");
    return false;
  } else {
      var fileReader = new FileReader();
      fileReader.readAsText(files.item(0));
      fileReader.onload = function(event) { 
      var result = event.target.result;
      var privateKey = $('#privateKey').val();
      console.log(result);
      let val = JSON.parse(result);
      
      $.ajax({
          url: "http://localhost:8888/api/create",
          type: "post",
          contentType: 'application/json',
          dataType: 'json',
          data: JSON.stringify({
              data: result,
              fullName : val.recipient.fullname,
              idStudent :val.recipient.id,
              publicKey :val.recipient.publickey,
              privateKey : privateKey
          }),
          success: function (res) {
              $('#signed').val(res.signature);
              alert(res.txId);
          }
  })

      }
  }
          });
  