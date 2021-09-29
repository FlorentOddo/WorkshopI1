let userHistory;
let pwnedSites;
let nameSite;

chrome.history.search({text: ''}, history => {
  userHistory = history;   
  // document.getElementById('analysed').innerHTML = userHistory.length; 
});


chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab)=> {
  if(changeInfo.url){

    let domain = (new URL(changeInfo.url));
    domain = domain.hostname;
    let arraySite = domain.split('.');
    let nameSite = arraySite[arraySite.length - 2];
    document.getElementById('pwned').innerHTML = nameSite; 
    let url = 'https://haveibeenpwned.com/api/v3/breach/'+nameSite;
    console.log(url);
    

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

let infoSite;

// if () {
//   infoSite = "This site is safe";
// } else {
//   infoSite = "WARNING : " + nameSite + " HAS BEEN BREACHED";
// }
infoSite = "WARNING : " + nameSite + " HAS BEEN BREACHED";
document.getElementById('safe').innerHTML = infoSite;