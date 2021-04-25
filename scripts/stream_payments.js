const EventSource = require("eventsource");
const [sender, receiver, issuer, distributor, buyer] = require('../accounts.json');

const es = new EventSource(
    "https://horizon-testnet.stellar.org/accounts/GDSRMWVGXEER5NRRQGQQUESQPMMJSJHENJDGDYP5TJ4PHTNITO7B2PF3/payments",
);
es.onmessage = (message)  => {
const result = message.data ? JSON.parse(message.data) : message;
console.log("New payment on the Buyer Account:");
console.log(result);
};
es.onerror = (error) => {
console.log("An error occurred!");
};