const { ethers } = require("ethers");
const pokerRewardsNFT = require("../config/contracts/pokerRewardsNFT");
const {getProvider} = require("../utils/ethersUtil");

exports.getAwardsBalance = async (address) => {
  const provider = getProvider();
  const contract = new ethers.Contract(pokerRewardsNFT.address, pokerRewardsNFT.abi, provider);

  const balance = await contract.balanceOf(address);
  return balance.toString();
};
