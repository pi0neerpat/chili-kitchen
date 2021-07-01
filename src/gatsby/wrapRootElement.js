import React from "react";
import PropTypes from "prop-types";
// import Loadable from "@loadable/component";

import { ContextProvider } from "@providers/Context";

import DataProvider from "@providers/Data";
// TODO: is loadable necessary?
// const DataProvider = Loadable(() => import("@providers/Data"));

import ErrorBoundary from "./ErrorBoundary";

/* eslint-disable import/prefer-default-export */
export const wrapRootElement = ({ element }) => {
    return (
        <ErrorBoundary>
            <ContextProvider>
                <DataProvider />
                {element}
            </ContextProvider>
        </ErrorBoundary>
    );
};

wrapRootElement.propTypes = {
    element: PropTypes.node.isRequired,
};
