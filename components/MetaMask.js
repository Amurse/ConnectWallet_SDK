const Web3 = require('web3');

class AmurseConnectMetamask {
  constructor(props) {
    this.allowedNetworks = props.allowedNetworks || [1];
  }
  
  validateAddress  (address) {
    return Web3.utils.isAddress(address);
  };

  async connectSilently (errorHandler) {
    if (window && window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      const web3 = window.web3;
      const networkId = await window.web3.eth.getChainId();
      let accounts;
      await web3.eth.getAccounts((err, result) => {
        if (err) return errorHandler && errorHandler(err)
        accounts = result;
      });
      if (!networkId || !accounts[0]) return;
      if (networkId && !this.allowedNetworks.includes(networkId)) {
        errorHandler && errorHandler('Chat does not support current network');
        return
      }
      return accounts[0];
    }
    return null;  
  }

  async connect (errorHandler) {
    if (window && window.ethereum) {
      const accounts = await ethereum.request({method: 'eth_requestAccounts'});
      window.web3 = new Web3(ethereum);
      const networkId = await window.web3.eth.getChainId();
      if (!this.allowedNetworks.includes(networkId) || !accounts[0]) return errorHandler && errorHandler('Please verify network/active account');
      return accounts[0];
    } else {
      errorHandler && errorHandler('Please install metamask');
    }
  };

  bindChanges({ accounts, chain }, callback) {
    const ethereum = window && window.ethereum;
    if (!ethereum) return;
    if (accounts) {
      ethereum.on('accountsChanged', (accounts) => {
        callback && callback({change: 'Account', account: accounts[0]})
      });
    }

    if (chain) {
      ethereum.on('chainChanged', (chainId) => {
        callback && callback({change: 'Network', chain: chainId})
      });
    }
  }
}





module.exports = AmurseConnectMetamask