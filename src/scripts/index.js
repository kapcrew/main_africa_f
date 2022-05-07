import axios from "axios";
import {
  Address,
  ProviderRpcClient,
  TvmException,
} from "everscale-inpage-provider";
import apiRequest from "../api/apiRequest";
// import pkgData from "../../ton-packages/Data.package.ts";
import toast from "react-hot-toast";
const ever = new ProviderRpcClient();
// window.getProvider = getProvider;
// window.PROVIDERS = PROVIDERS;
// window.UTILS = UTILS;
// let EVER = null;
// async function send_everscalewallet(){
//   const EVER = await getProvider({}, PROVIDERS.EVERWallet);
//   await EVER.start();

//   const token = await (new TIP31Root(EVER)).init('0:b95d8f510a029401dda2b1d3b9ec1b656238fa19e96d0b4dbcc41ee82821b6ab');
//   console.log(token);
//   const CURRENT_USER_WALLET_ADDRESS = (await EVER.getWallet()).address;
//   console.log(CURRENT_USER_WALLET_ADDRESS);
//   const wallet = await token.getWalletByMultisig(CURRENT_USER_WALLET_ADDRESS);
//   console.log(wallet);
//   //var formData = new FormData(document.querySelector('2ndform'))
//   const address = "0:8b8e726e75e532c004cda463ed7c40d726c0f67bb57e229c7e0d32c209ee5a2f"
//   //console.log(address);
//   const AMOUNT = 1000000000;
//   const MESSAGE = "te6ccgEBAgEALQABCAAAAAABAEh0ejFpNzZHWURIeVpVcUxrZ2c0Skp5VWUxNE1aMVg4c0NtNkw=";
//   const DESTINATION_WALLET = await token.getWalletAddressByMultisig(address);
//   console.log(DESTINATION_WALLET);
//   const transferPayload = await wallet.transferPayload(DESTINATION_WALLET, AMOUNT, MESSAGE);
//   console.log(transferPayload)
//   const transfer = await EVER.walletTransfer(wallet.address, 100000000, transferPayload, true)

//   //send_with_tezos();

// }

const DePoolAbi = {
  "ABI version": 2,
  version: "2.2",
  header: ["time"],
  functions: [
    {
      name: "constructor",
      inputs: [
        { name: "name", type: "string" },
        { name: "descriprion", type: "string" },
        { name: "addrOwner", type: "address" },
        { name: "addrAuthor", type: "address" },
        { name: "contentHash", type: "uint256" },
        { name: "mimeType", type: "string" },
        { name: "chunks", type: "uint8" },
        { name: "chunkSize", type: "uint128" },
        { name: "size", type: "uint128" },
        {
          components: [
            { name: "height", type: "uint128" },
            { name: "width", type: "uint128" },
            { name: "duration", type: "uint128" },
            { name: "extra", type: "string" },
            { name: "json", type: "string" },
          ],
          name: "meta",
          type: "tuple",
        },
        { name: "codeIndex", type: "cell" },
        { name: "codeDataChunk", type: "cell" },
      ],
      outputs: [],
    },
    {
      name: "setRoyalty",
      inputs: [
        { name: "royalty", type: "uint128" },
        { name: "royaltyMin", type: "uint128" },
      ],
      outputs: [],
    },
    {
      name: "putOnSale",
      inputs: [{ name: "price", type: "uint128" }],
      outputs: [],
    },
    {
      name: "putOnAuction",
      inputs: [
        { name: "initPrice", type: "uint128" },
        { name: "time", type: "uint256" },
      ],
      outputs: [],
    },
    {
      name: "endAuction",
      inputs: [],
      outputs: [],
    },
    {
      name: "auction",
      inputs: [{ name: "price", type: "uint128" }],
      outputs: [],
    },
    {
      name: "stopAuction",
      inputs: [],
      outputs: [],
    },
    {
      name: "removeFromSale",
      inputs: [],
      outputs: [],
    },
    {
      name: "buy",
      inputs: [],
      outputs: [],
    },
    {
      name: "transfer",
      inputs: [{ name: "addrTo", type: "address" }],
      outputs: [],
    },
    {
      name: "deployDataChunk",
      inputs: [
        { name: "chunk", type: "bytes" },
        { name: "chunkNumber", type: "uint128" },
      ],
      outputs: [],
    },
    {
      name: "getInfo",
      inputs: [],
      outputs: [
        { name: "version", type: "string" },
        { name: "name", type: "string" },
        { name: "descriprion", type: "string" },
        { name: "addrOwner", type: "address" },
        { name: "addrAuthor", type: "address" },
        { name: "createdAt", type: "uint128" },
        { name: "addrRoot", type: "address" },
        { name: "contentHash", type: "uint256" },
        { name: "mimeType", type: "string" },
        { name: "chunks", type: "uint8" },
        { name: "chunkSize", type: "uint128" },
        { name: "size", type: "uint128" },
        {
          components: [
            { name: "height", type: "uint128" },
            { name: "width", type: "uint128" },
            { name: "duration", type: "uint128" },
            { name: "extra", type: "string" },
            { name: "json", type: "string" },
          ],
          name: "meta",
          type: "tuple",
        },
        { name: "royalty", type: "uint128" },
        { name: "royaltyMin", type: "uint128" },
        { name: "onSale", type: "bool" },
        { name: "price", type: "uint128" },
        { name: "auctionLider", type: "address" },
        { name: "onAuction", type: "bool" },
        { name: "auctionPrice", type: "uint128" },
        { name: "endAuctionTimestamp", type: "uint256" },
      ],
    },
    {
      name: "resolveDataChunk",
      inputs: [
        { name: "addrData", type: "address" },
        { name: "chunkNumber", type: "uint128" },
      ],
      outputs: [{ name: "addrDataChunk", type: "address" }],
    },
    {
      name: "resolveCodeHashIndex",
      inputs: [
        { name: "addrRoot", type: "address" },
        { name: "addrOwner", type: "address" },
      ],
      outputs: [{ name: "codeHashIndex", type: "uint256" }],
    },
    {
      name: "resolveIndex",
      inputs: [
        { name: "addrRoot", type: "address" },
        { name: "addrData", type: "address" },
        { name: "addrOwner", type: "address" },
      ],
      outputs: [{ name: "addrIndex", type: "address" }],
    },
    {
      name: "_id",
      inputs: [],
      outputs: [{ name: "_id", type: "uint256" }],
    },
    {
      name: "_deployed",
      inputs: [],
      outputs: [{ name: "_deployed", type: "bool" }],
    },
  ],
  data: [{ key: 1, name: "_id", type: "uint256" }],
  events: [],
  fields: [
    { name: "_pubkey", type: "uint256" },
    { name: "_timestamp", type: "uint64" },
    { name: "_constructorFlag", type: "bool" },
    { name: "_codeIndex", type: "cell" },
    { name: "_codeDataChunk", type: "cell" },
    { name: "_version", type: "string" },
    { name: "_name", type: "string" },
    { name: "_descriprion", type: "string" },
    { name: "_addrOwner", type: "address" },
    { name: "_addrAuthor", type: "address" },
    { name: "_createdAt", type: "uint128" },
    { name: "_addrRoot", type: "address" },
    { name: "_contentHash", type: "uint256" },
    { name: "_mimeType", type: "string" },
    { name: "_chunks", type: "uint8" },
    { name: "_chunkSize", type: "uint128" },
    { name: "_size", type: "uint128" },
    {
      components: [
        { name: "height", type: "uint128" },
        { name: "width", type: "uint128" },
        { name: "duration", type: "uint128" },
        { name: "extra", type: "string" },
        { name: "json", type: "string" },
      ],
      name: "_meta",
      type: "tuple",
    },
    { name: "_id", type: "uint256" },
    { name: "_deployed", type: "bool" },
    { name: "_royalty", type: "uint128" },
    { name: "_royaltyMin", type: "uint128" },
    { name: "_onSale", type: "bool" },
    { name: "_price", type: "uint128" },
    { name: "_auctionLider", type: "address" },
    { name: "_onAuction", type: "bool" },
    { name: "_auctionPrice", type: "uint128" },
    { name: "_endAuctionTimestamp", type: "uint128" },
  ],
};
export async function ParticipateInAuction(addressToken,bidAuction) {
  toast.loading("Payment is expected...");
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

  const selectedAddress = accountInteraction.address;
  console.log(addressToken);
  const dePoolAddress = new Address(addressToken);

  const dePool = new ever.Contract(DePoolAbi, dePoolAddress);
  try {
    const transaction = await dePool.methods
      .auction({
        price: String(bidAuction), //price - проверка что цена больше чем auctionPrice
      })
      .send({
        from: selectedAddress,
        amount: String((Number(bidAuction)+1)*1000000000), //(price + 1)*1000000000
        bounce: true,
      });
    console.log(transaction);
    toast.dismiss();
    toast.success("Payment has reached!");
    return true;
  } catch {
    toast.dismiss();
    toast.error("Something went wrong!");
    return false;
  }
}
export async function StopAuctionOwner(addressToken) {
  toast.loading("Payment is expected...");
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

  const selectedAddress = accountInteraction.address;
  console.log(addressToken);
  const dePoolAddress = new Address(addressToken);

  const dePool = new ever.Contract(DePoolAbi, dePoolAddress);

  try {
    const transaction = await dePool.methods.stopAuction({}).send({
      from: selectedAddress,
      amount: "1000000000",
      bounce: true,
    });
    console.log(transaction);
    toast.dismiss();
    toast.success("Payment has reached!");
    return true;
  } catch {
    toast.dismiss();
    toast.error("Something went wrong!");
    return false;
  }
}

// export async function StopAuctionOwner(addressToken) {

//   фывфы
// }

export async function PutOnSale(addressToken, price) {
  toast.loading("Payment is expected...");
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

  const selectedAddress = accountInteraction.address;
  console.log(addressToken);
  const dePoolAddress = new Address(addressToken);

  const dePool = new ever.Contract(DePoolAbi, dePoolAddress);

  try {
    const transaction = await dePool.methods
      .putOnSale({
        price: String(price),
      })
      .send({
        from: selectedAddress,
        amount: "1000000000",
        bounce: true,
      });
    console.log(transaction);
    toast.dismiss();
    toast.success("Payment has reached!");
    return true;
  } catch {
    toast.dismiss();
    toast.error("Something went wrong!");
    return false;
  }
}

export async function EndAuction(addressToken) {
  toast.loading("Payment is expected...");
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
  console.log(addressToken);
  const selectedAddress = accountInteraction.address;
  const dePoolAddress = new Address(addressToken);

  const dePool = new ever.Contract(DePoolAbi, dePoolAddress);
  try {
    const transaction = await dePool.methods.endAuction({}).send({
      from: selectedAddress,
      amount: "1000000000",
      bounce: true,
    });
    console.log(transaction);
    toast.dismiss();
    toast.success("Payment has reached!");
    return true;
  } catch {
    toast.dismiss();
    toast.error("Something went wrong!");
    return false;
  }
}
export async function WithdrawFromSale(addressToken) {
  toast.loading("Payment is expected...");

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
  console.log(addressToken);
  const selectedAddress = accountInteraction.address;
  const dePoolAddress = new Address(addressToken);

  const dePool = new ever.Contract(DePoolAbi, dePoolAddress);
  try {
    const transaction = await dePool.methods.removeFromSale({}).send({
      from: selectedAddress,
      amount: "1000000000", //+
      bounce: true,
    });
    console.log(transaction);
    toast.dismiss();
    toast.success("Payment has reached!");
    return true;
  } catch {
    toast.dismiss();
    toast.error("Something went wrong!");
    return false;
  }
}
export async function PutUpAuction(addressToken, price, time) {
  toast.loading("Payment is expected...");
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

  const selectedAddress = accountInteraction.address;
  const dePoolAddress = new Address(addressToken);

  const dePool = new ever.Contract(DePoolAbi, dePoolAddress);
  try {
    const transaction = await dePool.methods
      .putOnAuction({
        initPrice: String(price), //price
        time: String(time), // секунды
      })
      .send({
        from: selectedAddress,
        amount: "1000000000",
        bounce: true,
      });
    console.log(transaction);
    toast.dismiss();
    toast.success("Payment has reached!");
    return true;
  } catch {
    toast.dismiss();
    toast.error("Something went wrong!");
    return false;
  }
}
export async function BuyToken(addressToken, price) {
  toast.loading("Payment is expected...");
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

  const selectedAddress = accountInteraction.address;
  const dePoolAddress = new Address(addressToken);

  const dePool = new ever.Contract(DePoolAbi, dePoolAddress);
  try {
    const transaction = await dePool.methods.buy({}).send({
      from: selectedAddress,
      amount: String((Number(price) + 1) * 1000000000), //(price +1)*1000000000
      bounce: true,
    });
    console.log(transaction);
    toast.dismiss();
    toast.success("Payment has reached!");
    return true;
  } catch {
    toast.dismiss();
    toast.error("Something went wrong!");
    return false;
  }

}
export async function getInfoToken(addressToken) {
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

  const selectedAddress = accountInteraction.address;
  const dePoolAddress = new Address(addressToken);

  const dePool = new ever.Contract(DePoolAbi, dePoolAddress);

  //   const transaction = await dePool
  //    .methods
  //     .putOnSale({
  //       price: '10000000000',
  //     }).send({
  //       from: selectedAddress,
  //      amount: '10500000000',
  //       bounce: true,
  //     });
  //  console.log(transaction);
  console.log("!!!", selectedAddress);
  try {
    const output = await dePool.methods
      .getInfo({
        addr: selectedAddress,
      })
      .call();
    console.log(output);
    return output;
  } catch (e) {
    if (e instanceof TvmException) {
      console.error(e.code);
    }
  }
  toast.dismiss();
  toast.success("Payment has reached!");
}
export async function sendMoney1() {
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

  const selectedAddress = accountInteraction.address;
  const dePoolAddress = new Address(
    "0:3213540b6c5baa579dc21d6d436be84468201146a5992edcfccb1df50a3452f4"
  );

  const dePool = new ever.Contract(DePoolAbi, dePoolAddress);

  //   const transaction = await dePool
  //    .methods
  //     .putOnSale({
  //       price: '10000000000',
  //     }).send({
  //       from: selectedAddress,
  //      amount: '10500000000',
  //       bounce: true,
  //     });
  //  console.log(transaction);
  console.log("!!!", selectedAddress);
  try {
    const output = await dePool.methods
      .getInfo({
        addr: selectedAddress,
      })
      .call();
    console.log(output);
  } catch (e) {
    if (e instanceof TvmException) {
      console.error(e.code);
    }
  }
}

export async function sendMoney() {
  try {
    await ever.ensureInitialized();
    const { accountInteraction } = await ever.requestPermissions({
      permissions: ["basic", "accountInteraction"],
    });
    if (accountInteraction == null) {
      throw new Error("Insufficient permissions");
    }
    const { transaction } = await ever.sendMessage({
      sender: accountInteraction.address,
      recipient:
        "0:0eb093156b485497001f06cf5332861b34f306963c2476af5f433fe7050da0a0",
      amount: "5000000000",
      bounce: false,
    });

    if (
      transaction.aborted === false &&
      transaction.endStatus === "active" &&
      transaction.exitCode === 0
    ) {
      // ever.disconnect();
      return true;
    } else {
      // ever.disconnect();
      return false;
    }
  } catch (error) {
    console.error("error", error);
  }
}

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
    // ever.disconnect();
    return accountInteraction;
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
}
// window.login = login;

/* Logout in EVERCRYSTAL*/

export async function login_out() {
  // await AuthService.logout()
  const serverResponse = await apiRequest.post("/auth/logout", {
    refreshToken: localStorage.getItem("refreshToken"),
  });
  console.log(serverResponse);
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("userAddress");

  ever.disconnect();
  // window.location.reload();
}
// window.login_out = login_out;
