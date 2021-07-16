import React from 'react'

import { Web3PendingFull } from '@pi0neerpat/unlock'
import { FOREGROUND_COLOR } from '../../../constants'

const FARMING_IMAGE = '/farming.png'
const ICON_IMAGE = '/official-logo.png'

const PendingDefault = ({
  onSubmit,
  estimatedDuration,
  depositValue,
  withdrawalValue,
  isFinished,
  isWithdrawing,
  isClaiming,
  ...rest
}) => {
  return (
    <Web3PendingFull
      isWithdrawing={isWithdrawing}
      isClaiming={isClaiming}
      estimatedDuration={estimatedDuration}
      isFinished={isFinished}
      amount={isWithdrawing || isClaiming ? withdrawalValue : depositValue}
      awakenPosterSrc={ICON_IMAGE}
      color={FOREGROUND_COLOR}
      sleepingPosterSrc={FARMING_IMAGE}
      onSubmit={() => window.location.reload()}
      {...rest}
    />
  )
}

export default PendingDefault
