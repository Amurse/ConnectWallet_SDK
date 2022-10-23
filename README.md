Amurse SDK for connecting wallets for different wallets

### MetaMask
Functions to interact with MetaMask. A class method supporting all chains supported by Metamask
Pass in a custom chain number array for allowed chains.

#### validateAddress(address)
validates any ETH address; returns boolean

#### connectSilently(errorHandler)
if the wallet is already connected to url; returns connected account

#### connect(errorHandler)
pops of notifications to connect to MetaMask; returns connected account

### bindChanges(data, callback)
data: {accounts: true, chain: true}
Pass in a boolean for accounts or chain to track wallet changes for accounts, and chain respectively.
<br/>
If account changed: calls callback({change: 'Account', account: accounts[0]});
<br/>
If chain changed: calls callback({change: 'Network', chain: chainId});


## Code Example
```
yarn add '@amurse/connect_sdk';

import {AmurseConnectMetamask} from '@amurse/connect_sdk';

const handleError = (err) => {
  console.log(err)
}

// allow Eth Mainnet, Polygon, Aave C-chain
const allowedNetworks = [1, 137, 43144]
const Metamask = new AmurseConnectMetamask({allowedNetworks: allowedNetworks})
MetaMask.connect(handleError)

const changesCallback = (identifier) => {
  console.log(identifier)
}

// callback upon accounts are changed
Metamask.bindChanges({accounts: true}, changesCallback)
```








# ConnectWallet_SDK
