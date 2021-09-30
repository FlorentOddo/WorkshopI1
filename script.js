function updateInfo(){
  chrome.storage.sync.get(["breached","arrayHistory"], function(result){
    document.getElementById('safe').innerHTML = result.breached;
  
    let numberPwned = 0;
  
    if(typeof result.arrayHistory !== 'undefined' && Array.isArray(result.arrayHistory)){
      numberPwned = result.arrayHistory.length;
      console.log(result.arrayHistory);
    }
    document.getElementById('pwned').innerHTML = numberPwned;
  
  });
}

function checkHistory(){
  chrome.history.search({text: ''}, history => {
    let arraySiteChecked = [];
    history.forEach(site => {
      let domain = (new URL(site.url));
      domain = domain.hostname;
      let arraySite = domain.split('.');
      let nameSite = arraySite[arraySite.length - 2];
      let url = 'https://haveibeenpwned.com/api/v3/breach/'+nameSite;
      //console.log(nameSite);

      if(arraySiteChecked.indexOf(nameSite) === -1){  
        arraySiteChecked.push(nameSite);  


        fetch(url)
        .then(response => {
          if(response.status !== 404){
            response.json().then(data => {
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
              })
            })
          }
        })
        .catch(error => alert("Erreur : " + error));

      }
    })
  });

  updateInfo();
}

document.getElementById("historyButton").addEventListener("click", checkHistory);



updateInfo();