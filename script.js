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

function checkHistory() {
  document.getElementById('history').style.display = "block";
  
  let domain = (new URL(urlComplet));
  domain = domain.hostname;
  let arraySite = domain.split('.');
  let nameSite = arraySite[arraySite.length - 2];
  let url = 'https://haveibeenpwned.com/api/v3/breach/'+nameSite;

  chrome.history.search({text: ''}, history => {
    history.forEach(site => {
      fetch(url)
      .then(response => {
        if (response.status !== 404) {
          
        } else {
          chrome.storage.sync.set({'breached': nameSite + " has not been breached yet"}); 
        }
      })
      .catch(error => alert("Erreur : " + error));
    });
  });

  updateInfo();
}

document.getElementById("historyButton").addEventListener("click", checkHistory);


updateInfo();