function onClickHandler(info, tab) {
    if (info.menuItemId == "speedread1"){
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
	  chrome.tabs.sendMessage(tabs[0].id, {action: "start_speed_read", text: info.selectionText }, function(response){});  
        });
    }
}

chrome.contextMenus.onClicked.addListener(onClickHandler);

chrome.runtime.onInstalled.addListener(function() {
  chrome.contextMenus.create({"id": "speedread1", "type": "normal", "title": "speedread", "contexts":["selection"]});
});
