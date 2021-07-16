import React, { useState } from "react"
import Dappy from "@pi0neerpat/dappy"
import { DappyLayoutMaster, DappyBorderContainer } from "@pi0neerpat/feather"
import { ThemeProvider } from "@pi0neerpat/snowflake"

import "../i18n"
import DappyConfig from "./config"

const DappyFarm = ({ dappyConfig }) => {
  // Inject details into config (eg. network, addresses, etc)
  const config = new DappyConfig(dappyConfig)
  console.log(dappyConfig)
  console.log(config.options)
  return null
  // return (
  //   <ThemeProvider>
  //     <DappyBorderContainer
  //       color={dappyConfig.BACKGROUND_COLOR}
  //       isDappyActive={isDappyActive}
  //     >
  //       <DappyLayoutMaster>
  //         <Dappy options={config.options} debug />
  //       </DappyLayoutMaster>
  //     </DappyBorderContainer>
  //   </ThemeProvider>
  // )
}

export default DappyFarm
