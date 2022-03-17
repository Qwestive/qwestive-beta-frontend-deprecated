import {
  clusterApiUrl,
  Cluster,
  PublicKey,
  Connection,
  Commitment,
  SystemProgram,
  Keypair,
} from '@solana/web3.js';
import { BN, Provider, Program } from '@project-serum/anchor';
import { AnchorWallet } from '@solana/wallet-adapter-react';
import { readFileSync } from 'fs';
import appConfig from '../../../../config.js';

/** Address of the SPL Token program */
const TOKEN_PROGRAM_ID = new PublicKey(
  'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'
);

/** Address of the SPL Associated Token Account program */
const ASSOCIATED_TOKEN_PROGRAM_ID = new PublicKey(
  'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL'
);

const buildConnection = (): Connection =>
  new Connection(
    clusterApiUrl(appConfig.SOLANA_NETWORK as Cluster),
    appConfig.SOLANA_NETWORK_COMMITMENT as Commitment
  );

const useVotingProgram = async (
  connection: Connection,
  walletContext: AnchorWallet
): Promise<Program> => {
  const provider = new Provider(connection, walletContext, {
    commitment: appConfig.SOLANA_NETWORK_COMMITMENT as Commitment,
  });

  const idl = JSON.parse(readFileSync('./qwestive_voting.json', 'utf8'));

  // Address of the deployed program.
  const programId = new PublicKey(appConfig.VOTING_CONTRACT_PUBLIC_KEY);

  // Generate the program client from IDL.
  const program = new Program(idl, programId, provider);

  // Execute the RPC.
  return program;
};

// TODO (diegoolalde): cleanup - this file is still under construction.
const initializeVote = async (
  publicKey: PublicKey,
  walletContext: AnchorWallet
): Promise<void> => {
  const connection = buildConnection();
  // const mintAuthority = Keypair.generate();
  const mintAccount = new PublicKey(
    'GGqMqGdhm8FLjf9b2uurdSnD9GfagBJzTWbHf8rSYJ9J'
  );
  // const tokenAccount = getAssociatedTokenAddress();
  const [tokenAccount] = await PublicKey.findProgramAddress(
    [publicKey.toBuffer(), TOKEN_PROGRAM_ID.toBuffer(), mintAccount.toBuffer()],
    ASSOCIATED_TOKEN_PROGRAM_ID
  );

  // The mint of the token that the vote will be held for.
  // const mintA: any = await createMint(
  //   connection as Connection,
  //   tokenWallet,
  //   mintAuthority.publicKey,
  //   null,
  //   0
  // );
  console.log('Mint is created');
  // console.log(mintA);

  // Create the associated token accounts
  // Primary Provider Token Accounts

  // const voter1TokenAAccount = await getAssociatedTokenAddress(
  //   publicKey,
  //   mintA.publicKey
  // );
  const voter1TokenAAccount = null;
  console.log('Voter 1 Toke Account is created:');
  console.log(voter1TokenAAccount);

  const [communityAccountPublicKey, communityAccountBump] =
    await PublicKey.findProgramAddress(
      [Buffer.from('community_account'), mintAccount.toBuffer()],
      new PublicKey(appConfig.VOTING_CONTRACT_PUBLIC_KEY)
    );
  console.log('Community Voting Account is created');
  console.log(communityAccountPublicKey);

  const program = await useVotingProgram(connection, walletContext);

  // Add your test here.
  const tx = await program.rpc.initializeVoting(
    communityAccountBump,
    // Empty string for non-NFT community
    '',
    new BN(0), // Minimum token needed to be in community
    {
      accounts: {
        communityVoteAccount: communityAccountPublicKey,
        tokenAccount,
        user: publicKey,
        systemProgram: SystemProgram.programId,
      },
    }
  );
  console.log(tx);
};

export default initializeVote;
