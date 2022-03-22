import { KeyPair, TonClient } from "@tonclient/core";
import pkgSafeMultisigWallet from "./packages/SCMS.package.ts";
import pkgNftRoot from "./packages/NftRootCustomMint.package.ts";
import pkgData from "./packages/Data.package.ts";
import pkgDataChunk from "./packages/DataChunk.package.ts";
import { createClient, sleep, TonContract } from "@rsquad/ton-utils";
import {
  base64ToHex,
  hexToBase64,
  hexToUtf8,
  utf8ToHex,
} from "@rsquad/ton-utils/dist/convert";
import { callThroughMultisig } from "@rsquad/ton-utils/dist/net";
import config from "./configs/mint.config.ts";
import { sha256 } from "js-sha256";
import * as fs from "fs";


export async function create(){
(async () => {
  try {

    const client: TonClient = createClient();

    const smcWallet: TonContract = new TonContract({
      client,
      name: "SafeMultisigWallet",
      tonPackage: pkgSafeMultisigWallet,
      address: "0:0eb093156b485497001f06cf5332861b34f306963c2476af5f433fe7050da0a0",
      keys: {
        public: "4ba7586a7bc1e621b3dc0630c7562434a0052c592c1a63ea18a85496d7ff6b1a",
        secret: "d30409bdc0d1669ff818013240f254895e8854b4f8ba7367daf6c59d6cdd8fe0",
      },
    });

    let keys: KeyPair;

    keys = await client.crypto.generate_random_sign_keys();

    console.log("deploy and init collection");

    const smcNftRoot: TonContract = new TonContract({
      client,
      name: "NftRoot",
      tonPackage: pkgNftRoot,
      address: config.collection,
    });

    console.log(`collection address: ${smcNftRoot.address}`);

    const info = (await smcNftRoot.run({ functionName: "getInfo" })).value;
    console.log(`collection info: `, {
      ...info,
      name: hexToUtf8(info.name),
      descriprion: hexToUtf8(info.descriprion),
    });

    for (let j = 0; j < config.items.length; j++) {
      console.log(`mint NFT ${j + 1} of ${config.items.length}`);

      const item = config.items[j];

      const content = fs.readFileSync(item.content);
      const chunkSize = 15600;

      const bufferChunks = [];
      let i = 0;

      while (i < content.length) {
        bufferChunks.push(
          content.slice(
            i,
            (i +=
              content.length - i > chunkSize ? chunkSize : content.length - i)
          )
        );
      }

      const contentHash = `0x${sha256(content)}`;
      const size = content.length;
      const chunks = bufferChunks.map((chunk) => chunk.toString("base64"));

      const nftId = (
        await smcNftRoot.run({
          functionName: "getInfo",
          input: {},
        })
      ).value.totalSupply;

      await callThroughMultisig({
        client,
        smcSafeMultisigWallet: smcWallet,
        abi: pkgNftRoot.abi,
        functionName: "mintNft",
        input: {
          wid: item.wid,
          name: utf8ToHex(item.name),
          descriprion: utf8ToHex(item.descriprion),
          contentHash,
          mimeType: item.mimeType,
          chunks: chunks.length,
          chunkSize,
          size,
          meta: {
            height: item.meta.height,
            width: item.meta.width,
            duration: item.meta.duration,
            extra: utf8ToHex(item.meta.extra),
            json: utf8ToHex(item.meta.json),
          },
        },
        dest: smcNftRoot.address,
        value: 1_000_000_000,
      });

      const addrData = (
        await smcNftRoot.run({
          functionName: "resolveData",
          input: {
            addrRoot: smcNftRoot.address,
            id: nftId,
          },
        })
      ).value.addrData;

      if (process.env.NETWORK !== "LOCAL") await sleep(60000);

      const smcData = new TonContract({
        client,
        name: "Data",
        tonPackage: pkgData,
        address: addrData,
      });

      console.log("Your NFT address: ", smcData.address);
      console.log("Your NFT id: ", nftId);

      await callThroughMultisig({
        client,
        smcSafeMultisigWallet: smcWallet,
        abi: pkgData.abi,
        functionName: "setRoyalty",
        input: {
          royalty: item.royalty,
          royaltyMin: item.royaltyMin,
        },
        dest: smcData.address,
        value: 500_000_000,
      });

      let addrDataChunk: string;
      const addrsDataChunk = [];
      for (let i = 0; i < chunks.length; i++) {
        addrDataChunk = (
          await smcData.run({
            functionName: "resolveDataChunk",
            input: {
              addrData: smcData.address,
              chunkNumber: i,
            },
          })
        ).value.addrDataChunk;

        addrsDataChunk.push(addrDataChunk);

        console.log(`deploy chunk ${i + 1} of ${chunks.length}`);

        await callThroughMultisig({
          client,
          smcSafeMultisigWallet: smcWallet,
          abi: pkgData.abi,
          functionName: "deployDataChunk",
          input: {
            chunk: base64ToHex(chunks[i]),
            chunkNumber: i,
          },
          dest: smcData.address,
          value: 500_000_000,
        });
      }

      if (process.env.NETWORK !== "LOCAL") await sleep(60000);

      console.log(`chunks: `, addrsDataChunk);

    /*  const info = {};
      const promises = addrsDataChunk.map(async (addrChunk, i) => {
        const smcDataChunk = new TonContract({
          client,
          name: "DataChunk",
          tonPackage: pkgDataChunk,
          address: addrChunk,
        });
        const data = (
          await smcDataChunk.run({
            functionName: "getInfo",
            input: {},
          })
        ).value;

        info[data.chunkNumber] = data.chunk;
      });

      await Promise.all(promises);

      const buffer = hexToBase64(Object.values(info).join(""));

      fs.writeFileSync(
        `True-NFT/configs/dl-${j + 1}.${
          item.content.split(".")[item.content.split(".").length - 1]
        }`,
        buffer,
        "base64"
      );*/
    }

    process.exit();
  } catch (err) {
    console.log("Error! ", err);
    process.exit();
  }
})();
}
