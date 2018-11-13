$('#verify').click(function(){
   
    var signature = $('#sign').val();
    var publicKey = $('#publicKey').val();
    var files = document.getElementById('myFile').files;
    if (files.length <= 0) {
      alert("File not found");
      return false;
    } else {
        var fileReader = new FileReader();
        fileReader.readAsText(files.item(0));
        fileReader.onload = function(event) { 
        result = event.target.result;
        
        $.ajax({
            url: "http://localhost:8888/api/verify",
            type: "post",
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify({
                data: result,
                publicKey: publicKey,
                signature: signature
            }),
            success: function (res) {
                if(res.verified == true)
                {
                    alert("Valid Certificate");
                }
                else
                {
                    alert("Invalid Certificate");
                }
            }
    })
        }
    }
})
