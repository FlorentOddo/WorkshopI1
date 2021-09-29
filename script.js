let userHistory;
let pwnedSites;

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
let nameSite;


chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab)=> {
  if(changeInfo.url){

    let domain = (new URL(changeInfo.url));
    domain = domain.hostname;
    let arraySite = domain.split('.');
    nameSite = arraySite[arraySite.length - 2];
    document.getElementById('pwned').innerHTML = nameSite; 
    let url = 'https://haveibeenpwned.com/api/v3/breach/'+nameSite;
    console.log(url);
    let infoSite = "WARNING : " + nameSite + " HAS BEEN BREACHED";
    document.getElementById('safe').innerHTML = infoSite;
    

    fetch(url)
    .then(response => {
      if(response.status !== 404){
        response.json()
        .then(data => {
          console.log(data)
          }
        );

      }else{
        console.log("pas de réponse");
      }
    })
    .catch(error => alert("Erreur : " + error));
  
  }
});
