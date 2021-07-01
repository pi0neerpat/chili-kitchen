import { useEffect, useContext } from "react";
import { useQuery } from "@apollo/client";
import { USER_LOCAL } from "@graphql";

import { Context } from "@providers/Context";
import { InfuraProvider } from "@ethersproject/providers";

import { loadAndSubscribeBalances } from "@utils/web3";
import { useCampaignsData } from "@utils/hooks";
import RTokenUtils, { getClient } from "@rtoken/utils";
import {
    getCompoundRate,
    getWalletlessProvider,
    getEthPrice,
    getGasPrice,
} from "@dappy/web3utils";
import { isProduction } from "@utils/helpers";
import { NETWORK } from "gatsby-env-variables";

const rutils = new RTokenUtils(
    getClient({ network: NETWORK }),
    new InfuraProvider(NETWORK, process.env.GATSBY_INFURA_KEY),
    {
        network: NETWORK,
    }
);

const DataProvider = () => {
    const { campaigns } = useCampaignsData();
    const {
        allCampaigns,
        setAllCampaigns,
        setCampaignsDataLoaded,
        campaignsDataLoaded,
        setUserCampaigns,
        setUserDataLoaded,
        userDataLoaded,
        setEthData,
        ethDataLoaded,
        setEthDataLoaded,
        rate,
        setRate,
    } = useContext(Context);
    const { data: { userAddress } = {} } = useQuery(USER_LOCAL);

    const handleError = (error) => {
        /* eslint-disable-next-line no-console */
        if (!isProduction) console.log(error);
    };

    const getEthData = async () => {
        if (ethDataLoaded) return;
        const { walletlessProvider } = await getWalletlessProvider({
            network: NETWORK,
            infuraKey: process.env.GATSBY_INFURA_ENDPOINT_KEY,
        });

        const ethPrice = await getEthPrice({ provider: walletlessProvider });
        const gasPrice = await getGasPrice();
        const pricePerWei = (gasPrice * ethPrice) / 10;

        setEthData({
            gasPrice,
            ethPrice,
            pricePerWei,
        });
        setEthDataLoaded(true);
    };

    const getRate = async () => {
        if (rate !== 0) return null;
        const { formattedRate, error } = await getCompoundRate();
        if (error) handleError(error);
        return setRate(formattedRate || 0);
    };
    const loadUserData = async () => {
        if (userDataLoaded) return;
        const rutilsUser = rutils.user(userAddress);
        const interestSentList = await rutilsUser.interestSentList();
        // interest sent list pulled from user details never returns undefined recipient address
        if (interestSentList.length === 0) {
            setUserDataLoaded(true);
            return;
        }
        const { loansOwned } = await rutilsUser.details();
        const filteredInterestSentList = loansOwned.filter((recipient) => {
            return parseFloat(recipient.amount) >= 1;
        });

        const userCampaignsList = filteredInterestSentList
            .map((interestSent) => {
                const { recipient, amount } = interestSent;
                let campaign = Object.entries(allCampaigns).find(
                    ([, details]) =>
                        details.details.content.dappyDetails.hat.recipients[0].toLowerCase() ===
                        recipient.id
                );
                if (!campaign) return null;
                campaign = { ...campaign[1] };

                const userLoan = campaign.interestReceived.find((loan) => {
                    return loan.sender === userAddress.toLowerCase();
                });
                return {
                    lockedAmount: Number(Number(amount).toFixed(0)),
                    impactAmount:
                        campaign.details.content.impactPerDai *
                        userLoan.interestSent,
                    details: campaign.details,
                };
            })
            .filter((campaign) => campaign !== null);

        setUserCampaigns(userCampaignsList);
        setUserDataLoaded(true);
    };

    const loadCampaignData = async () => {
        if (campaignsDataLoaded) return;
        const allResults = await Promise.all(
            campaigns.edges.map(async (campaign) => {
                const campaignAddress =
                    campaign.node.fields.content.dappyDetails.hat.recipients[0];
                const details = campaign.node.fields;
                const user = rutils.user(campaignAddress.toLowerCase());

                const interestEarned = await user.interestReceivedSum();
                const interestReceived = await user.interestReceivedList();

                const lockedAmount = interestReceived.reduce(
                    (prev, current) => {
                        return prev + Number(current.amount);
                    },
                    0
                );

                return {
                    [campaign.node.fields.slug]: {
                        interestReceived,
                        interestEarned,
                        lockedAmount: Number(lockedAmount.toFixed(0)),
                        details,
                    },
                };
            })
        );
        const campaignsDataList = allResults.reduce(
            (prev, curr) => ({ ...prev, ...curr }),
            {}
        );

        setAllCampaigns({ ...allCampaigns, ...campaignsDataList });
        setCampaignsDataLoaded(true);
    };

    useEffect(() => {
        getRate();
        loadCampaignData();
        getEthData();
        if (campaignsDataLoaded && !!userAddress) loadUserData();
    }, [userAddress, campaignsDataLoaded]);

    useEffect(() => {
        loadAndSubscribeBalances();
    }, [userAddress]);

    return null;
};

export default DataProvider;
