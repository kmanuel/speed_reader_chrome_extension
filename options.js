$(document).ready(function(){

  chrome.storage.sync.get('speedreader_refresh', function(data) {
    $('#refreshRate').val(data.speedreader_refresh);
  });
  chrome.storage.sync.get('speedreader_wordsPerPage', function(data) {
    $('#wordsPerPage').val(data.speedreader_wordsPerPage);
  });

  $('#saveBtn').click(function(){
    var refreshRate = parseInt($("#refreshRate").val(), 10);
    var number = parseInt($("#wordsPerPage").val(), 10);
    chrome.storage.sync.set({ speedreader_refresh: refreshRate });
    chrome.storage.sync.set({ speedreader_wordsPerPage: number });
    window.close();
  });
});
