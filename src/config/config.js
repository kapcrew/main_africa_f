const MAINNETWORK = "mainnet";
const TESTNETWORK = "testnet";

export const NETWORK = TESTNETWORK;
export const EVERLIVE = NETWORK == TESTNETWORK ? "net.ever.live" : NETWORK == MAINNETWORK ? "ever.live" : ""
