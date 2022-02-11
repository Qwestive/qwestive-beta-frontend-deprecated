import React from 'react';
import {
  TokenListProvider,
  TokenInfoMap,
  TokenInfo,
  TokenListContainer,
  Strategy,
} from '@solana/spl-token-registry';

const TokenRegistryContext = React.createContext<TokenInfoMap>(new Map());

type ProviderProps = { children: React.ReactNode };

export function TokenRegistryProvider({
  children,
}: ProviderProps): JSX.Element {
  const [tokenRegistry, setTokenRegistry] = React.useState<TokenInfoMap>(
    new Map()
  );

  React.useEffect(() => {
    new TokenListProvider()
      .resolve(Strategy.Solana)
      .then((tokens: TokenListContainer) => {
        const tokenList = tokens.filterByClusterSlug('devnet').getList();

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
  const tokenRegistry = React.useContext(TokenRegistryContext);

  if (!tokenRegistry) {
    throw new Error(
      `useTokenRegistry must be used within a TokenRegistryProvider`
    );
  }

  return tokenRegistry;
}
