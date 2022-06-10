import Web3 from 'web3'

export class Web3Helpers {
  web3;

  constructor() {
    this.web3 = new Web3(new Web3.providers.HttpProvider(`https://kovan.infura.io/v3/${process.env.INFURA_KEY}`))
  }

  async getEthBalance(address) {
    let balance = await this.web3.eth.getBalance(address);

    return await this.web3.utils.fromWei(balance, 'ether')
  }

  async sendCrypto(wallet, addressTo, amount) {
    // create transaction
    const createTransaction = await this.web3.eth.accounts.signTransaction(
      {
        from: wallet.ethAddress,
        to: addressTo,
        value: this.web3.utils.toWei(amount.toString()),
        gas: '2000000',
      }, wallet.privateKey);

    // deploy transaction
   await this.web3.eth.sendSignedTransaction(createTransaction.rawTransaction);
  }
}
