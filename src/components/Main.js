import React, { Component } from 'react'
import dai from '../dai.png'

export default class Main extends Component {
  render() {
    const { stakingBalance, dappTokenBalance, daiTokenBalance, stakeTokens, unstakeTokens } = this.props

    return (
      <div id='content' className='mt-3'>
        <table className='table table-borderless text-muted text-center'>
          <thead>
            <tr>
              <th scope='col'>Staking Balance</th>
              <th scope='col'>Reward Balance</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{window.web3.utils.fromWei(stakingBalance, 'Ether')} mDai</td>
              <td>{window.web3.utils.fromWei(dappTokenBalance, 'Ether')} Dapp</td>
            </tr>
          </tbody>
        </table>

        <div className="card mb-4">
          <div className="card-body">
            <form className="mb-3" onSubmit={e => {
              e.preventDefault()
              let amount;
              amount = this.input.value.toString()
              amount = window.web3.utils.toWei(amount, "Ether")
              stakeTokens(amount)
            }}>
              <div>
                <label className="float-left"><b>Stake Tokens</b></label>
                <span className="float-right text-muted">
                  Balance: {window.web3.utils.fromWei(daiTokenBalance, 'Ether')}
                </span>
              </div>
              <div className="input-group mb-4">
                <input
                  ref={input => this.input = input}
                  type="text"
                  placeholder="0"
                  required
                  className="form-control form-control-lg"
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <img src={dai} height='32' alt="" />
                    &nbsp;&nbsp;&nbsp; mDai
                  </div>
                </div>
              </div>
              <button type='submit' className="btn btn-primary btn-block btn-lg">STAKE!</button>
            </form>
            <button type="submit" className="btn btn-link btn-block btn-sm" onClick={e => {
              e.preventDefault()
              unstakeTokens()
            }}>
              UNSTAKE...
            </button>
          </div>
        </div>
      </div>
    )
  }
}
