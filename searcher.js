let searchdelay;
async function fetchData(url = '') {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.json();
}
document.getElementById("refsheet-user-search").addEventListener("input", ()=>{
    clearTimeout(searchdelay);
    searchdelay = setTimeout(() => {
        const oldSearches = document.querySelectorAll("div.refsheet-search-results a"); 
        oldSearches.forEach(block=>{
          block.remove();
        });

        let searchvalue = document.getElementById("refsheet-user-search").value.toString();
        fetchData(`../refsheet-api/getRefsheetUsers.php?value=${searchvalue}`).then((data) => {
          if (!data) return;
          for(let i=0; i<data.length; i++){
            const link = document.createElement("a");
            const listitem = document.createElement("div");
            const username = document.createElement("p");
            link.setAttribute("href", `https://anthonytoons.nl/pages/refsheet-user.php?user=${data[i]}`);
            link.setAttribute("target", "_blank");
            username.textContent = data[i];
            listitem.classList.add("refsheet-user");
            listitem.appendChild(username);
            link.appendChild(listitem)
            document.querySelector("div.refsheet-search-results").appendChild(link);
          };
        });
    }, "1000");
});