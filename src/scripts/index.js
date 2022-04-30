import axios from "axios";
import {
  Address,
  ProviderRpcClient,
  TvmException,
} from "everscale-inpage-provider";
import freeton from "freeton";
import apiRequest from "../api/apiRequest";
const ever = new ProviderRpcClient();
const wallet_address = localStorage.getItem("wallet_address") || 0;

/* Login in EVERCRYSTAL*/
const getUserDataFromExtension = async () => {
  const ton = new ProviderRpcClient();
  try {
    let tonConnection = await ton.rawApi.getProviderState();
    if (!(await ton.hasProvider())) {
      throw new Error("Extension is not installed");
    }

    await ton.ensureInitialized();
    const { accountInteraction: userDataFromBrowser } =
      await ton.requestPermissions({
        permissions: ["tonClient", "accountInteraction"],
      });
    if (userDataFromBrowser == null) {
      throw new Error("Insufficient permissions");
    }

    ton.disconnect();
    return userDataFromBrowser;
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

export async function sendMoney() {
  const ton = new ProviderRpcClient();
  try {
    if (!(await ton.hasProvider())) {
      throw new Error("Extension is not installed");
    }
    const { accountInteraction: userDataFromBrowser } =
      await ton.requestPermissions({
        permissions: ["tonClient", "accountInteraction"],
      });
    if (userDataFromBrowser == null) {
      throw new Error("Insufficient permissions");
    }
    const { transaction } = await ever.sendMessage({
      sender: wallet_address,
      recipient:
        "0:b4c133e34531703dbbbed93c5e201a3b1b25891e71ae83e64eaa38230d572c94",
      amount: "1000000000",
      bounce: false,
    });

    if (
      transaction.aborted === false &&
      transaction.endStatus === "active" &&
      transaction.exitCode === 0
    ) {
      ton.disconnect();
      return true
    } else {
      ton.disconnect();
      return false
    }
   
  } catch (error) {
    console.error(error);
  }
}
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
