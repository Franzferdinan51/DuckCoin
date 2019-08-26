const SHA256 = require('crypto-js/sha256')

class Block{
 constructor(index, timestamp, data, previousHash = ''){
     this.index = index;
     this.timestamp = timestamp;
     this.data = data;
     this.previousHash = previousHash;
     this.hash = this.calculateHash();
     this.nonce = 0;
 }
 calculateHash(){
     return SHA256(this.index + this.perviousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();

 }
 mineBlock(difficulty){
     while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")){
         this.nonce++;
         this.hash = this.calculateHash();
     }
     console.log("Egg Found: " + this.hash);
 }
}


class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 4;
    }
    createGenesisBlock(){
        return new Block(0, "6/25/2019", "Origin Egg", "0" )
    }
    getLatestBlock(){
return this.chain[this.chain.length -1];
    }
    addBlock(newBlock){
newBlock.previousHash = this.getLatestBlock().hash;
newBlock.mineBlock(this.difficulty);
this.chain.push(newBlock);
    }
    isChainValid(){
        for(let i = 1; i < this.chain.length; i++ ){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];
            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }
            if(currentBlock.previousHash !== previousBlock.hash){
                return false;
            }
        }
        return true;
    }
}

let DuckCoin = new Blockchain();
console.log('Grabbing Egg 1...');
DuckCoin.addBlock(new Block(1, "3/27/2019", "Webster & Nestle - Khaki Campbell Ducks", { amount:2}));
console.log('Grabbing Egg 2...');
DuckCoin.addBlock(new Block(2, "4/09/2019", "Idea Origin", { amount:1}));
console.log('Grabbing Egg 3...');
DuckCoin.addBlock(new Block(3, "4/12/2019", "Ducky & Ming-Ming - Pekin Ducks", { amount:2}));
console.log('Grabbing Egg 4...');
DuckCoin.addBlock(new Block(4, "6/16/2019", "Frankie - Cayuga Duck", { amount:1}));

console.log(JSON.stringify(DuckCoin, null, 4));