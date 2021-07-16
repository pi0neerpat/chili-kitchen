import { _bnToWholeNumber, getEthPrice } from '@pi0neerpat/web3utils'
import { formatUnits } from '@ethersproject/units'

export const onWalletChoose = () => {
  // Triggered whenever the wallet is choosen, before unlocking
  // eg. Display a loading state elsewhere in the app
}

export const onWalletUnlock = ({ walletAddress }) => {
  // Triggered whenever the wallet is unlocked
  // eg. Save user's address and re-set the loading state
}

export const walletList = [
  {
    name: `Metamask`,
    iconName: `metamask`,
    iconColor: `#F58C25`,
    id: `metamask`,
  },
  {
    name: `Coinbase Wallet`,
    iconName: `coinbase-wallet`,
    iconColor: `#2F5CE2`,
    id: `walletLink`,
  },
  {
    name: `Mobile Wallet`,
    iconName: `mobile-wallet`,
    iconColor: `#3B99FC`,
    id: `walletConnect`,
    subText: `Trust, Argent, Rainbow, Others`,
  },
]

export const fetchGasData = async ({ debug, user }) => {
  return {
    approvalDepositFee: 0.0001,
    depositFee: 0.0001,
    withdrawalFee: 0.0001,
    ethPrice: 2300,
    estimatedDuration: 1,
  }
}
