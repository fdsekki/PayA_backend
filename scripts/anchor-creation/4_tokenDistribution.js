const [sender, receiver, usdcIssuer, usdIssuer, usdcDistributor, usdDistributor, buyer] = require("../../accounts.json");
const { Server, Networks, Asset, TransactionBuilder, Operation, Keypair } = require("stellar-sdk");
const serverUrl = "https://horizon-testnet.stellar.org";

const server = new Server(serverUrl);

const main = async () => {
    const usdcDistributorAccount = await server.loadAccount(usdcDistributor.public);

    const AnchorUSD = new Asset("USDC", usdcIssuer.public);

    const txOptions = {
        fee: await server.fetchBaseFee(),
        networkPassphrase: Networks.TESTNET
    };

    const manageSellOfferOptions = {
        selling: AnchorUSD,
        buying: Asset.native(),
        amount: "1000",
        price: "1.0000000" 
    };

    const transaction = new TransactionBuilder(usdcDistributorAccount, txOptions)
        .addOperation(Operation.manageSellOffer(manageSellOfferOptions))
        .setTimeout(0)
        .build();

    transaction.sign(Keypair.fromSecret(usdcDistributor.secret));

    await server.submitTransaction(transaction)
};


main()
    .then(console.log("OK"))
    .catch(e => {
        console.log("Error", e);
        throw e;
    });