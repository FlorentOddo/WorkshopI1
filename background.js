let userHistory;
chrome.history.search({text: ''}, history => {
  userHistory = history;   
  document.getElementById('typedUrl_div').innerHTML = userHistory[0].title; 
});



chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  console.log(changeInfo.url);
});