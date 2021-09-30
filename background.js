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
      response.json().then(dat => {
        console.log(dat);
        chrome.storage.sync.set({'breached': "WARNING : " + nameSite + " has been breached"});   

        chrome.storage.sync.get('arrayHistory', function(data) {

          let arrayHistory;
          if (typeof data.arrayHistory === 'undefined') {
            arrayHistory = [];
          } else {
            arrayHistory = data.arrayHistory;
          }

          if(checkIfSiteNotExist(nameSite, arrayHistory))
          { 
            let site = {
              name: nameSite,
              date: dat.BreachDate,
              nb: dat.PwnCount,
              description: dat.Description
            }
            console.log(site);
            arrayHistory.push(site);  
          }
          chrome.storage.sync.set({'arrayHistory':arrayHistory});  

        });
     });
    }else{
      chrome.storage.sync.set({'breached': nameSite + " has not been breached yet"}); 
    }
  })
  .catch(error => alert("Erreur : " + error));
}


function checkIfSiteNotExist(nameSite, arraySite){
  let ret = true;
  arraySite.forEach(element => {
    if(typeof element.name !== 'undefined' && element.name === nameSite){
      ret = false;
    }
  });
  return ret;
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


