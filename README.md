# PayA_backend
This repository works on the testnet of the stellar developer foundations and has the basics of anchor creation and transactions.

# Try it out
```git clone https://github.com/fdsekki/PayA_backend.git```

1. Run cmd/terminal in the cloned folder.

~ To crate a transaction between two accounts:
2. ```node scripts/0_createAccount.js```
3. ```node scripts/1_fundAccounts.js```
4. ```node scripts/2_checkBalances.js```
5. ```node scripts/sender-receiver/3_makeTransaction.js```
6. ```node scripts/2_checkBalances.js```

~ To create an anchor, purchase it and the send it to another user:
2. ```node scripts/0_createAccount.js```
3. ```node scripts/1_fundAccounts.js```
4. ```node scripts/2_checkBalances.js```
5. ```node scripts/anchor-creation/1_changeTrust.js```
6. ```node scripts/anchor-creation/2_createAsset.js```
7. ```node scripts/anchor-creation/3_lockIssuingAccount.js```
8. ```node scripts/anchor-creation/4_tokenDistribution.js```
9. ```node scripts/anchor-creation/5_purchaseToken.js```
10. ```node scripts/2_checkBalances.js```
