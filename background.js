let userHistory;
chrome.history.search({text: ''}, history => {
  userHistory = history;   
  document.getElementById('typedUrl_div').innerHTML = userHistory[0].title; 
});



chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if(changeInfo.url){
    console.log(changeInfo.url);
    document.getElementById('typedUrl_div').innerHTML = changeInfo.url; 
  }
});