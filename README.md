# PayA_backend
This repository works on the testnet of the stellar developer foundations and has the basics of transactions, anchor creation and transactions.


First of all you have to run node scripts/sender-receiver/0_createAccount.js to create the accounts, next will be node scripts/sender-receiver/1_fundAccounts.js. 
Now we can create the test anchor and play with it. Run node scripts/stellar-asset/balances.js to check every account and they're state. 
node scripts/stellar-asset/1_changeTrust.js
node scripts/stellar-asset/2_createAsset.js
node scripts/stellar-asset/3_lockIssuingAccount.js
node scripts/stellar-asset/4_tokenDistribution.js
node scripts/stellar-asset/5_purchaseToken.js
node scripts/stellar-asset/balances.js -> here we can see the usd anchor in the sender account, from here we can make the transaction to the receiver with 3_makeTransaction.
