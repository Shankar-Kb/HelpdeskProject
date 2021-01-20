//Curl to Fetch: https://kigiri.github.io/fetch/
//Curl Command: curl -v -u cMDZbL73DjiNMEH2XWp:X -H "Content-Type: application/json" -X GET 'https://newaccount1611048753883.freshdesk.com/api/v2/tickets'

function createHtmlElement(element,  className='', id=''){
    var elem = document.createElement(element);
    elem.setAttribute('class', className);
    elem.setAttribute('id', id);
    return elem;
}


async function sendRequest(){
if (document.getElementById('ticketBox').textContent !== "") return;
let originalApiKey = "cMDZbL73DjiNMEH2XWp";
let apiKey = "Y01EWmJMNzNEamlOTUVIMlhXcDpY";
let domainName = "newaccount1611048753883";
let dataType = "tickets";
let URL = "https://"+domainName+".freshdesk.com/api/v2/"+dataType+"?include=requester";
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

let ticketBox = document.querySelector('.ticket-box');
ticketsArray.forEach( (elem, index) => {
     var card = createHtmlElement('div', 'card ticket-body', `card${index}`);
     ticketBox.appendChild(card);
     var cardBody = createHtmlElement('div', 'card-body');
     cardBody.innerHTML = `<h5 class="card-title">${elem.subject}</h5>
     <p class="card-text"><span class="bold">ID:</span> ${elem.id}, <span class="bold">Email:</span> ${elem.requester.email}, <span class="bold">Name:</span> ${elem.requester.name}<br>
     <span class="bold">Status:</span> ${convertStatus(elem.status)}, <span class="bold">Priority:</span> ${convertPriority(elem.priority)}</p>`;
     card.append(cardBody);
     
     var inputGrpMain = createHtmlElement('div', 'input-group');
     cardBody.append(inputGrpMain);
     var inputGrpPre = createHtmlElement('div', 'input-group-prepend');
     inputGrpPre.innerHTML = `<label class="input-group-text">Change Status</label>`;

     var selectStatus = createHtmlElement('select', 'custom-select', `status${index}`);
     selectStatus.name = "status";
     selectStatus.innerHTML = `<option selected>Choose...</option>
     <option value="2">Open</option>
     <option value="3">Pending</option>
     <option value="4">Resolved</option>
     <option value="5">Closed</option>`;

     var inputGrpApp = createHtmlElement('div', 'input-group-append');
     inputGrpMain.append(inputGrpPre, selectStatus, inputGrpApp);
     var statusButton = createHtmlElement('button', 'btn btn-secondary', 'statusButton');
     statusButton.innerHTML = `Set`;
     inputGrpApp.append(statusButton);
     
     
     statusButton.addEventListener('click', () => {
      var newStatus = document.getElementById(`status${index}`);
      changeStatusPriority(newStatus.selectedOptions[0].value, elem.id, "status");
     });
     


     var inputGrpPreP = createHtmlElement('div', 'input-group-prepend');
     inputGrpPreP.innerHTML = `<label class="input-group-text">Change Priority</label>`;

     var selectStatusP = createHtmlElement('select', 'custom-select', `priority${index}`);
     selectStatusP.name = "priority";
     selectStatusP.innerHTML = `<option selected>Choose...</option>
     <option value="1">Low</option>
     <option value="2">Medium</option>
     <option value="3">High</option>
     <option value="4">Urgent</option>`;

     var inputGrpAppP = createHtmlElement('div', 'input-group-append');
     inputGrpMain.append(inputGrpPreP, selectStatusP, inputGrpAppP);
     var statusButton = createHtmlElement('button', 'btn btn-secondary', 'statusButton');
     statusButton.innerHTML = `Set`;
     inputGrpAppP.append(statusButton);
     
     statusButton.addEventListener('click', () => {
      var newPriority = document.getElementById(`priority${index}`);
      changeStatusPriority(newPriority.selectedOptions[0].value, elem.id, "priority");
     });
});
}

async function changeStatusPriority(newValue, ticketNumber, type){
              let newStatusResp = await fetch("https://newaccount1611048753883.freshdesk.com/api/v2/tickets/"+ticketNumber, {
                body: "{ \""+type+"\":"+newValue+" }",
                headers: {
                  Authorization: "Basic Y01EWmJMNzNEamlOTUVIMlhXcDpY",
                  "Content-Type": "application/json"
                },
                method: "PUT"
                });
              let newStatusData = await newStatusResp.json();
              console.log(newStatusData);
              refreshTickets();                                          
}

function refreshTickets(){
  document.getElementById('ticketBox').innerHTML = ``;
  sendRequest();
}

function convertPriority(number){
    switch(number) {
        case 1:
          return 'Low';
        case 2:
          return 'Medium';
        case 3:
          return 'High';
        case 4:
          return 'Urgent';
      }
}
function convertStatus(number){
    switch(number) {
        case 2:
          return 'Open';
        case 3:
          return 'Pending';
        case 4:
          return 'Resolved';
        case 5:
          return 'Closed';
      }
}