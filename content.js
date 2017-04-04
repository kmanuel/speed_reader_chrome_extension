var CHUNK_WAIT = 150;
var WORDS_PER_CHUNK = 3;
var CLOSE_WAIT = 1000;


var port = chrome.runtime.connect();
  
chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {
  if (msg.action == 'start_speed_read') {
  	create_speed_read(msg.text);
  }
}); 
  

function create_speed_read(message) {
	chrome.storage.sync.get('speedreader_refresh', function(data) {
    		CHUNK_WAIT = data.speedreader_refresh;

		chrome.storage.sync.get('speedreader_wordsPerPage', function(data) {
			WORDS_PER_CHUNK = data.speedreader_wordsPerPage;
			var div = document.createElement("div");
			div.setAttribute("style", "color:black; text-align:center; line-height:80vh; vertical-align: middle; font-size: 3em; background-color: #888; position:fixed; left:10vw; top:10vh; border:none; width:80vw; height:80vh; z-index:999999;");
			document.body.appendChild(div);
			speedRead(div, message);
		});
	});
}

function speedRead(div, text) {
        var res = text.split(" ");
        showChunk(div,res,0);
};

function showChunk(div, textChunks, i) {
    setTimeout(function () {
	var textToShow = "";

	var j = 0;
	while (j < WORDS_PER_CHUNK && textChunks[i+j] != undefined) {
	  textToShow += ' ' + textChunks[i+j];
	  j++;
	}
	i = i + j;

        div.innerHTML = textToShow;
        if (textChunks[i] != undefined) {
          showChunk(div,textChunks, i);
        } else {
    	  closeSpeedReadWindow(div);
        }
    }, CHUNK_WAIT);
}

function closeSpeedReadWindow(div) {
  setTimeout(function(){
    div.setAttribute("style", "display: none");
  }, CLOSE_WAIT);

}


