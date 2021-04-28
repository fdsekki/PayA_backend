const [sender, receiver, usdcIssuer, usdIssuer, usdcDistributor, usdDistributor, buyer] = require("../../accounts.json");
const { Server, Networks, Asset, TransactionBuilder, Operation, Keypair } = require("stellar-sdk");
const serverUrl = "https://horizon-testnet.stellar.org";

const server = new Server(serverUrl);

const main = async () => {

    // transaction options
    const txOptions = {
        fee: await server.fetchBaseFee(),
        networkPassphrase: Networks.TESTNET
    };

    // pull the distributrion account with other information like sequence number of the account, each operation will increase the sequence number 
    const usdcDistibutorAccount = await server.loadAccount(usdcDistributor.public);

    // specify our assets 
    const AnchorUSD = new Asset("USDC", usdcIssuer.public);

    // create our trustline options
    const  changeTrustOptions = {
        asset: AnchorUSD,
        limit: "1000"
    };

    // create transaction
    const transaction = new TransactionBuilder(usdcDistibutorAccount, txOptions)
        .addOperation(Operation.changeTrust(changeTrustOptions))
        .setTimeout(0) // transaction is valid any time 
        .build()

    // sign the transaction with a private key of distributor account
    transaction.sign(Keypair.fromSecret(usdcDistributor.secret));

    await server.submitTransaction(transaction)
};

main()
    .then(console.log("OK"))
    .catch(e => {
        console.log("Error", e);
        throw e;
    });