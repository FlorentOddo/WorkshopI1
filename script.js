let userHistory;
chrome.history.search({text: ''}, history => {
  userHistory = history;   
  document.getElementById('analysed').innerHTML = userHistory[0].title; 
});


chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab)=> {
  if(changeInfo.url){
    document.getElementById('pwned').innerHTML = changeInfo.url; 
  }
});