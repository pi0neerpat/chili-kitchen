import {
  WalletUnlockPrompt,
  WalletUnlockLoading,
  WalletUnlockBalance,
  WalletUnlockError,
  WalletUnlockNetwork,
  WalletUnlockInstall,
  Web3TxCheckoutRejected,
  Web3PendingFailed,
  DappyNavigation,
} from "@pi0neerpat/feather"

import {
  LoadDefault,
  InitialDefault,
  PendingDefault,
  CheckoutDefault,
} from "./components"

import { loadUserData, customCheckoutFunction } from "./functions"

import { walletList, onWalletChoose, onWalletUnlock } from "../helpers"

export default class DappyConfig {
  constructor(options = {}) {
    this.ID = options.ID
    this.NETWORK = options.NETWORK
    this.BACKGROUND_COLOR = options.BACKGROUND_COLOR
    this.FOREGROUND_COLOR = options.FOREGROUND_COLOR
    this.POOL_ADDRESS = options.POOL_ADDRESS
    this.STAKING_TOKEN_ADDRESS = options.STAKING_TOKEN_ADDRESS
  }

  unlock = {
    category: `wallet`,
    type: `unlock`,
    network: this.NETWORK, // defaults to homestead
    skippable: true, // Automatically load wallet. defaults to false
    allowConcurrentTransactions: false, // defaults to false
    onWalletChoose, // (walletType)
    onWalletUnlock, // (walletAddress, network)
    navigationComponent: DappyNavigation,
    substeps: {
      default: {
        component: WalletUnlockPrompt, // WalletUnlockPrompt
        props: { walletList },
      },
      load: {
        balanceList: [this.STAKING_TOKEN_ADDRESS],
        allowanceList: [this.STAKING_TOKEN_ADDRESS],
        spenderAddress: this.POOL_ADDRESS,
        component: WalletUnlockLoading,
        customAsyncFunction: loadUserData, // Returned values are saved to context
      },
      error: { component: WalletUnlockError },
      network: {
        component: WalletUnlockNetwork,
        props: { networkName: this.NETWORK },
      },
      install: { component: WalletUnlockInstall },
    },
  }

  options = {
    id: this.ID,
    stepOrder: [
      `load`,
      `silentUnlock`,
      `initial`,
      `unlock`,
      `checkout`,
      `pending`,
    ],
    navigationComponentName: `DappyNavigation`,
    stepDetails: {
      load: {
        category: `info`,
        substeps: { default: { component: LoadDefault } },
      },
      silentUnlock: {
        ...this.unlock,
        hideNav: true,
        hide: true,
        // skippable: true, // Not sure why this is needed. W/o it skips the next step
      },
      initial: {
        category: `info`,
        substeps: { default: { component: InitialDefault } },
      },
      unlock: this.unlock,
      checkout: {
        category: `web3`,
        type: `tx`,
        onSubmitCustomFunction: customCheckoutFunction,
        // You must include the "approve" entity if you wish to do an approval
        approve: {
          // Alternatively, values are overridden using onApprove()
          // anything else passed to onApprove will be saved to context
          // amount: 100 // Defaults to unlimited
          waitForConfirmation: true,
          token: this.STAKING_TOKEN_ADDRESS,
          spender: this.POOL_ADDRESS,
        },
        substeps: {
          default: {
            component: CheckoutDefault,
            props: {
              foregroundColor: this.FOREGROUND_COLOR,
              impactText: this.IMPACT_TEXT,
            },
          },
          rejected: { component: Web3TxCheckoutRejected },
        },
      },
      pending: {
        category: `web3`,
        type: `pending`,
        // If true, will stay on default substep.
        pauseOnSuccess: true, // Defaults to false
        // onSuccess, (receipt) untested!
        substeps: {
          default: { component: PendingDefault },
          // Here we don't need to provide a substep for success
          // Since we are using pauseOnSuccess
          // success: { component: Web3PendingSuccess },
          failed: { component: Web3PendingFailed },
        },
      },
    },
  }
}
