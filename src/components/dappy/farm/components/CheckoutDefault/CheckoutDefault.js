import React from 'react'
// import { Trans } from 'react-i18next'

import {
  Web3TxCheckoutFarmWithdraw,
  Web3TxCheckoutFarmDeposit,
  // P,
} from '@pi0neerpat/daosquare'

// const TempDisabled = () => (
//   <P>
//     <Trans i18nKey="vault:temporaryDisabled">
//       Temporarily disabled. See why{' '}
//       <a href="https://twitter.com/SpendlessApp/status/1357455962391650306">
//         here
//       </a>
//     </Trans>
//   </P>
// );

const CheckoutDefault = ({ isWithdrawing, isClaiming, ...rest }) => {
  if (isClaiming)
    return (
      <Web3TxCheckoutFarmWithdraw
        titleText={'Claim Rewards'}
        buttonText="Claim rCHILI"
        {...rest}
      />
    )
  if (isWithdrawing)
    return (
      <Web3TxCheckoutFarmWithdraw
        titleText={'Withdraw'}
        buttonText="Withdraw CHILI"
        {...rest}
      />
    )
  return <Web3TxCheckoutFarmDeposit {...rest} tokenName="CHILI" />
}

export default CheckoutDefault
