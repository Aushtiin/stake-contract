const TokenFarm = artifacts.require("TokenFarm");

module.exports = async function(callback) {
  const tokenFarm = TokenFarm.deployed()
  await tokenFarm.issueTokens();

  console.log('Tokens Issued!');
  callback()
};