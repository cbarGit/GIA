global.$ = $;

const {remote} = require('electron');
const {BrowserWindow, Menu, MenuItem, dialog} =remote;

// menu implementation
const menu = new Menu()
menu.append(new MenuItem({label:'Save GIF as', click(){
    var tag = document.elementFromPoint(rightClickPosition.x, rightClickPosition.y);
    var srcfile = tag.src;

    console.log(srcfile);
    save(srcfile);
        }
    })
)
//contextmenu (right-click to save)
window.addEventListener('contextmenu', (e)=>{
    e.preventDefault()
    rightClickPosition = {x: e.x, y: e.y}
    menu.popup(remote.getCurrentWindow())
}, false)


//save gif function
function save(url){
    var filename = url.substring(url.lastIndexOf("/") + 1).split("?")[0];
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = function() {
        var a = document.createElement('a');
        a.href = window.URL.createObjectURL(xhr.response); // xhr.response is a blob
        a.download = filename; // Set the file name.
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        delete a;
    };
    xhr.open('GET', url);
    xhr.send();
}


//search gifs by string, limit is set to 10
function searchGif(queryArg, limitArg, xhr){
    var string = "http://api.giphy.com/v1/gifs/search?q="
    var query = String(queryArg)
    var api_key = "&api_key=dc6zaTOxFJmzC"
    var limit = String(limitArg)
    var lang = $("#lang").val();
    console.log(limit,lang,query);
    if(xhr && xhr.readyState < 4){
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
    var dataLength = data.pagination.count
    var textLength = $('#inputarea').val().length
    if (dataLength == 0 && textLength != 0){
        $('#gifarea').append('<p id="nogifs">GIFs not found</p>')
    }
    for (i = 0; i < dataLength; i++){
        var parsed = data.data[i].images.original.url
        $('#gifarea').append('<img id="img'+i+'" class="gifted" src='+parsed+'>');
    }

}

//every time the input fields will change and with a delay,the gif area will be cleared  and a function will be called
$(document).ready(function(){
    var stringLang = [
        {lang: "Spanish", code: "es"},
        {lang: "Portuguese", code: "pt"},
        {lang: "French", code: "fr"},
        {lang: "German", code: "de"},
        {lang: "Italian", code: "it"}
    ];
    for (i = 0; i < stringLang.length; i++ ){
        $('#lang').append('<option value="'+stringLang[i].code+'">'+stringLang[i].lang+'</option>')
    }
    $('#inputarea').focus();
    var xhr;
    $("#inputarea").on('input',function(e) {
        var quantity = $('#quantity').val();
        $('#gifarea').empty();
        var query = $("#inputarea").val();
        searchGif(query, quantity, xhr);
    }).delay(300);
    $("#quantity").on('input',function(e) {
        var quantity = $('#quantity').val();
        $('#gifarea').empty();
        var query = $("#inputarea").val();
        searchGif(query, quantity, xhr);
    }).delay(800);
});
