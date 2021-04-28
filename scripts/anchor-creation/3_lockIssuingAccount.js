const [sender, receiver, usdcIssuer, usdIssuer, usdcDistributor, usdDistributor, buyer] = require("../../accounts.json");
const { Server, Networks, Asset, TransactionBuilder, Operation, Keypair } = require("stellar-sdk");
const serverUrl = "https://horizon-testnet.stellar.org";

const server = new Server(serverUrl);

const main = async () => {
    // pull issuing account
    const usdcIssuingAccount = await server.loadAccount(usdcIssuer.public);

    // transaction options
    txOptions = {
        fee: await server.fetchBaseFee(),
        networkPassphrase: Networks.TESTNET
    };

    // use threshold
    const thresholds = {
        masterWeight: 0, // issuing account private key signature counts for 0, no rights. It will block any transaction with the public key of this account
        lowThreshold: 0,
        medThershold: 0,
        highThreshold: 0 // no more transactions on this account anymore
    };

    const transaction = new TransactionBuilder(usdcIssuingAccount, txOptions)
        .addOperation(Operation.setOptions(thresholds))
        .setTimeout(0)
        .build();

    transaction.sign(Keypair.fromSecret(usdcIssuer.secret))

    await server.submitTransaction(transaction);
}

main()
    .then(console.log("OK"))
    .catch(e => {
        console.log("Error", e);
        throw e;
    });