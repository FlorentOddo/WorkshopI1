chrome.storage.sync.get(["arrayHistory"], function(result){
    if(typeof result.arrayHistory !== 'undefined' && Array.isArray(result.arrayHistory)){
        result.arrayHistory.forEach(element => {
            document.getElementById('sites').innerHTML += "<li> Website : "+element.name +", Date : "+element.date + ", Account powned : "+element.PwnCount+", Description : "+element.description +"</li></br>";
      });;
      console.log(result.arrayHistory);
    }
});