const fs = require("fs")
const Stellar = require("stellar-sdk")

const fileName = "accounts.json";

fs.writeFileSync(
    fileName,
    JSON.stringify(
        ["sender","receiver", "usdcIssuer", "usdIssuer", "usdcDistributor", "usdDistributor", "buyer"].map(
            (name) => {
                const pair = Stellar.Keypair.random()

                return {
                    name,
                    secret: pair.secret(),
                    public: pair.publicKey()
                };
            })
    )
);
