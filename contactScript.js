//Curl to Fetch: https://kigiri.github.io/fetch/
//Curl Command: curl -v -u cMDZbL73DjiNMEH2XWp:X -H "Content-Type: application/json" -X GET 'https://newaccount1611048753883.freshdesk.com/api/v2/tickets'

function createHtmlElement(element,  className='', id=''){
    var elem = document.createElement(element);
    elem.setAttribute('class', className);
    elem.setAttribute('id', id);
    return elem;
}


async function sendRequestContacts(){
if (document.getElementById('contactBox').textContent !== "") return;
let originalApiKey = "cMDZbL73DjiNMEH2XWp";
let apiKey = "Y01EWmJMNzNEamlOTUVIMlhXcDpY";
let domainName = "newaccount1611048753883";
let dataType = "contacts";
let URL = "https://"+domainName+".freshdesk.com/api/v2/"+dataType;
let freshResp = await fetch(URL, {
                                  headers: {
                                    Authorization: "Basic "+apiKey,
                                    "Content-Type": "application/json"
                                    }
                                  });
let freshData = await freshResp.json();
//console.log(freshData);
displayTickets(freshData);
}

function displayTickets(ticketsArray){

    let contactBox = document.querySelector('.contact-box');
    ticketsArray.forEach( (elem, index) => {
         var card = createHtmlElement('div', 'card contact-body', `card${index}`);
         contactBox.appendChild(card);
         var cardBody = createHtmlElement('div', 'card-body');
         cardBody.innerHTML = `<h5 class="card-title">${elem.name}</h5>
         <p class="card-text"><span class="bold">ID:</span> ${elem.id}, <span class="bold">Email:</span> ${elem.email}, <span class="bold">Phone:</span> ${elem.phone}<br>
         <span class="bold">Timezone:</span> ${elem.time_zone}</p>`;
         card.append(cardBody); 
    });
}