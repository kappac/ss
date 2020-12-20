import { Client as RPCWSClient } from 'rpc-websockets';

const connectUrl = 'wss://api.exchange.bitcoin.com/api/2/ws';
export const client = new RPCWSClient(connectUrl, {
  autoconnect: false,
  followRedirects: true
});
