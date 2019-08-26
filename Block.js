const SHA256 = require('crypto-js/sha256');
class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.transactions = "transactions";
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.nonce = 0;
        this.hash = this.calculateHash();
    }
    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
    }
    mineBlock(difficulty) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log(`Block mined: ${this.hash}`);
 /**
   * Validates all the transactions inside this block (signature + hash) and
   * returns true if everything checks out. False if the block is invalid.
   *
   * @returns {boolean}
   */
  hasValidTransactions() {
    for (const tx of this.transactions) {
      if (!tx.isValid()) {
        return false;
      }
    }

    return true;
  }
}
exports.Block = Block;
