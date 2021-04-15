// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.4;

import "./DappToken.sol";
import "./DaiToken.sol";

contract TokenFarm {
    string public name = "Dapp Token Farm";
    address public owner;
    DappToken public dappToken;
    DaiToken public daiToken;

    address[] public stakers;
    mapping(address => uint256) public stakingBalance;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaking;

    constructor(DappToken _dappToken, DaiToken _daiToken) public {
        dappToken = _dappToken;
        daiToken = _daiToken;
        owner = msg.sender;
    }

    function stakeTokens(uint256 _amount) public {
      //require amount to be greater than 0
        require(_amount > 0, "amount cannot be 0");

        //transfer dai tokens to this contract from staking
        daiToken.transferFrom(msg.sender, address(this), _amount);

        // update staking balance
        stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount;

        //add users to stakers array *only* if they haven't staked already
        if (!hasStaked[msg.sender]) {
            stakers.push(msg.sender);
        }

        //update staking status
        isStaking[msg.sender] = true;
        hasStaked[msg.sender] = true;
    }

    function unstakeTokens() public {
        //fetch staking balance
        uint balance = stakingBalance[msg.sender];

        require(balance > 0, "staking balance cannot be 0");

        //transfer mock dai tokens back to staker;
        daiToken.transfer(msg.sender, balance);

        //reset staking balance 
        stakingBalance[msg.sender] = 0;

        //update staking status 
        isStaking[msg.sender] = false;
    }

    function issueTokens() public {
        require(msg.sender == owner, "caller must be the owner");

        //issue tokens to all stakers
        for (uint256 i = 0; i < stakers.length; i++) {
            address recipient = stakers[i];
            uint256 balance = stakingBalance[recipient];
            if (balance > 0) {
                dappToken.transfer(recipient, balance);
            }
        }
    }
}
