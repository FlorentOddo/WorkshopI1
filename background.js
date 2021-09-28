let userHistory;
chrome.history.search({text: ''}, history => {
  userHistory = history; 
  console.log("🚀 ~ file: background.js ~ line 4 ~ history", history);
  
  document.getElementById('typedUrl_div').innerHTML = userHistory[0].title; 
});
