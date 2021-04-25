const Stellar = require("stellar-sdk")
const accounts = require("../../accounts.json")
const { TimeoutInfinite } = require("stellar-base")

const server = new Stellar.Server("https://horizon-testnet.stellar.org")

const runTransaction = async (senderPubKey, senderPrivateKey, receiverPubKey) => {
    const standardFee = await server.fetchBaseFee() // standard fee could be hard coded or changed

    const transactionOptions = {
        fee: standardFee,
        networkPassphrase: Stellar.Networks.TESTNET
    };

    // data for the transaction
    const paymentToReceiver = {
        destination: receiverPubKey,
        asset: Stellar.Asset.native(), // we will use stellar's native asset which is lumens 
        amount: "100"
    };

    const senderAccount = await server.loadAccount(senderPubKey); // gives us the sequence number of the account 

    const transaction = new Stellar.TransactionBuilder(senderAccount, transactionOptions)
        .addOperation(Stellar.Operation.payment(paymentToReceiver))
        .addMemo(Stellar.Memo.text("Test Transaction"))
        .setTimeout(TimeoutInfinite)
        .build();

        // next step is to sign the transaction
        transaction.sign(senderPrivateKey);

        // here we are submitting the transaction to the network via node horizon server 
        await server.submitTransaction(transaction);
};

const [sender, receiver] = accounts;
console.log(sender)
console.log(receiver)

runTransaction(
    sender.public, 
    Stellar.Keypair.fromSecret(sender.secret), // stellar consumes a lot of his own objects, having directly the string of sender secret is not enough, we have to create a fully fledged object from it
    receiver.public
    )
    .then(() => console.log("OK"))
    .catch(e => {
        console.log(e)
        throw e;
    });

    // the transaction takes around 5 seconds to be written in the ledger