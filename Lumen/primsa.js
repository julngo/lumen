var url = 'https://io.adafruit.com/api/groups/Default/receive.json?x-aio-key=d0ad65efddd84f2da7536b1de274f2cd';
var NEEDEDVALUE;
var document;

window.addEventListener('DOMContentLoaded', (event) => {
    httpGetAsync(url);
});

function printValue(text){
    let obj = JSON.parse(text);
    let objFeeds = obj.feeds
    for(let i = 0; i < objFeeds.length; i ++) {
        if(objFeeds[i].name == "TestConnectionWithRaspberryPi") {
            NEEDEDVALUE = objFeeds[i].last_value;
            if(NEEDEDVALUE == "1")
                {
                    console.log("It's On " + NEEDEDVALUE);
                    //inputVal = true;
                    
                }else{
                    console.log("It's Off " + NEEDEDVALUE); 
                    //inputVal = false;
                }
        }
    }
}

//constantly being called to update
function httpGetAsync(url, callback){
    setInterval(function(){
        var xmlHttp = new XMLHttpRequest
        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                printValue(xmlHttp.responseText);
            }
                
            
        }
        xmlHttp.open("GET", url , true); // true for asynchronous
        xmlHttp.send(null);
        
    },1500);
}