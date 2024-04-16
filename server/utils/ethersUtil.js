const { ethers } = require("ethers");
const network = "sepolia";

exports.getProvider = () => {
  return new ethers.AlchemyProvider(network, 'demo')
};
