/* eslint-disable no-console */
/* eslint-disable i18next/no-literal-string */
import { formatUnits } from "@ethersproject/units"
import { getPoolUser } from "@pi0neerpat/web3utils"

import { POOL_ADDRESS, STAKING_TOKEN_ADDRESS, NETWORK } from "../constants"
import { fetchGasData } from "../helpers"

// Define your own logic to execute in Step "unlock" Substep "load"
export const loadUserData = async ({ user, debug, balances, userData }) => {
  if (userData) return // Skip if we've already loaded user data
  try {
    const {
      ethPrice,
      estimatedDuration,
      withdrawalFee,
      approvalDepositFee,
      depositFee,
    } = await fetchGasData({
      user,
      debug,
    })

    const {
      lockedAmount: lockedAmountBn,
      impactAmountCurrent: impactAmountCurrentBn,
      impactAmountTotal: impactAmountTotalBn,
      error,
    } = await getPoolUser({
      provider: user.walletProvider,
      userAddress: user.walletAddress,
      poolAddress: POOL_ADDRESS,
      debug: true,
      network: NETWORK,
      infuraKey: process.env.INFURA_ENDPOINT_KEY,
    })
    if (error) throw error
    // Return object to save to context
    return {
      ethPrice,
      approvalDepositFee,
      depositFee,
      withdrawalFee,
      estimatedDuration,
      userData: {
        lockedAmount: Number(formatUnits(lockedAmountBn, `ether`)),
        impactAmountCurrent: Number(
          formatUnits(impactAmountCurrentBn, `ether`)
        ),
        impactAmountTotal: Number(formatUnits(impactAmountTotalBn, `ether`)),
        tokenBalance: formatUnits(balances[STAKING_TOKEN_ADDRESS], `ether`),
      },
    }
  } catch (e) {
    console.log(e)
  }
}

// Define your own logic to execute in Step "checkout" after "onSubmit"
export const customCheckoutFunction = async ({
  user,
  debug,
  depositValue,
  withdrawalValue,
  isWithdrawing,
  withdrawAvailable,
  isClaiming,
}) => {
  let tx
  let error
  if (isWithdrawing) {
    ;({ tx, error } = await user.poolUnstake({
      amount: withdrawalValue,
      poolAddress: POOL_ADDRESS,
      debug,
    }))
  } else if (isClaiming) {
    ;({ tx, error } = await user.poolWithdraw({
      poolAddress: POOL_ADDRESS,
      debug,
    }))
  } else {
    ;({ tx, error } = await user.poolStake({
      amount: depositValue,
      poolAddress: POOL_ADDRESS,
      debug,
    }))
  }
  return {
    tx,
    error,
  }
}
