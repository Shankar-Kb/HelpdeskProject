//Curl to Fetch: https://kigiri.github.io/fetch/
//Curl Command: curl -v -u cMDZbL73DjiNMEH2XWp:X -H "Content-Type: application/json" -X GET 'https://newaccount1611048753883.freshdesk.com/api/v2/tickets'

function createHtmlElement(element,  className='', id=''){
    var elem = document.createElement(element);
    elem.setAttribute('class', className);
    elem.setAttribute('id', id);
    return elem;
}

async function sendRequest(){
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
console.log(freshData);
displayTickets(freshData);

}

function displayTickets(ticketsArray){

let ticketBox = document.querySelector('.ticket-box');
ticketsArray.forEach( (elem, index) => {
     var card = createHtmlElement('div', 'card ticket-body', `card${index}`);
     ticketBox.appendChild(card);
     var cardBody = createHtmlElement('div', 'card-body');
     cardBody.innerHTML = `ID: ${elem.id}, Email: ${elem.requester.email}, Name: ${elem.requester.name}<br>
     Status: ${convertStatus(elem.status)}, Priority: ${convertPriority(elem.priority)}`;
     card.append(cardBody);
     
     var inputGrpMain = createHtmlElement('div', 'input-group');
     cardBody.append(inputGrpMain);
     var inputGrpPre = createHtmlElement('div', 'input-group-prepend');
     inputGrpPre.innerHTML = `<label class="input-group-text">Change Status</label>`;

     var selectStatus = createHtmlElement('select', 'custom-select', 'selectStatus');
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
     
     var newStatus = document.getElementById('selectStatus');
     statusButton.addEventListener('click', () => {
      changeStatus(+newStatus.selectedOptions[0].value);
     });         
});
}

function changeStatus(value){
    console.log(value);
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

/* <div class="input-group-prepend">
    <label class="input-group-text" for="inputGroupSelect01">Status</label>
  </div>
  <select class="custom-select" id="inputGroupSelect01">
    <option selected>Choose...</option>
    <option value="1">One</option>
    <option value="2">Two</option>
    <option value="3">Three</option>
  </select>
  <div class="input-group-append">
    <button class="btn btn-outline-secondary" type="button">Set New Status</button>
  </div> */