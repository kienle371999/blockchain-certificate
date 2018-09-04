$('#create').click(function () {
    
    
    var fullname = $('#fullname').val();
    var id = $('#id').val();
    var course = $('#course').val();
    var recipientpublickey = $('#yourpublickey').val();
    var certificateName = $('#certificate').val();
    var description = $('#description').val();
    var time = $('#time').val();
    var issuerName = $('#issuername').val();
    var issuedby = $('#issuedby').val();
    var issuerpublickey = $('#issuerpublickey').val();
    var data = {

      recipient: {
        fullname: fullname,
        id: id,
        course: course,
        publickey: recipientpublickey,
      },
      certificate: {
        certificateName: certificateName,
        description: description,
        time: time,

      },
      issuer: {
        issuerName: issuerName,
        issuedBy: issuedby,
        issuerPublickey: issuerpublickey,
      }
     

    }
    $('#create').hide();
    $('#download').show();
    var linkJson = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data));
    
   
      alert(CryptoJS.SHA256(JSON.stringify(data)));
      console.log(JSON.stringify(data));
    $('<button class="radius title " id="download" href="data:' +linkJson + '" download="data.json">Download JSON</button>').appendTo('#bt');
    $('<a id= "djson"href="data:' + linkJson + '" download="data.json" hidden>download JSON</a>').appendTo('#bt');
    $("#download").click(function () {
      document.getElementById('djson').click();
    
  }) ;

  
})