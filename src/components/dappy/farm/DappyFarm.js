import React, { useState } from "react"
import Dappy from "@pi0neerpat/dappy"
import { DappyLayoutMaster, DappyBorderContainer } from "@pi0neerpat/feather"
import { ThemeProvider } from "@pi0neerpat/snowflake"

import "../i18n"
import options from "./options"

const DappyFarm = ({ dappyConfig }) => {
  const { BACKGROUND_COLOR } = dappyConfig

  options.return(
    <ThemeProvider>
      <DappyBorderContainer
        color={BACKGROUND_COLOR}
        isDappyActive={isDappyActive}
      >
        <DappyLayoutMaster>
          <Dappy options={options} debug />
        </DappyLayoutMaster>
      </DappyBorderContainer>
    </ThemeProvider>
  )
}

export default DappyFarm
