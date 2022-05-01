import axios from "axios";
import {
  Address,
  ProviderRpcClient,
  TvmException,
} from "everscale-inpage-provider";
import freeton from "freeton";
import apiRequest from "../api/apiRequest";

import {
  default as getProvider,
  PROVIDERS,
  UTILS,
} from "https://everscale-connect.svoi.dev/everscale/getProvider.mjs";
const ever = new ProviderRpcClient();
const wallet_address = localStorage.getItem("wallet_address") || 0;
export async function sendMoney() {
  window.getProvider = getProvider;
  window.PROVIDERS = PROVIDERS;
  window.UTILS = UTILS;

  let EVER = null;
  try {
    //Initialize provider
    EVER = await getProvider({}, PROVIDERS.EVERWallet);
    await EVER.requestPermissions();
    await EVER.start();

    window.TON = EVER;

    let address =
      "0:129dc05b739d8ab9161ac710b92e1e3dcfb32e284a509ed8180e978554b1e16b";

    let amount = 5000000000;
    // UTILS.numberToUnsignedNumber(prompt('Enter transfer amount in EVER'))

    try {
      await EVER.walletTransfer(address, amount);

      alert("Transaction created!");
      return true;
    } catch (e) {
      window.location.reload();
      alert("Error " + JSON.stringify(e));
      return false;
    }
  } catch (e) {
    alert("This page requires extension");
    window.location.reload();
  }

  // try {
  //   if (!(await ever.hasProvider())) {
  //     throw new Error('Extension is not installed');
  //   }
  //   await ever.ensureInitialized();

  //   const { accountInteraction } = await ever.requestPermissions({
  //     permissions: ['basic', 'accountInteraction'],
  //   });
  //   if (accountInteraction == null) {
  //     throw new Error('Insufficient permissions');
  //   }
  //   const { transaction } = await ever.sendMessage({
  //     sender: wallet_address,
  //     recipient:
  //       "0:129dc05b739d8ab9161ac710b92e1e3dcfb32e284a509ed8180e978554b1e16b",
  //     amount: "5000000000",
  //     bounce: false,
  //   });

  //   if (
  //     transaction.aborted === false &&
  //     transaction.endStatus === "active" &&
  //     transaction.exitCode === 0
  //   ) {
  //     ever.disconnect();
  //     return true;
  //   } else {
  //     ever.disconnect();
  //     return false;
  //   }
  // } catch (error) {
  //   console.error(error);
  // }
}
/* Login in EVERCRYSTAL*/
const getUserDataFromExtension = async () => {
  try {
    // let tonConnection = await ton.rawApi.getProviderState();
    if (!(await ever.hasProvider())) {
      throw new Error("Extension is not installed");
    }
    await ever.ensureInitialized();

    const { accountInteraction } = await ever.requestPermissions({
      permissions: ["basic", "accountInteraction"],
    });
    if (accountInteraction == null) {
      throw new Error("Insufficient permissions");
    }

    ever.disconnect();
    return accountInteraction;
    // let response = await api.get(
    //   `${SERVER_DOMAIN}/transaction-confirmation/endpoint`
    // );
    // if (!(tonConnection.selectedConnection == response.data.endpoint)) {
    //   setNetworkChanged(true);
    //   ton.disconnect();
    // } else {
    //   const { accountInteraction: userDataFromBrowser } =
    //     await ton.requestPermissions({
    //       permissions: ["tonClient", "accountInteraction"],
    //     });
    //   if (userDataFromBrowser == null) {
    //     throw new Error("Insufficient permissions");
    //   }

    //   ton.disconnect();
    //   return userDataFromBrowser;
    // }
  } catch (error) {
    console.error(error);
  }
};

export async function login() {
  try {
    const userDataFromExtension = await getUserDataFromExtension();
    console.log(userDataFromExtension);
    const serverResponse = await apiRequest.post("/auth/login", {
      walletId: userDataFromExtension.address.toString().substring(2),
    });
    console.log(serverResponse);
    // localStorage.setItem("walletType", "ever-wallet");
    // const serverResponse = await AuthService.login(address, publicKey);

    localStorage.setItem("accessToken", serverResponse.data.accessToken);
    localStorage.setItem("refreshToken", serverResponse.data.refreshToken);
    localStorage.setItem(
      "userAddress",
      "0:" + serverResponse.data.user.walletId
    );
    window.location.reload();
  } catch (error) {
    console.log(error);
  }
  // const { accountInteraction } = await ever.requestPermissions({
  //   permissions: ['basic', 'accountInteraction'],
  // });
  // if (accountInteraction == null) {
  //   throw new Error('Insufficient permissions');
  // }
  // localStorage.setItem('wallet_address', accountInteraction.address);
  // window.location.reload();
}
// window.login = login;

/* Logout in EVERCRYSTAL*/

export async function login_out() {
  // await AuthService.logout()
  const serverResponse = await apiRequest.post(
    "http://45.137.64.34:4002/auth/logout",
    { refreshToken: localStorage.getItem("refreshToken") }
  );
  console.log(serverResponse);
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("userAddress");
  // window.location.reload();
}
// window.login_out = login_out;

export async function login_extraton() {
  const provider = await new freeton.providers.ExtensionProvider(
    window.freeton
  );
  const signer = await provider.getSigner();
  console.log(signer);
  const network = await signer.network.server;
  console.log(network);
  const address = await signer.wallet.address;
  console.log(address);

  localStorage.setItem("wallet_address", address);

  //const signer = await provider.getSigner();
}
window.login_extraton = login_extraton;

export async function send() {
  const send = await ever.sendMessage({
    sender: wallet_address,
    recipient:
      "0:b4c133e34531703dbbbed93c5e201a3b1b25891e71ae83e64eaa38230d572c94",
    amount: "1000000000",
    bounce: false,
  });
}
window.send = send;

export async function get_nft() {
  fetch("https://net.ton.dev/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
      {
        accounts (filter :
          {
            code_hash :{eq : "00cd3a33ccf746921c61a5f166378d8ddad06a6b72c9874fea572031a7574181"}
          })
          {
            id
          }}
          `,
    }),
  });
}
window.get_nft = get_nft;
