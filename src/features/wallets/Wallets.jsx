import React from 'react'
import { useState, useEffect } from 'react'

export default function Wallets(){

    const [wallet, setWallet] = useState({})

    const getWallet = async() => {
      const response = await fetch("https://api.dex.guru/v3/wallets/0xa0942d8352ffabcc0f6dee32b2b081c703e726a5/totals?is_verified=true")
      const data = await response.json()
      setWallet(data)
    }

    useEffect(() => {
      Object.keys(wallet).length == 0 && getWallet()
    },[wallet])

    const Balance = ({balance}) => {
        return (
            <div class="box">
                <div class="asset module walletParamBox">
                    <img src={balance.logoURI} style={{width:"20px", height:"20px"}}/>
                    <div>{balance.symbols} {balance.network}

                    <div>{
                      //balance.addresses[0]
                    }</div>
                    </div>
                </div>
                <div class="currentBalance module walletParamBox">
                    <div>{balance.balance}</div>
                    <div>{balance.balanceUSD} $</div>
                </div>
                <div class="change7d module walletParamBox">
                    <div>{balance.change7Days}</div>
                </div>
                <div class="avgAcqPrice module walletParamBox">
                    <div>{balance.dealsAVGPrice}</div>
                </div>
                <div class="currentPrice module walletParamBox">
                  <div>{balance.marketPrice}</div>
                </div>
                <div class="inOutMoney module walletParamBox">
                    <div class="profit">{balance.profit}</div>
                    <div class="inAmountWeekSum">in: {balance.inAmountWeekSum}</div>
                    <div class="outAmountWeekSum">out: {balance.outAmountWeekSum}</div>
                </div>
            </div>
        )
    }

    return (
        <div class="module">
            <h3>
                WALLETS
            </h3>
            <div class="box">
            {
              ["asset","current balance","change, 7d","avg.ack.price","current price","profit in/out"].map(head =>
                  <th class="walletParamBox">{head}</th>
                )
            }
            </div>
            {
              // <div>{JSON.stringify(wallet)}</div>
            }
            {
              wallet && wallet.balances?.map(
                balance => <Balance balance={balance}/>
              )
            }
        </div>
    )
}
