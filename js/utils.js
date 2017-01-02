global.$ = $;

const {remote} = require('electron');
const {BrowserWindow} = remote;

//search gifs by string, limit is set to 10
function searchGif(queryArg, limitArg, langArg, xhr){
    var string = "http://api.giphy.com/v1/gifs/search?q="
    var query = String(queryArg)
    var api_key = "&api_key=dc6zaTOxFJmzC"
    var limit = String(limitArg)
    var lang = String(langArg)
    console.log(limit,lang,query);
    if(xhr && xhr.readyState < 3){
        xhr.abort();
    }
    xhr = $.get("http://api.giphy.com/v1/gifs/search?q="+query+api_key+"&limit="+limit+"&lang="+lang);
    xhr.done(function(data) {
        console.log("success got data", data);
        showGif(data)
    });
}

//iteration in get response, through gifs, setting them in the area of output
function showGif(data){
    var len = data.pagination.count
    for (i = 0; i < len; i++){
        var parsed = data.data[i].images.original.url
        $('#gifarea').prepend('<img class="gifted" src='+parsed+'>');
    }

}

//every time the input field will change and with a delay, a function will be called, after the gif area has been cleared
$(document).ready(function(){
    $('#inputarea0').focus();
    var xhr;
    $("#inputarea0").on('input',function(e) {
        $('#gifarea').empty();
        var query = $("#inputarea0").val();
        searchGif(query, 10, "en", xhr);
    }).delay(300);
});
