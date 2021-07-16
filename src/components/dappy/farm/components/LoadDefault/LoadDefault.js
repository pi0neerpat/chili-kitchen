import React, { useEffect } from 'react'

import { WalletUnlockLoading } from '@pi0neerpat/feather'
import { getSimplePoolData } from '@pi0neerpat/web3utils'

import { POOL_ADDRESS, NETWORK } from '../../../constants'

// Couldn't get this working, since setContext causes a re-render
// Which triggers onSubmit a second time and skips a step
const LoadDefault = ({ onSubmit, user, farmData, ...rest }) => {
  const loadFarmData = async () => {
    const { error, ..._farmData } = await getSimplePoolData({
      poolAddress: POOL_ADDRESS,
      debug: true,
      // TODO: will user ever be available here?
      provider: user?.walletProvider,
      network: NETWORK,
      maticRpcUrl: process.env.MATIC_RPC,
    })
    if (error) return console.log(error)
    onSubmit({ farmData: _farmData })
  }

  useEffect(() => {
    if (farmData) return
    console.log('loading farm data...')
    loadFarmData()
  }, [])
  return <WalletUnlockLoading />
}

export default LoadDefault
