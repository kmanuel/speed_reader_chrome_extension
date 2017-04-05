var CHUNK_WAIT = 150;
var WORDS_PER_CHUNK = 3;
var CLOSE_WAIT = 5000;


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
			var holderDiv = document.createElement("div");
			holderDiv.id = "speedread_overlay"
			var closeSpan = document.createElement("span");
			closeSpan.id = "speedread_close";


			closeSpan.onclick = function() {closeSpeedReadWindowNow(holderDiv);};

			holderDiv.appendChild(closeSpan);

			var textP = document.createElement("p");
			holderDiv.appendChild(textP);
			
			document.body.appendChild(holderDiv);

			speedRead(textP, message);
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

function closeSpeedReadWindowNow(div) {
	div.setAttribute("style", "display: none");
}
