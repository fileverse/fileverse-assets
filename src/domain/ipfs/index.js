const config = require('../../../config');
const Web3StorageService = require('./web3storage');
const Pinata = require('./pinata');
const Lighthouse = require('./lighthouse');

class IPFS {
  constructor() {
    this.web3Storage = new Web3StorageService();
    this.pinata = new Pinata();
    this.lighthouse = new Lighthouse();
    this.defaultService = config.DEFAULT_IPFS_SERVICE || 'pinata';
  }

  async upload(readableStreamForFile, { name, attributes }) {
    if (this.defaultService === 'web3.storage') {
      return this.web3Storage.upload(readableStreamForFile, {
        name,
        attributes,
      });
    } else if (this.defaultService === 'lighthouse.storage') {
      return this.lighthouse.upload(readableStreamForFile, {
        name,
        attributes,
      });
    }
    return this.pinata.upload(readableStreamForFile, { name, attributes });
  }

  async get(ipfsHash) {
    if (ipfsStorage === 'web3.storage') {
      return this.web3Storage.get({ ipfsHash });
    } else if (ipfsStorage === 'lighthouse.storage') {
      return this.lighthouse.get({ ipfsHash });
    }
    return this.pinata.get({ ipfsHash });
  }

  async remove({ ipfsHash, ipfsStorage }) {
    if (ipfsStorage === 'web3.storage') {
      return this.web3Storage.remove({ ipfsHash });
    } else if (ipfsStorage === 'lighthouse.storage') {
      return this.lighthouse.remove({ ipfsHash });
    }
    return this.pinata.remove({ ipfsHash });
  }
}

module.exports = IPFS;
