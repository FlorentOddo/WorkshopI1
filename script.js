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


chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab)=> {
  if(changeInfo.url){

    let domain = (new URL(changeInfo.url));
    domain = domain.hostname;
    let arraySite = domain.split('.');
    nameSite = arraySite[arraySite.length - 2];
    console.log(nameSite)
    document.getElementById('pwned').innerHTML = nameSite; 

    let url = 'https://haveibeenpwned.com/api/v3/breach/'+nameSite;
    console.log(url);

    
    fetch(url)
    .then(response => {
      if(response.status !== 404){
        res = response.json();
        console.log(res);
        console.log(JSON.stringify(res));
      }else{
        console.log("pas de réponse");
      }
    })
    .catch(error => alert("Erreur : " + error));
  }
});