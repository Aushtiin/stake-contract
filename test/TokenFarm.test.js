const { assert } = require('chai');

const TokenFarm = artifacts.require("TokenFarm");
const DappToken = artifacts.require("DappToken");
const DaiToken = artifacts.require("DaiToken");
require('chai')
  .use(require('chai-as-promised'))
  .should()


function tokens(n){
  return web3.utils.toWei(n, 'ether')
}

contract('TokenFarm', ([owner, investor]) => {
  let daiToken, dappToken, tokenFarm
  before(async () => {
    daiToken = await DaiToken.new();
    dappToken = await DappToken.new();
    tokenFarm = await TokenFarm.new(dappToken.address, daiToken.address);

    //transfer all Dapp tokens to farm(1million)
  await dappToken.transfer(tokenFarm.address, tokens('1000000'));

  //send tokens to investor
  await daiToken.transfer(investor, tokens('100'), { from: owner })
  })

  describe("Mock Dai Deployment", async () => {
    it('has a name', async () => {
      const name = await daiToken.name();
      assert.equal(name, "Mock DAI Token")
    })
  })

  describe('Dapp Token Deployment', async() => {
    it('has a name', async () => {
      const name = await dappToken.name();
      assert.equal(name, 'DApp Token');
    })
  })

  describe('Token Farm Deployment', async() => {
    it('has a name', async () => {
      const name = await tokenFarm.name();
      assert.equal(name, 'Dapp Token Farm');
    })

    it('should ensure contract has tokens', async () => {
      let balance = await dappToken.balanceOf(tokenFarm.address);
      assert.equal(balance.toString(), tokens('1000000'))
    })
  })

  describe('Farming Tokens', async () => {
    it('rewards investors for staking mDai tokens', async () => {
      let result;

      //check investor balance before staking
      result = await daiToken.balanceOf(investor)
      assert.equal(result.toString(), tokens('100'), 'investor mock dai wallet balance correct before staking');

      await daiToken.approve(tokenFarm.address, tokens('100'), { from: investor});
      await tokenFarm.stakeTokens(tokens('100'), { from: investor});

      //check staking result 
      result = await daiToken.balanceOf(investor)
      assert.equal(result.toString(), tokens('0'), 'investor Mock Dai wallet balance correct after staking')

      //check balance of token farm
      result = await daiToken.balanceOf(tokenFarm.address);
      assert.equal(result.toString(), tokens('100'), 'Token farm mock dai balance correct after staking')

      //check staking balance
      result = await tokenFarm.stakingBalance(investor);
      assert.equal(result.toString(), tokens('100'), 'investor staking balance correct after staking')

      //investor staking status should be isStaking
      result = await tokenFarm.isStaking(investor);
      assert.equal(result.toString(), 'true', 'investor staking status correct after staking')
    })
  })
})