let userHistory;
chrome.history.search({text: ''}, history => {
  userHistory = history;   
});




