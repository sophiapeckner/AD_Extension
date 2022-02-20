let typing = "";
let time = 0;

function reset(){
  typing = "";
  time = 0;
  // Empties out the local storage
  chrome.storage.local.set({'reset': "yes"});
  chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    var url = tabs[0].url;
    if(url == "chrome://newtab/"){
      document.getElementById("cpm").innerHTML = "Unavailable";
      document.getElementById("pause").innerHTML = "Unavailable";
      document.getElementById("time").innerHTML = "Unavailable";
    }
    else{
      document.getElementById("cpm").innerHTML = 0 + " character per min.";
      document.getElementById("pause").innerHTML = 0 + " pauses per min.";
      document.getElementById("time").innerHTML = 0 + " seconds";
    }
   });
}

document.addEventListener('DOMContentLoaded', function() {
var link = document.getElementById('link');
  link.addEventListener('click', function() {
    reset();
    chrome.runtime.sendMessage({
      msg: "hello"
    });
  });
});

function updatePopup(){
    chrome.storage.local.get(['cpm','pause','time'], function(data) {
      document.getElementById("cpm").innerHTML = data.cpm + " cpm";
      document.getElementById("pause").innerHTML = data.pause + " pauses per minute";
      document.getElementById("time").innerHTML = Math.round(data.time) + " seconds";
    });
    
    chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
      var url = tabs[0].url;
      if(url == "chrome://newtab/"){
        document.getElementById("cpm").innerHTML = "Unavailable";
        document.getElementById("pause").innerHTML = "Unavailable";
        chrome.browserAction.setIcon({path: "Daily TyperN.png"});
      }
     });
    /*
    chrome.storage.local.get('typed', function(data) {
      document.getElementById("test").innerHTML = data.typed;
    });
    */
  }
  
document.addEventListener('DOMContentLoaded', updatePopup);