let userHistory;
chrome.history.search({text: ''}, history => {
  userHistory = history;   
});



function doThing(urlComplet){
  let domain = (new URL(urlComplet));
    domain = domain.hostname;
    let arraySite = domain.split('.');
    let nameSite = arraySite[arraySite.length - 2];
    let url = 'https://haveibeenpwned.com/api/v3/breach/'+nameSite;
    console.log(url);
    

    fetch(url)
    .then(response => {
      if(response.status !== 404){
        response.json()
        .then(data => {
          chrome.storage.sync.set({'breached': nameSite + " is breached"});  
          console.log("il y a une faille");
          }
        );

      }else{
        chrome.storage.sync.set({'breached': nameSite + " is not breached"}); 
        console.log("pas de réponse");
      }
    })
    .catch(error => alert("Erreur : " + error));
}


chrome.tabs.onUpdated.addListener((tabId, change, tab) => {
  if (change.url) {
      console.log("you are here: "+change.url);  
      chrome.storage.sync.set({'test': "test 28"});   
      doThing(change.url);       
  }
});

chrome.tabs.onActivated.addListener( function(activeInfo){
  chrome.tabs.get(activeInfo.tabId, function(tab){
      y = tab.url;
      console.log("you are here: "+y);
      chrome.storage.sync.set({'test': "test 30"});
      doThing(y); 
  });
});


