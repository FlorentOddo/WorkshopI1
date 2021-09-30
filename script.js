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

chrome.storage.sync.get(["breached","arrayHistory"], function(result){
  document.getElementById('safe').innerHTML = result.breached;

  let numberPwned = 0;

  if(typeof result.arrayHistory !== 'undefined' && Array.isArray(result.arrayHistory)){
    numberPwned = result.arrayHistory.length;
  }
  document.getElementById('pwned').innerHTML = numberPwned;

});