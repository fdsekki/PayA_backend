const fetch = require("node-fetch") // for https request agains friendbot for funding accounts
const fs = require("fs")
const accounts = require("../../accounts.json")

const fundAccounts = async accounts => {
        await Promise.all(
            accounts.map(
                async account =>
                    await fetch(
                        `https://friendbot.stellar.org?addr=${encodeURIComponent(
                            account.public,
                        )}`,
                    )
            )  
        );
    }

fundAccounts(accounts)
    .then(() => console.log("OK"))
    .catch(e => {
        console.log("Error", e);
        throw e;
    });