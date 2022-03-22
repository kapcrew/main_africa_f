import {
  Address,
  ProviderRpcClient,
  TvmException
} from 'everscale-inpage-provider';
import freeton from 'freeton';


const ever = new ProviderRpcClient();
const wallet_address = localStorage.getItem('wallet_address') || 0;

/* Login in EVERCRYSTAL*/

export async function login(){
  const { accountInteraction } = await ever.requestPermissions({
    permissions: ['basic', 'accountInteraction'],
  });
  if (accountInteraction == null) {
    throw new Error('Insufficient permissions');
  }
  localStorage.setItem('wallet_address', accountInteraction.address);

}
window.login = login;

/* Logout in EVERCRYSTAL*/

export async function login_out(){
  await ever.disconnect();
  localStorage.removeItem('wallet_address');
}
window.login_out = login_out;


export async function login_extraton(){
  const provider = await new freeton.providers.ExtensionProvider(window.freeton);
  const signer =  await provider.getSigner();
  console.log(signer)
  const network = await signer.network.server;
  console.log(network)
  const address = await signer.wallet.address;
  console.log(address)

  localStorage.setItem('wallet_address', address);

  //const signer = await provider.getSigner();
}
window.login_extraton = login_extraton;


export async function send(){
  const send = await ever.sendMessage({
    sender:wallet_address,
    recipient:"0:b4c133e34531703dbbbed93c5e201a3b1b25891e71ae83e64eaa38230d572c94",
    amount:"1000000000",
    bounce:false,
  })
}
window.send = send;

export async function get_nft(){
  fetch('https://net.ton.dev/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
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
          `
        })
      })
    }
window.get_nft = get_nft;
