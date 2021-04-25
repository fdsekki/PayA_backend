const [sender, receiver, usdcIssuer, usdIssuer, usdcDistributor, usdDistributor, buyer] = require("../../accounts.json");
const { Server } = require("stellar-sdk");
const serverUrl = "https://horizon-testnet.stellar.org";

const displayTemplate = ({ name, accountId, balances }) => {
  console.log(
    `\u001b[33m${name}\u001b[0m \u001b[37;2m${accountId.substring(
      0,
      9
    )}${Array.from(new Array(15 - name.length))
      .map(() => "⋅")
      .join("")}\u001b[0m${balances}`
  );
};

const server = new Server(serverUrl);

const checkAccounts = async () => {
  const stellarAccounts = await Promise.all(
    [sender, receiver, usdcIssuer, usdIssuer, usdcDistributor, usdDistributor, buyer].map(async ({ name, public }) => {
      const account = await server.loadAccount(public);
      return {
        name,
        accountId: public,
        balances: account.balances.map(
          ({ balance, asset_type, asset_code }) =>
            `${balance} ${asset_type === "native" ? "XLM" : asset_code}`
        )
      };
    })
  );

  stellarAccounts.forEach(displayTemplate);
};

checkAccounts().catch(e => {
  console.log("Error", e);
  throw e;
});