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

    fetch(url)
    .then(response => {
      if(response.status !== 404){
        response.json()
        .then(data => {
          chrome.storage.sync.set({'breached': "WARNING : " + nameSite + " has been breached"});   

          chrome.storage.sync.get('arrayHistory', function(data) {

          let arrayHistory;
          if (typeof data.arrayHistory === 'undefined') {
            arrayHistory = [];
          } else {
            arrayHistory = data.arrayHistory;
          }
          if(arrayHistory.indexOf(nameSite) === -1)  
          {  
            arrayHistory.push(nameSite);  
          }
          console.log(arrayHistory);
          chrome.storage.sync.set({'arrayHistory':arrayHistory});  

        });
      });
    }else{
      chrome.storage.sync.set({'breached': nameSite + " has not been breached yet"}); 
    }
  })
  .catch(error => alert("Erreur : " + error));
}


chrome.tabs.onUpdated.addListener((tabId, change, tab) => {
  if (change.url) {
      doThing(change.url);       
  }
});

chrome.tabs.onActivated.addListener( function(activeInfo){
  chrome.tabs.get(activeInfo.tabId, function(tab){    
      doThing(tab.url); 
  });
});


