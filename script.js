let userHistory;
chrome.history.search({text: ''}, history => {
  userHistory = history;   
  document.getElementById('typedUrl_div').innerHTML = userHistory[0].title; 
});


chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab)=> {
  if(changeInfo.url){
    document.getElementById('typedUrls_div').innerHTML = changeInfo.url; 
  }
});