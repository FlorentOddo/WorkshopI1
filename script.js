let userHistory;
let pwnedSites;
let infoSite;
let nameSite;

function checkHistory(){
  chrome.history.search({text: ''}, history => {
    userHistory = history;
  });
}


chrome.storage.sync.get(["breached"], function(result){
  document.getElementById('safe').innerHTML = result.breached;
});