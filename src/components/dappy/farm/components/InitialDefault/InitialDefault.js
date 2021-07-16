/* eslint-disable react/jsx-wrap-multilines */

import React, { useEffect, useState } from 'react'
import { useTranslation, Trans } from 'react-i18next'

import { formatUnits } from '@ethersproject/units'
import { isProduction } from 'src/helpers'

import {
  InfoFarmImpactActive,
  InfoFarmImpactInactive,
} from '@pi0neerpat/unlock'
import { Link } from '@pi0neerpat/snowflake'

import {
  BACKGROUND_COLOR,
  FOREGROUND_COLOR,
  POOL_ADDRESS,
  NETWORK,
} from '../../../constants'

const LEFT_IMAGE = '/left-and-right-image.png'
const RIGHT_IMAGE = '/left-and-right-image.png'

const BASICALLY_ZERO_INTEREST_RATE = 0.00000001

const InitialDefault = ({
  xdaiRpcUrl,
  onSubmit,
  userData,
  farmData,
  user,
  ...rest
}) => {
  const { t } = useTranslation('farm')
  const [isGettingRewards, setIsGettingRewards] = useState(false)

  const interestRateRewardsText = farmData.interestRateRewards?.toFixed(0)
  const availableRewards = Number(formatUnits(farmData.availableRewards, 18))
  const lockedAmount = Number(formatUnits(farmData.lockedAmount, 18))

  const interestRate =
    farmData.interestRateRewards === 0
      ? BASICALLY_ZERO_INTEREST_RATE
      : farmData.interestRateRewards

  const onDepositClick = () => {
    onSubmit()
  }

  const onWithdrawClick = () => {
    onSubmit({
      isWithdrawing: true,
      withdrawalValue: userData?.lockedAmount,
    })
  }

  const onClaimClick = () => {
    onSubmit({
      isClaiming: true,
      withdrawalValue: userData?.impactAmountCurrent,
    })
  }

  if (userData?.lockedAmount > 0 || userData?.impactAmountCurrent > 0)
    return (
      <InfoFarmImpactActive
        impactText={
          <Trans i18nKey="farm:yourEarningsFrom">
            rCHILI earned from your staked{' '}
            {{ lockedAmount: userData?.lockedAmount?.toLocaleString() }} CHILI
          </Trans>
        }
        subtitle={
          <Trans i18nKey="farm:annualReturnRate">
            {{ interestRateRewardsText }}% APR (rCHILI)
          </Trans>
        }
        impactAmount={userData.impactAmountCurrent}
        lockedAmount={userData.lockedAmount}
        interestRate={interestRate}
        onWithdrawClick={onWithdrawClick}
        onDepositClick={onDepositClick}
        onClaimClick={onClaimClick}
        backgroundColor={BACKGROUND_COLOR}
        foregroundColor={FOREGROUND_COLOR}
        imageLeftSrc={{ src: LEFT_IMAGE }}
        imageRightSrc={{ src: RIGHT_IMAGE }}
        imageLeftAlt={t('A cute litte flame ball dude')}
        imageRightAlt={t('A cute litte flame ball dude')}
        {...rest}
      />
    )
  return (
    <InfoFarmImpactInactive
      impactText={<Trans i18nKey="farm:totalEarningsFrom">CHILI locked</Trans>}
      subtitle={
        <Trans i18nKey="farm:yearlyReturnRate">
          {{ interestRateRewardsText }}% Current APR (rCHILI)
        </Trans>
      }
      impactAmount={lockedAmount}
      interestRate={BASICALLY_ZERO_INTEREST_RATE}
      onSubmit={onDepositClick}
      backgroundColor={BACKGROUND_COLOR}
      foregroundColor={FOREGROUND_COLOR}
      imageLeftSrc={{ src: LEFT_IMAGE }}
      imageRightSrc={{ src: RIGHT_IMAGE }}
      imageLeftAlt={t('A cute litte flame ball dude')}
      imageRightAlt={t('A cute litte flame ball dude')}
      footerText={t('Cancel anytime')}
      buttonText={t('Start farming')}
      {...rest}
    />
  )
}

export default InitialDefault
