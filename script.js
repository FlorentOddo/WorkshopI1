let userHistory;
let pwnedSites;
chrome.history.search({text: ''}, history => {
  userHistory = history;   
  // document.getElementById('analysed').innerHTML = userHistory.length; 
});


chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab)=> {
  if(changeInfo.url){

    let domain = (new URL(changeInfo.url));
    domain = domain.hostname;
    let arraySite = domain.split('.');
    nameSite = arraySite[arraySite.length - 2];
    document.getElementById('pwned').innerHTML = nameSite; 

    let url = 'https://haveibeenpwned.com/api/v3/breach/'+nameSite;
    console.log(url);

    
    fetch(url)
    .then(response => response.json())
    .then(response => console.log(JSON.stringify(response)))
    .catch(error => alert("Erreur : " + error));
  }
});