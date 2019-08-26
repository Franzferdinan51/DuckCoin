const { Block } = require("./Block");

const SHA256 = require('crypto-js/sha256');
class Transaction {
    /**
     * @param {string} fromAddress
     * @param {string} toAddress
     * @param {number} amount
     */
    constructor(fromAddress, toAddress, amount) {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
        this.timestamp = Date.now();
    }

    /**
     * Creates a SHA256 hash of the transaction
     *
     * @returns {string}
     */
    calculateHash() {
        return SHA256(this.fromAddress + this.toAddress + this.amount + this.timestamp).toString();
    }

    /**
     * Signs a transaction with the given signingKey (which is an Elliptic keypair
     * object that contains a private key). The signature is then stored inside the
     * transaction object and later stored on the blockchain.
     *
     * @param {string} signingKey
     */
    signTransaction(signingKey) {
        // You can only send a transaction from the wallet that is linked to your
        // key. So here we check if the fromAddress matches your publicKey
        if (signingKey.getPublic('hex') !== this.fromAddress) {
            throw new Error('You cannot sign transactions for other wallets!');
        }


        // Calculate the hash of this transaction, sign it with the key
        // and store it inside the transaction obect
        const hashTx = this.calculateHash();
        const sig = signingKey.sign(hashTx, 'base64');

        this.signature = sig.toDER('hex');
    }
}
    //  class BlockChain SyntaxError: Unexpected identifier */
  class BlockChain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 3;
    }
      // styax error with const 56 and possible error on 57 (unknown fix)
createGenesisBlock(){
      return new Block(0, "6/25/2019", "Origin Egg", "0");
    }

     getLatestBlock(){
       return this.chain[this.chain.length -1];
     }
     addBlock(newBlock){
         newBlock.previousHash = this.getLatestBlock().hash;
         newBlock.mineBlock(this.difficulty);
         this.chain.push(newBlock);
     }
isChainValid() {
    // Check if the Genesis block hasn't been tampered with by comparing
    // the output of createGenesisBlock with the first block on our chain
    const realGenesis = JSON.stringify(this.createGenesisBlock());

    if (realGenesis !== JSON.stringify(this.chain[0])) {
      return false;
    }

    // Check the remaining blocks on the chain to see if there hashes and
    // signatures are correct
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];

      if (!currentBlock.hasValidTransactions()) {
        return false;
      }

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }
    }

    return true;
  }
}


let DuckCoin = new BlockChain();
console.log('Grabbing Egg 1...')
DuckCoin.addBlock(new Block(1, "Webster & Nestle", 3/27/2019", {amount: 2}));
console.log('Grabbing Egg 2...')
DuckCoin.addBlock(new Block(2, "Idea Origin", "4/9/2019", {amount: 1}));
console.log('Grabbing Egg 3...')
DuckCoin.addBlock(new Block(3, "Ducky & Ming-Ming", "4/12/2019", {amount: 2}));
console.log('Grabbing Egg 4...')
DuckCoin.addBlock(new Block(4, "Frankie", "6/16/2019", {amount: 1}));

console.log(JSON.stringify(DuckCoin, null, 4));
console.log('Chain Valid? '+ DuckCoin.isChainValid());


