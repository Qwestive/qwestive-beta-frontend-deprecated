import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from 'react';
import {
  TokenListProvider,
  TokenInfoMap,
  TokenInfo,
  TokenListContainer,
  Strategy,
} from '@solana/spl-token-registry';

import { SolanaNetwork } from '../../services/Solana/NetworkConfig';

const TokenRegistryContext = createContext<TokenInfoMap>(new Map());

type ProviderProps = { children: ReactNode };

export function TokenRegistryProvider({
  children,
}: ProviderProps): JSX.Element {
  const [tokenRegistry, setTokenRegistry] = useState<TokenInfoMap>(new Map());

  useEffect(() => {
    new TokenListProvider()
      .resolve(Strategy.Solana)
      .then((tokens: TokenListContainer) => {
        const tokenList = tokens.filterByClusterSlug(SolanaNetwork).getList();

        setTokenRegistry(
          tokenList.reduce((map: TokenInfoMap, item: TokenInfo) => {
            map.set(item.address, item);
            return map;
          }, new Map())
        );
      });
  }, []);

  return (
    <TokenRegistryContext.Provider value={tokenRegistry}>
      {children}
    </TokenRegistryContext.Provider>
  );
}

export function useTokenRegistry(): TokenInfoMap {
  const tokenRegistry = useContext(TokenRegistryContext);

  if (!tokenRegistry) {
    throw new Error(
      `useTokenRegistry must be used within a TokenRegistryProvider`
    );
  }

  return tokenRegistry;
}
