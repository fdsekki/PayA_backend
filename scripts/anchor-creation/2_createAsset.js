const [sender, receiver, usdcIssuer, usdIssuer, usdcDistributor, usdDistributor, buyer] = require("../../accounts.json");
const { Server, Networks, Asset, TransactionBuilder, Operation, Keypair } = require("stellar-sdk");
const serverUrl = "https://horizon-testnet.stellar.org";

const server = new Server(serverUrl);

const main = async () => {
    // pull issuing account
    const usdcIssuingAccount = await server.loadAccount(usdcIssuer.public);

    // declare asset
    const AnchorUSD = new Asset("USDC", usdcIssuer.public);

    // transaction options
    txOptions = {
        fee: await server.fetchBaseFee(),
        networkPassphrase: Networks.TESTNET
    };

    // payment options
    const paymentOptions = {
        asset: AnchorUSD,
        destination: usdcDistributor.public,
        amount: "1000"
    };

    // create transaction
    const transaction = new TransactionBuilder(usdcIssuingAccount, txOptions)
        .addOperation(Operation.payment(paymentOptions))
        .setTimeout(0)
        .build();

    transaction.sign(Keypair.fromSecret(usdcIssuer.secret));

    await server.submitTransaction(transaction);
}

main()
    .then(console.log("OK"))
    .catch(e => {
        console.log("Error", e);
        throw e;
    });