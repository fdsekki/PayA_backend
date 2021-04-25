const [sender, receiver, usdcIssuer, usdIssuer, usdcDistributor, usdDistributor, buyer] = require("../../accounts.json");
const { Server, Networks, Asset, TransactionBuilder, Operation, Keypair } = require("stellar-sdk");
const serverUrl = "https://horizon-testnet.stellar.org";

const server = new Server(serverUrl);

const main = async () => {

    const buyerAccount = await server.loadAccount(sender.public);

    const AnchorUSD = new Asset("USDC", usdcIssuer.public);

    const txOptions = {
        fee: await server.fetchBaseFee(),
        networkPassphrase: Networks.TESTNET
    };

    const  changeTrustOptions = {
        asset: AnchorUSD,
        limit: "500"
    };

    const manageSellOfferOptions = {
        selling: Asset.native(),
        buying: AnchorUSD,
        amount: "100",
        price: "1"
    };

    const transaction = new TransactionBuilder(buyerAccount, txOptions)
        .addOperation(Operation.changeTrust(changeTrustOptions))
        .addOperation(Operation.manageSellOffer(manageSellOfferOptions))
        .setTimeout(0)
        .build();

    transaction.sign(Keypair.fromSecret(sender.secret));

    await server.submitTransaction(transaction);
};

main()
    .then(console.log("OK"))
    .catch(e => {
        console.log("Error", e);
        throw e;
    });