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
            document.getElementById('listHistory').innerHTML += "<li>WebSite : " + site.URL + " has not been breached yet</li>";
        } else {
            document.getElementById('listHistory').innerHTML += "<li>WebSite : " + site.URL + " has been breached</li>";
        }
    })
    .catch(error => alert("Erreur : " + error));
    });
});



document.getElementById('listHistory').innerHTML += "<li>WebSite : " + site.URL + " has not been breached yet</li>";

document.getElementById('listHistory').innerHTML += "<li>WebSite : " + site.URL + " has been breached</li>";