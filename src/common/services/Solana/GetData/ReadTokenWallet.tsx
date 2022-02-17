// TOKEN_PROGRAM_ID:new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA")
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { clusterApiUrl, Connection, PublicKey } from '@solana/web3.js';

export default async function ReadTokenWallet(): Promise<void> {
  const MY_WALLET_ADDRESS = 'FRvXcz7BLbc8KMyuZ9F5kgMCwuF4DJzCQSsGHc6WBLzJ';
  const MY_WALLET_PB = new PublicKey(
    'FRvXcz7BLbc8KMyuZ9F5kgMCwuF4DJzCQSsGHc6WBLzJ'
  );
  const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
  const ranToken = new PublicKey(
    'Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr'
  );

  const value = await connection.getParsedTokenAccountsByOwner(MY_WALLET_PB, {
    mint: ranToken,
  });

  /* const value = await connection.getParsedProgramAccounts(TOKEN_PROGRAM_ID, {
    filters: [
      {
        dataSize: 165, // number of bytes
      },
      {
        memcmp: {
          offset: 32, // number of bytes
          bytes: MY_WALLET_ADDRESS, // base58 encoded string
        },
      },
    ],
  }); */

  /* const data = {
    tokens: value.map((accountInfo) => {
      if (!(accountInfo.account.data instanceof Buffer)) {
        const parsedInfo = accountInfo.account.data.parsed.info;
        return { parsedInfo, pubkey: accountInfo.pubkey };
      }
      return null;
      // const parsedInfo = accountInfo.account.data.parsed.info;
      // const info = create(parsedInfo, TokenAccountInfo);
      // return { info, pubkey: accountInfo.pubkey };
    }),
  }; */

  console.log('value', value);
  // console.log('data', data);
}
