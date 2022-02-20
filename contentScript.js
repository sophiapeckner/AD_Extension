let typing = "";
let count = 0;
let shortElapsed =  0;
let cutTime = 0;

window.addEventListener('keydown', myInput, true);

let shortStart2 = 0;

let elapsed = 0;
let start = 0;
let finaltime = 0;
let cpm = 0;

let pauses = 0;
let ppm = 0;

chrome.storage.local.set({'cpm': cpm});
chrome.storage.local.set({'pause': ppm});

// function update(){
//     typing = "";
//     cutTime = 0;
//     cpm = 0;
//     pauses = 0;
//     ppm = 0;
//     chrome.storage.local.set({'cpm': cpm});
//     chrome.storage.local.set({'pause': ppm});
// }

// document.addEventListener("visibilitychange", function () {
//     if(!document.hidden) {
//         chrome.storage.local.set({'cpm': cpm});
//         chrome.storage.local.set({'pause': ppm});
//         chrome.runtime.sendMessage({
//             speed: cpm
//         });
//     }
// }, false);

// window.addEventListener('load', (event) => {
//     if(!document.hidden) {
//         chrome.storage.local.set({'cpm': cpm});
//         chrome.storage.local.set({'pause': ppm});
//         chrome.runtime.sendMessage({
//             speed: cpm
//         });
//     }
// });

function myInput(event){
    var input = event.which || event.keyCode;
    
    // "Operational" keystrokes (according to Fabasoft)
    if(input != 13 && input != 17 && input != 16 && input != 18 && input != 9 && input != 32 && input != 37 && input != 38 && input != 39 && input != 40 && input != 91){

        // User pressed reset
        if(typing.length == 0){
            masterStart = window.performance.now();
            start = window.performance.now();
        }
        
        end = window.performance.now();
        elapsed = end - start;
        start = window.performance.now();

        // 10 seconds
        if(elapsed > 10000){
            // cutTime: amount of time that the user paused for more than 10 second
            cutTime += elapsed;
            pauses++;
        }
        
        // <DELETE>
        if(input != 8){
            // Inputted character
            let typed = String.fromCharCode(input).toLowerCase();
            // Every character typed thus far
            typing = typing + typed;
        }
        
        // Deleted character text is NOT accounted for in the cpm calculation
        // Caveat: using keyboard shortcuts like <SHIFT><CTRL><ARROW> will cause error
        if(input == 8){
            typing = typing.slice(0, typing.length - 1);
        }

        masterElapsed = window.performance.now() - masterStart;
        finaltime = masterElapsed - cutTime;
        cpm = Math.round( typing.length / ((finaltime/1000)/60) );
        // don't round!
        ppm = Math.round( pauses / ((masterElapsed/1000)/60) );
        
        chrome.storage.local.set({'cpm': cpm});
        chrome.storage.local.set({'pause': ppm});
        chrome.storage.local.set({'time': (masterElapsed/1000)});
        
        chrome.runtime.sendMessage({
            speed: cpm,
            t: masterElapsed/1000
        });
    }
}