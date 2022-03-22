export default {
  collection:
    "0:31034482599f0d3615720dd5f83c2035b4905ae619d19d80627218558cd8a451", // collection address where to mint
  // array of NFTs
  items: [
    {
      wid: 0, // NFT content workchainId
      name: "test NFT", // name of NFT
      descriprion: "test NFT description", // description of NFT
      mimeType: "image/jpg", // mimeType of NFT content
      royalty: 100, // royalty part, range between 0 and 100000, where 100000 is 100.000%
      royaltyMin: 1, // minimum recieve in grams (author will recieve biggest part)
      meta: {
        height: 0, // optional
        width: 0, // optional
        duration: 0, // optional
        extra: "", // optional
        json: "", // optional
      },
      content: "True-NFT/configs/1.jpg",
    },
  ],
} as const;
