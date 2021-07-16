import React, { useState } from "react"
import Dappy from "@pi0neerpat/dappy"
import { DappyLayoutMaster, DappyBorderContainer } from "@pi0neerpat/feather"
import { ThemeProvider } from "@pi0neerpat/snowflake"

import "../i18n"
import DappyConfig from "./config"

const DappyFarm = ({ config }) => {
  const dappyConfig = new DappyConfig(config)
  return (
    <ThemeProvider>
      <DappyBorderContainer color={dappyConfig.BACKGROUND_COLOR}>
        <DappyLayoutMaster>
          <Dappy options={dappyConfig.options} debug />
        </DappyLayoutMaster>
      </DappyBorderContainer>
    </ThemeProvider>
  )
}

export default DappyFarm
