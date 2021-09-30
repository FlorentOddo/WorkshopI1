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

updateInfo();