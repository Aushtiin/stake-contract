// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.4;

import "./DappToken.sol";
import "./DaiToken.sol";

contract TokenFarm {
    string public name = "Dapp Token Farm";
    DappToken public dappToken;
    DaiToken public daiToken;

    address[] public stakers;
    mapping(address => uint) public stakingBalance;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaking;

    constructor(DappToken _dappToken, DaiToken _daiToken) public {
        dappToken = _dappToken;
        daiToken = _daiToken;
    }

    function stakeTokens(uint _amount) public {
      //transfer dai tokens to this contract from staking
      daiToken.transferFrom(msg.sender, address(this), _amount);

      // update staking balance
      stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount;

      //add users to stakers array *only* if they haven't staked already
      if(!hasStaked[msg.sender]){
        stakers.push(msg.sender);
      }

      //update staking status
      isStaking[msg.sender] = true;
      hasStaked[msg.sender] = true;
    }

    function issueToken() public {
      for(uint i=0; i<stakers.length; i++){
        
      }
    }
}
