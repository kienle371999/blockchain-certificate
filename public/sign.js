$('#sign').click(function(){
let hash = $('#hash').val();
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
})
    });
