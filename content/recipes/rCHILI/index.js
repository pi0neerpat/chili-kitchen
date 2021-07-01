// NOTE: If it needs translation, you must append "Text" to the key name
// slug is the folder name

module.exports = {
    name: "Gitcoin Grants Matching Pool Fund",
    website: "https://gitcoin.co/grants/",
    iconName: "gitcoin",
    twitterHandle: "gitcoin",
    thresholds: [0, 39, 78, 388, 1000, 3875],
    impactPerDai: 1,
    impactText: "USD Earned",
    dappyDetails: {
        backgroundColor: "#D4E6F9",
        foregroundColor: "#474EE7",
        hat: {
            recipients: ["0xde21f729137c5af1b01d73af1dc21effa2b8a0d6"],
            proportions: [1],
            hatID: 245,
        },
    },
    seo: {
        titleText: "Gitcoin Grants Matching Pool Fund",
        descriptionText:
            "Support open source software projects working to provide public goods",
        // TODO: image
    },
    primaryContent: {
        headerText:
            "Gitcoin Grants fund open source software projects working to provide public goods. Interest generated is used to boost the economic impact of small donors.",
    },
    isPrivate: false,
};
