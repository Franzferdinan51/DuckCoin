const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(index, timestamp, data, previousHash = ''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }
calculateHash(){
    return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
  }
 
}

class BlockChain {
    constructor(){
        this.chain = [this.createGenesisBlock()];
    }
     createGenesisBlock(){
      return new Block(0, "3/27/2019", "Origin Egg", "0");
    }

     getLatestBlock(){
       return this.chain[this.chain.length -1];
     }
     addBlock(newBlock){
         newBlock.previousHash = this.getLatestBlock().hash;
         newBlock.hash = newBlock.calculateHash();
         this.chain.push(newBlock);
     }
     isChainValid(){
         for(let i = 0; i < this.chain.length; i++){
             const currentBlock = this.chain[i];
             const previousBlock = this.chain[i - 1];

             if(currentBlock !== currentBlock.calculateHash()){
                 console.log('currentBlock broken');
                 return false;
             }
                 if(currentBlock.previousHash !== previousBlock.hash) {
                     console.log('previousblock broken');
                    return false;
             }
        }
        return true;
     }
} 


let DuckCoin = new BlockChain();
DuckCoin.addBlock(new Block(1, "Webster & Nestle", "3/27/2019", {amount: 2}));
DuckCoin.addBlock(new Block(2, "Idea Origin", "4/9/2019", {amount: 1}));
DuckCoin.addBlock(new Block(3, "Ducky & Ming-Ming", "4/12/2019", {amount: 2}));
DuckCoin.addBlock(new Block(4, "Frankie", "6/16/2019", {amount: 1}));

console.log(JSON.stringify(DuckCoin, null, 4));
console.log('Chain Valid? '+ DuckCoin.isChainValid());
