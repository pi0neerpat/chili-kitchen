import React from "react";
import PropTypes from "prop-types";
import Loadable from "@loadable/component";

import { ContextProvider } from "@providers/Context";
const DataProvider = Loadable(() => import("@providers/Data"));

import ErrorBoundary from "./ErrorBoundary";

// Get user details using useEffect query

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
