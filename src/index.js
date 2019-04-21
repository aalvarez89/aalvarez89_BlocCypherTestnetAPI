import "./styles.css";

const BAL_BUTTON = document.getElementById("balance-button");
const FND_BUTTON = document.getElementById("fund-button");
const INPT_FIELD = document.getElementById("num-input");

const token = "1781fab6e5354a1bbf10aefa9aa504af";
let prv_address, pub_address, std_address;

const makeRequest = async () => {
  try {
    let response = await fetch(
      `https://api.blockcypher.com/v1/bcy/test/addrs`, {
        method: "POST"
      }
    );
    let json = await response.json();
    std_address = json.address;
    document.getElementById("app").innerHTML = `Request done
  <br>
  Address: ${std_address}`;
    console.log(json);
  } catch (err) {
    console.log("err");
  }

  return "done";
};
makeRequest();

const getBalance = async () => {
  try {
    let limit_response = await fetch(
      `https://api.blockcypher.com/v1/bcy/test/addrs/${std_address}/balance`
    );
    let limit_json = await limit_response.json();
    if (limit_json.error) {
      console.log("whoops!");
    }
    console.log(limit_json);
  } catch (err) {
    console.log(err);
  }
  return "done";
};

const sendFunds = async () => {
  try {
    console.log(INPT_FIELD.value);
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
  } catch (err) {}
};
BAL_BUTTON.addEventListener("click", getBalance);
FND_BUTTON.addEventListener("click", sendFunds);