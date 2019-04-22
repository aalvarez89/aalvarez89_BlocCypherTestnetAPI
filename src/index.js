//Nodes
const BAL_BUTTON = document.getElementById("balance-button");
const FND_BUTTON = document.getElementById("fund-button");
const INPT_FIELD = document.getElementById("num-input");
const BAL_NUMBER = document.getElementById("balance");
const ALERT_TEXT = document.getElementById("alert")
const APP = document.getElementById("app");


//Global Variables
const token = "1781fab6e5354a1bbf10aefa9aa504af";

let std_address;

//Fetch Functions
const makeRequest = async () => {
  // Function to request the BlockCypher's API
  try {
    let response = await fetch(
      `https://api.blockcypher.com/v1/bcy/test/addrs`, {
        method: "POST"
      }
    );
    let json = await response.json();
    std_address = json.address;
    APP.innerHTML = `
    <p class="layout-text-2 fade">New address created!</p>
    
    <br>
    <img class="mailbox" src="src/img/mailbox.png" alt="Mailbox Address">
  <p class="layout-text-1">Address </p>
  <div class="address">${std_address}</div>`;
    console.log(json);
  } catch (err) {
    APP.innerHTML = `
    <p class="layout-text-1">Could not establish a connection with BlockCypher's Network</p>`;
    console.log("err");
  }

  return "done";
};

makeRequest();
const sendFunds = async () => {
  if (!Boolean(INPT_FIELD.value) || INPT_FIELD.value > 100000) {

    ALERT_TEXT.classList.add("layout-text-alr");
    ALERT_TEXT.classList.remove("layout-text-alr-off");

  } else {
    try {
      // console.log(INPT_FIELD.value);
      let data = {
        address: std_address,
        amount: parseInt(INPT_FIELD.value)
      };
      let fundAddress = await fetch(
        `https://api.blockcypher.com/v1/bcy/test/faucet?token=${token}`, {
          method: "POST",
          body: JSON.stringify(data)
        }
      );
      let json = await fundAddress.json();


      console.log(json);

      let balance_response = await fetch(
        `https://api.blockcypher.com/v1/bcy/test/addrs/${std_address}/balance`
      );
      let balance_json = await balance_response.json();
      BAL_NUMBER.innerHTML = balance_json.final_balance;
      console.log(balance_json);

      if (ALERT_TEXT.classList[0] === "layout-text-alr") {
        ALERT_TEXT.classList.remove("layout-text-alr");
        ALERT_TEXT.classList.add("layout-text-alr-off");
      }
    } catch (err) {
      console.log("err");
    }
  }
};

//Event Handlers
FND_BUTTON.addEventListener("click", sendFunds);