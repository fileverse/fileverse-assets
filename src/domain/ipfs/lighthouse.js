const PassThrough = require('stream').PassThrough;
const request = require('request');
const Lighthouse = require("@lighthouse-web3/sdk");
const config = require('../../../config');

class LighthouseStorageService {
  constructor() {
    this.token = config.LIGHTHOUSESTORAGE_TOKEN;
    this.client = Lighthouse;
  }

  async upload(readableStreamForFile, { name, mimetype }) {
    const { data } = await this.client.uploadBuffer(readableStreamForFile, this.token, mimetype);
    if (!data.Hash) return null;
    return {
      ipfsUrl: `https://gateway.lighthouse.storage/ipfs/${data.Hash}`,
      ipfsHash: `${data.Hash}`,
      ipfsStorage: 'lighthouse.storage',
      pinSize: data.Size,
      timestamp: (new Date()).getTime(),
    };
  }

  async get({ ipfsHash }) {
    if (!ipfsHash) {
      return null;
    }
    const ipfsUrl = `https://gateway.lighthouse.storage/ipfs/${ipfsHash}`;
    console.log(ipfsUrl);
    const ipfsStream = new PassThrough();
    request(ipfsUrl).pipe(ipfsStream);
    return ipfsStream;
  }

  async remove({ ipfsHash }) {
    if (!ipfsHash) {
      return null;
    }
    return null;
  }
}

module.exports = LighthouseStorageService;
