chrome.history.search({text: ''}, history => {
  history.forEach(site => {
    let domain = (new URL(site.url));
    domain = domain.hostname;
    let arraySite = domain.split('.');
    let nameSite = arraySite[arraySite.length - 2];
    let url = 'https://haveibeenpwned.com/api/v3/breach/'+nameSite;
    fetch(url)
    .then(response => {
        if (response.status !== 404) {
            document.getElementById('listHistory').innerHTML += "<li style=\"color:red;\">WebSite : " + nameSite + "<b> has been breached</b></li>";
        } else {
            document.getElementById('listHistory').innerHTML += "<li style=\"color:lightGray;\">WebSite : " + nameSite + "<b> has not been breached yet</b></li>";
        }
    })
    .catch(error => alert("Erreur : " + error));
    });
});