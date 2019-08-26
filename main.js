const SHA256 = require('crypto-js/sha256')

class Transaction{
    constructor(fromAddress, toAddress, amount){
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;0
    }
}

class Block{
 constructor(timestamp, transactions, previousHash = ''){
     this.timestamp = timestamp;
     this.transactions = transactions;
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
     console.log("Searching for Eggs: " + this.hash);
 }
}


class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 1;
        this.pendingTransactions = [];
        this.miningReward = 100;
    }
    createGenesisBlock(){
        return new Block("6/25/2019", "Origin Egg", "0" )
    }
    getLatestBlock(){
return this.chain[this.chain.length -1];
    }

    minePendingTransactions(miningRewardAddress){
        let block = new Block(Date.now(), this.pendingTransactions);
        block.mineBlock(this.difficulty);

        console.log('Found Egg Successfully!');
        this.chain.push(block);

        this.pendingTransactions = [
            new Transaction(null, miningRewardAddress, this.miningReward)
        ];
        /*needs work*/
    }

createTransaction(transaction){
  this.pendingTransactions.push(transaction);
}

getBalanceOfAddress(address){
    let balance = 0
    for(const block of this.chain){
        for(const trans of block.transactions){
            if(trans.fromAddress === address){
                balance-= trans.amount;
            }
            if(trans.toAddress === address){
                balance+=trans.amount;
            }
        }
    }
    return balance;
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
DuckCoin.createTransaction(new Transaction('address1', 'address2', 100));
DuckCoin.createTransaction(new Transaction('address2', 'address1', 50));

console.log('\n Starting Egg Search...');
DuckCoin.minePendingTransactions('ryans-address');

console.log('\n Ammount of Eggs in my Basket', DuckCoin.getBalanceOfAddress('ryans-address'));






  /*
Last spot Video 3 Miner Rewards and Transactions
*/

