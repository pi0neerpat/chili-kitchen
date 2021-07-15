import React from "react"
import PropTypes from "prop-types"
// import Loadable from "@loadable/component";

import { ContextProvider } from "@providers/Context"

import DataProvider from "@providers/Data"
// TODO: is loadable necessary?
// const DataProvider = Loadable(() => import("@providers/Data"));

import ErrorBoundary from "./ErrorBoundary"

export const wrapRootElement = ({ element }) => (
    <ErrorBoundary>
        <ContextProvider>
            <DataProvider />
            {element}
        </ContextProvider>
    </ErrorBoundary>
)

wrapRootElement.propTypes = {
    element: PropTypes.node.isRequired,
}
