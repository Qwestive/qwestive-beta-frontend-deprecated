import React, { useEffect } from "react";
import { WalletMultiButton as ReactUIWalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";

export default function ConnectionButton(): JSX.Element {
  const { connected } = useWallet();

  useEffect(() => {
    console.log(`Wallet Connected: ${connected}`);
  }, [connected]);

  return <ReactUIWalletMultiButton />;
}
