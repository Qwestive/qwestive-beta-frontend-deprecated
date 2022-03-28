import {
  clusterApiUrl,
  Connection,
  Cluster,
  Commitment,
  PublicKey,
} from '@solana/web3.js';
import appConfig from 'config.js';

export const TOKEN_PROGRAM_ID = new PublicKey(
  'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'
);

export function buildConnection(): Connection {
  return new Connection(
    clusterApiUrl(appConfig.SOLANA_NETWORK as Cluster),
    appConfig.SOLANA_NETWORK_COMMITMENT as Commitment
  );
}
