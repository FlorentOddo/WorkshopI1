let userHistory;
let pwnedSites;
let infoSite;
let nameSite;

let checkHist = false;

function changeCheck(){
  if(checkHist){
    checkHist = false;
  }
  else{
    checkHist = true;
  }
}

if(checkHist){
  chrome.history.search({text: ''}, history => {
    userHistory = history;   
    // document.getElementById('analysed').innerHTML = userHistory.length; 
  });
}

chrome.storage.sync.get(["breached"], function(result){
  document.getElementById('safe').innerHTML = result.breached;
});