const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(index, timestamp, data, previousHash = ''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.nonce = 0;
        this.hash = this.calculateHash();

        
    }
calculateHash(){
    return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
  }
 mineBlock(dufficulty){
     while(this.hash.substring(0, difficulty) !== Array(difficutly + 1).join("0")){
         this.hash = this.calculateHash();
     }
     console.log("Egg Collected " + this.hash + this.Block + i);
 }
}

class BlockChain {
    constructor(){
        this.chain = [this.createGenesisBlock()];
    }
     createGenesisBlock(){
      return new Block(0, "6/25/2019", "Origin Egg", "0");
    }

     getLatestBlock(){
       return this.chain[this.chain.length -1];
     }
     addBlock(newBlock){
         newBlock.previousHash = this.getLatestBlock().hash;
         newBlock.hash = newBlock.calculateHash();
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

DuckCoin.addBlock(new Block(1, "Webster & Nestle 3/27/2019", {amount: 2}));
DuckCoin.addBlock(new Block(2, "Idea Origin", "4/9/2019", {amount: 1}));
DuckCoin.addBlock(new Block(3, "Ducky & Ming-Ming", "4/12/2019", {amount: 2}));
DuckCoin.addBlock(new Block(4, "Frankie", "6/16/2019", {amount: 1}));

console.log(JSON.stringify(DuckCoin, null, 4));
console.log('Chain Valid? '+ DuckCoin.isChainValid());


