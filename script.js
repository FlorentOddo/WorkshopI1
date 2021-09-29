let userHistory;
let pwnedSites;
chrome.history.search({text: ''}, history => {
  userHistory = history;   
  document.getElementById('analysed').innerHTML = userHistory.length; 
});


chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab)=> {
  if(changeInfo.url){
    document.getElementById('pwned').innerHTML = changeInfo.url; 
  }
});